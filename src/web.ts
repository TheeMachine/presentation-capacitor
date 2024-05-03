import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin, OpenLinkOptions } from './definitions';

export class CapacitorPresentationWeb
  extends WebPlugin
  implements CapacitorPresentationPlugin
{
  async openLink(options: OpenLinkOptions): Promise<{ success?: any; error?: any }> {

    if(!options.url) return {
      error: 'URL is required',
    };
   
    try {
      const presentationRequest = new (window as any).PresentationRequest([
        options.url,
      ]);
      const start = await presentationRequest.start();
      this.notifyListeners('onSuccessLoadUrl', start);
      return {
        success: start,
      };
    } catch (error) {
      console.log(error);
      this.notifyListeners('onFailLoadUrl', error);
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
