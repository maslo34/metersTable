import { flow } from 'mobx-state-tree';
import { metersApi, type MeterBM } from '../api';
import type { LoadMetersParams } from './meter.types';
import { MeterModel } from './meter.model';

const LIMIT_METERS_ON_PAGE = 20;
const START_PAGE = 1;

export const createMeterActions = (self: any) => {
  // Загрузка адреса счетчика
  const loadAddress = flow(function* (addressId: string) {
    try {
      const response = yield metersApi.getAddressById(addressId);
      return response.address ? response.address : 'Адрес не найден';
    } catch (error) {
      console.error(`Ошибка загрузки адреса ${addressId}:`, error);
      return 'Ошибка загрузки адреса';
    }
  });

  // Загрузка страницы счетчиков
  const loadMeters = flow(function* (params?: LoadMetersParams) {
    self.isLoading = true;
    self.error = null;

    try {
      const response = yield metersApi.getMeters(
        params?.limit || LIMIT_METERS_ON_PAGE,
        params?.offset || 0
      );

      self.numberOfPages = response.numberOfPages;
      self.nextPage = response.next;
      self.previousPage = response.previous;
      self.currentPage =
        (Number(new URL(self.nextPage).searchParams.get('offset')) -
          LIMIT_METERS_ON_PAGE) /
          LIMIT_METERS_ON_PAGE || START_PAGE;
      const listAddressId = response.data.map(
        (meterData: MeterBM) => meterData.addressId
      );
      const uniqueAddressIds = [...new Set(listAddressId)];

      const addressPromises = uniqueAddressIds.map((id) =>
        loadAddress(id as string).catch(() => 'Адрес недоступен')
      );

      const addresses = yield Promise.all(addressPromises);

      const addressMap = new Map<string, string>();
      uniqueAddressIds.forEach((id, index) => {
        addressMap.set(id as string, addresses[index]);
      });

      const meterModels = response.data.map(
        (meterData: MeterBM, index: number) =>
          MeterModel.create({
            ...meterData,
            sequenceNumber:
              index + 1 + (Number(params?.offset) - LIMIT_METERS_ON_PAGE || 0),
            address: addressMap.get(meterData.addressId) || 'Адрес не загружен',
          })
      );

      self.meters.replace(meterModels);
    } catch (error) {
      self.error = error instanceof Error ? error.message : 'Ошибка загрузки';
      console.error('Ошибка загрузки счетчиков:', error);
    } finally {
      self.isLoading = false;
    }
  });

  // Загрузка новой страницы счетчиков
  const loadMore = flow(function* (page = 0) {
    if (self.isLoading) return;
    try {
      const url = new URL(self.nextPage);
      const limit = parseInt(
        url.searchParams.get('limit') || String(LIMIT_METERS_ON_PAGE)
      );
      const offset =
        page * 20 || parseInt(url.searchParams.get('offset') || '1');

      yield loadMeters({ limit, offset });
    } catch (error) {
      console.error('Ошибка загрузки следующей страницы:', error);
    }
  });

  const clearStore = () => {
    self.meters.clear();
    self.numberOfPages = 0;
    self.nextPage = null;
    self.previousPage = null;
    self.error = null;
  };

  return {
    loadMeters,
    loadMore,
    clearStore,
  };
};
