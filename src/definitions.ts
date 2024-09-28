import { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorPresentationPlugin {
  open(options: OpenOptions): Promise<OpenResponse>;

  /**
   *
   * @param eventName
   * @param listenerFunc <br>
   *
   * Works only if type html of url or if browser
   */
  addListener(
    eventName: 'onSuccessLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> | PluginListenerHandle;
  addListener(
    eventName: 'onFailLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> | PluginListenerHandle;

  getDisplays(): Promise<{ displays: number }>;
}

export type OpenOptions = {} & (
  | {
      type: 'url';
      url: string;
    }
  | {
      type: 'video';
      videoOptions: {
        videoUrl: string;
        showControls?: boolean;
      };
    }
  | {
      type: 'html';
      html: string;
    }
);

export type OpenResponse = { success?: any; error?: any; result?: any };
