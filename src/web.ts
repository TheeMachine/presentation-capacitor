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

  async openLink(options: { url: string }): Promise<{ url: string }> {
    this.notifyListeners("onFailLoadUrl", options);
    this.notifyListeners("onSuccessLoadUrl", options);
    return options;
  }
}
