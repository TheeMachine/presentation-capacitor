import { WebPlugin } from '@capacitor/core';

import type { CapacitorPresentationPlugin, OpenOptions, OpenResponse } from './definitions';

export class CapacitorPresentationWeb extends WebPlugin implements CapacitorPresentationPlugin {

  private presentationConnection: any;

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
    this.presentationConnection?.send(JSON.stringify(message));
    return message
  }

  private async startDisplay(data: string) {
    const presentationRequest = new (window as any).PresentationRequest([data]);
    return new Promise<any>(async (resolve) => {
      presentationRequest.addEventListener('connectionavailable', (event: any) => {
        this.presentationConnection = event.connection;
        resolve(this.presentationConnection);
        this.presentationConnection.addEventListener('close', () => {
          console.log('> Connection closed.');
        });
        this.presentationConnection.addEventListener('terminate', () => {
          console.log('> Connection terminated.');
        });
        this.presentationConnection.addEventListener('message', (event: any) => {
          console.log('> ' + event.data);
        }); 
      });    
      await presentationRequest.start();
      resolve(data);
    })
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
