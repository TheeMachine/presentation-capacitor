import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin } from './definitions';

export class CapacitorPresentationWeb
  extends WebPlugin
  implements CapacitorPresentationPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
