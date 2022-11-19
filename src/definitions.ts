import { PluginListenerHandle } from '@capacitor/core';

export interface CapacitorPresentationPlugin {
  openLink(options: { url: string }): Promise<{ success?: any; error?: any, url?: any }>;
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
