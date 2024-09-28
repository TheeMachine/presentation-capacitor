import { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorPresentationPlugin {
  /**
   *
   * @param options
   * @param url works only web
   * @param htmlStrings works only android
   * @deprecated use open instead
   */
  openLink(options: OpenLinkOptions): Promise<OpenResponse>;
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

/**
 * @deprecated use openOptions
 */
export type OpenLinkOptions = { url: string; htmlStrings?: string } | { htmlStrings: string; url?: string };

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

export type OpenResponse = { success?: any; error?: any; url?: any };