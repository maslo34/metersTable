import { flow } from 'mobx-state-tree';
import { metersApi, type MeterBM } from '../api';
import type { LoadMetersParams } from './meter.types';
import { MeterModel } from './meter.model';

export const createMeterActions = (self: any) => {
  const loadAddress = flow(function* (addressId: string) {
    try {
      const response = yield metersApi.getAddressById(addressId);
      return response.address ? response.address : 'Адрес не найден';
    } catch (error) {
      console.error(`Ошибка загрузки адреса ${addressId}:`, error);
      return 'Ошибка загрузки адреса';
    }
  });

  const loadMeters = flow(function* (params?: LoadMetersParams) {
    self.isLoading = true;
    self.error = null;

    try {
      const response = yield metersApi.getMeters(
        params?.limit || 20,
        params?.offset || 0
      );

      self.numberOfPages = response.count;
      self.nextPage = response.next;
      self.previousPage = response.previous;

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
            sequenceNumber: index + 1 + (params?.offset || 0),
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

  const loadMore = flow(function* () {
    if (!self.nextPage || self.isLoading) return;

    try {
      const url = new URL(self.nextPage);
      const limit = parseInt(url.searchParams.get('limit') || '20');
      const offset = parseInt(url.searchParams.get('offset') || '0');

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
