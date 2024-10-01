import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin, OpenOptions, OpenResponse } from './definitions';

export class CapacitorPresentationWeb extends WebPlugin implements CapacitorPresentationPlugin {

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
        result: options
      };
    }
  }

  async sendMessage<T>(message: T): Promise<any> {
    this.notifyListeners('onMessage', message);
    return message
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
