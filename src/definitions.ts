import { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorPresentationPlugin {
  /**
   *
   * @param options
   * @param url works only web
   * @param htmlStrings works only android
   */
  openLink(options: OpenLinkOptions): Promise<{ success?: any; error?: any; url?: any }>;
  addListener(
    eventName: 'onSuccessLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(
    eventName: 'onFailLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  getDisplays(): Promise<{ displays: number }>;
}

export type OpenLinkOptions = {url: string, htmlStrings?: string} | {htmlStrings: string, url?: string}