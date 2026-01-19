import { apiClient } from './client';
import { type MetersListDTO, type AreaDTO } from './types';
import {
  mapResponseMetersDTOtoModel,
  mapResponseAreaDTOtoModel,
} from './mapers';

export const metersApi = {
  getMeters: async (limit: number, offset: number) => {
    const response = await apiClient.get<MetersListDTO>(
      `meters/?limit=${limit}&offset=${offset}`
    );
    return mapResponseMetersDTOtoModel(response.data);
  },
  getAddressById: async (id: string) => {
    const response = await apiClient.get<AreaDTO>(`areas/?id=${id}`);
    return mapResponseAreaDTOtoModel(response.data);
  },
  deleteMeterId: async (id: string) => {
    const response = await apiClient.delete(`meters/${id}/`);
    return response.data;
  },
};
