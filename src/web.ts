import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin, OpenLinkOptions, OpenOptions, OpenResponse } from './definitions';

export class CapacitorPresentationWeb extends WebPlugin implements CapacitorPresentationPlugin {
  /**
   *
   * @param options
   * @returns
   * @deprecated
   */
  async openLink(options: OpenLinkOptions): Promise<{ success?: any; error?: any }> {
    if (!options.url)
      return {
        error: 'URL is required',
      };

    try {
      const presentationRequest = new (window as any).PresentationRequest([options.url]);
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

  async open(options: OpenOptions): Promise<OpenResponse> {
    try {
      let data = null;
      switch (options.type) {
        case 'url':
          data = options.url;
          break;
        case 'html':
          data = options.html;
          break;
        case 'video':
          data = options.videoOptions?.videoUrl;
      }

      if (!data) {
        throw new Error('Please enter all required values!');
      }
      const start = await this.startDisplay(data);
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

  private async startDisplay(data: string) {
    const presentationRequest = new (window as any).PresentationRequest([data]);
    return await presentationRequest.start();
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