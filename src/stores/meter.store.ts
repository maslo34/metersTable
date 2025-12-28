import { types, type Instance } from 'mobx-state-tree';
import { MeterModel } from './meter.model';
import { createMeterActions } from './meter.actions';

const MeterStoreBase = types
  .model({
    meters: types.array(MeterModel),
    numberOfPages: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    nextPage: types.maybeNull(types.string),
    previousPage: types.maybeNull(types.string),
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    ...createMeterActions(self),
  }));

export const MeterStore = MeterStoreBase;

export type IMeterStore = Instance<typeof MeterStore>;
export type IMeter = Instance<typeof MeterModel>;
