import { types } from 'mobx-state-tree';

export const MeterModel = types.model({
  id: types.identifier,
  sequenceNumber: types.number,
  type: types.union(
    types.literal('ColdWaterAreaMeter'),
    types.literal('HotWaterAreaMeter')
  ),
  installationDate: types.Date,
  isAutomatic: types.boolean,
  initialValues: types.number,
  address: types.string,
  addressId: types.string,
  description: types.string,
});
