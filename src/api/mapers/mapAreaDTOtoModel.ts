import { type AreaDTO, type AreaModel } from '../types';

export const mapResponseAreaDTOtoModel = (dto: AreaDTO): AreaModel => {
  if (dto.count! > 1) {
    throw Error('Ошибка, несколько адресов');
  }
  const singleItem = dto.results[0];
  const address = `${singleItem.house.address} ${singleItem.str_number_full}`;
  return { address };
};
