export type MetetDTO = {
  id: string;
  _type: ['ColdWaterAreaMeter' | 'HotWaterAreaMeter', string];
  area: {
    id: string;
  };
  is_automatic: null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: Date;
  brand_name: null | string;
  model_name: null | string;
  initial_values: number[];
};

export type MetersListDTO = {
  count: number;
  next: string;
  previous: null;
  results: MetetDTO[];
};

export type MeterBM = {
  id: string;
  type: 'ColdWaterAreaMeter' | 'HotWaterAreaMeter';
  installationDate: Date;
  isAutomatic: boolean;
  initialValues: number;
  address: string;
  addressId: string;
  description: string;
};

export type MetersListBM = {
  data: MeterBM[];
  numberOfPages: number;
  next: string | null;
  previous: string | null;
};

export type AreaDTO = {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      id: string;
      number: number;
      str_number: string;
      str_number_full: string;
      house: {
        address: string;
        id: string;
        fias_addrobjs: [string, string];
      };
    },
  ];
};

export type AreaModel = {
  address: string;
};
