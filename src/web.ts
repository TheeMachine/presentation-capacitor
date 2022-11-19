import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin } from './definitions';

export class CapacitorPresentationWeb
  extends WebPlugin
  implements CapacitorPresentationPlugin
{
  async openLink(options: {
    url: string;
  }): Promise<{ success?: any; error?: any }> {
    const presentationRequest = new (window as any).PresentationRequest([
      options.url,
    ]);
    try {
      const start = await presentationRequest.start();
      this.notifyListeners('onFailLoadUrl', start);
      return {
        success: start,
      };
    } catch (error) {
      this.notifyListeners('onSuccessLoadUrl', error);
      return {
        error: error,
      };
    }
  }

  async getDisplays(): Promise<{ displays: number }> {
    const presentationRequest = new (window as any).PresentationRequest(['']);

    try {
      await presentationRequest.getAvailability();
      return {
        displays: 1,
      };
    } catch (error) {
      return {
        displays: 0,
      };
    }
  }
}
