import { PluginListenerHandle } from "@capacitor/core";

export interface CapacitorPresentationPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  openLink(options: { url: string }): Promise<{ url: string }>;
  addListener(
    eventName: 'onSuccessLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(
    eventName: 'onFailLoadUrl',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
