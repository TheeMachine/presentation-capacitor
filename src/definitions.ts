
export interface CapacitorPresentationPlugin {
  open(options: OpenOptions): Promise<OpenResponse>;
  sendMessage<T>(message: T): Promise<T>;
  terminate(): Promise<void>;

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
  ): any;
  addListener(
    eventName: 'onFailLoadUrl',
    listenerFunc: (data: any) => void,
  ): any;

  
  addListener(
    eventName: 'onMessage',
    listenerFunc: (data: any) => void,
  ): any;

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
