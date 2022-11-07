import { registerPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin } from './definitions';

const CapacitorPresentation = registerPlugin<CapacitorPresentationPlugin>(
  'CapacitorPresentation',
  {
    web: () => import('./web').then(m => new m.CapacitorPresentationWeb()),
  },
);

export * from './definitions';
export { CapacitorPresentation };
