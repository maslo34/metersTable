import {
  type MetetDTO,
  type MeterBM,
  type MetersListDTO,
  type MetersListBM,
} from '../types';

export const mapSingleMeterDTOtoModel = (dto: MetetDTO): MeterBM => {
  return {
    id: dto.id,
    type: dto._type[0],
    installationDate: new Date(dto.installation_date),
    isAutomatic: dto.is_automatic ?? false,
    initialValues: dto.initial_values[0] || 0,
    addressId: dto.area.id,
    address: '',
    description: dto.description,
  };
};

export const mapResponseMetersDTOtoModel = (
  dto: MetersListDTO
): MetersListBM => {
  const data = dto.results.map((meterDTO: MetetDTO) =>
    mapSingleMeterDTOtoModel(meterDTO)
  );
  const numberOfPages = dto.count;
  return {
    data,
    numberOfPages,
  };
};
