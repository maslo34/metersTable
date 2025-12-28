export interface IMeter {
  id: string;
  sequenceNumber: number;
  type: 'ColdWaterAreaMeter' | 'HotWaterAreaMeter';
  installationDate: Date;
  isAutomatic: boolean;
  initialValues: number;
  address: string;
  addressId: string;
  description: string;
}

export interface IMeterStore {
  meters: IMeter[];
  numberOfPages: number;
  currentPage: number;
  isLoading: boolean;
  nextPage: string | null;
  previousPage: string | null;
  error: string | null;

  loadMeters: (params?: { limit?: number; offset?: number }) => Promise<void>;
  loadMore: () => Promise<void>;
  clearStore: () => void;
}

export interface LoadMetersParams {
  limit?: number;
  offset?: number;
}
