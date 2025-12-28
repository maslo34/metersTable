export { MeterStore } from './meter.store';
export type { IMeterStore, IMeter } from './meter.store';
export { MeterModel } from './meter.model';
export type { IMeter as IMeterType } from './meter.types';

import { MeterStore } from './meter.store';

export const meterStore = MeterStore.create({});
