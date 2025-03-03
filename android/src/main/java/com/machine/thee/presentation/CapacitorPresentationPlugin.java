package com.machine.thee.presentation;

import android.content.Context;
import android.hardware.display.DisplayManager;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.webkit.WebView;

import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Locale;
import java.util.Objects;


interface DisplayCallback {
  void onDisplayReady(SecondaryDisplay display);
}
@CapacitorPlugin(name = "CapacitorPresentation")
public class CapacitorPresentationPlugin extends Plugin {

  private final CapacitorPresentation implementation = new CapacitorPresentation();
  private SecondaryDisplay display;
  public DisplayManager displayManager = null;
  public Display[] presentationDisplays = null;

  final String SUCCESS_CALL_BACK = "onSuccessLoadUrl";
  final String FAIL_CALL_BACK = "onFailLoadUrl";
  final String ON_MESSAGE_EVENT = "onMessage";

  @PluginMethod
  public void openLink(PluginCall call) {
    String url = call.getString("url");
    OpenType type = getResultType(call.getString("type"));

    JSObject ret = new JSObject();
    ret.put("url", url);

    openSecondDisplay(display -> {
      if(display != null) {
        display.init(Objects.requireNonNull(type), url);
      }
    });
    call.resolve(ret);
  }

  private OpenType getResultType(String resultType) {
    if (resultType == null) {
      return OpenType.URL;
    }
    try {
      return OpenType.valueOf(resultType.toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException ex) {
      Logger.debug(getLogTag(), "Invalid result type \"" + resultType + "\", defaulting to base64");
      return OpenType.URL;
    }
  }

  @PluginMethod
  public void terminate(PluginCall call) {
    if(display == null) {
      return;
    }

    display.dismiss();
  }

  @PluginMethod
  public void open(PluginCall call) {
    OpenType type = getResultType(call.getString("type"));
    JSObject ret = new JSObject();
    openSecondDisplay(display -> {
      try {
        Object data = null;
        switch (type) {
          case URL:
            data = call.getString("url", null);
            break;
          case HTML:
            data = call.getString("html", null);
            break;
          case VIDEO:
            data = new VideoOptions(call.getObject("videoOptions").getString("videoUrl"), (Boolean.TRUE.equals(call.getBoolean("showControls"))));
            break;

        }
        if(display != null) {
          display.show();
          if(type == OpenType.VIDEO) {
            display.init(type, (VideoOptions) data);
          } else {
            display.init(type,(String) data);
          }
        }
        ret.put("result", data);
      } catch (Exception e) {
          e.printStackTrace();
      }
    });
    call.resolve(ret);
  }


  private void openSecondDisplay(DisplayCallback callback) {
    new Handler(Looper.getMainLooper()).post(() -> {
      displayManager = (DisplayManager) getActivity().getSystemService(Context.DISPLAY_SERVICE);
      if (displayManager != null) {
        presentationDisplays = displayManager.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
        if (presentationDisplays.length > 0) {
          Log.d("presentationDisplays", String.valueOf(presentationDisplays[0]));
          display = new SecondaryDisplay(getContext(), presentationDisplays[0]);
          // Callback ile sonucu döndür
          callback.onDisplayReady(display);
        }
      }
    });
  }

  public void notifyToSuccess(WebView view, String url) {
    JSObject response = new JSObject();
    response.put("result", url);
    response.put("message", "success");
    notifyListeners(SUCCESS_CALL_BACK, response, true);
  }

  public void notifyToFail(WebView view, int errorCode) {
    JSObject response = new JSObject();
    response.put("result", errorCode);
    response.put("message", "fail");
    notifyListeners(FAIL_CALL_BACK, response, true);
  }

  public void notifyListener(String tag,JSObject jsObject) {
    notifyListeners(tag, jsObject, true);
  }

  @PluginMethod
  public void sendMessage(PluginCall call) {
      if(display != null) {
        display.sendMessage(call.getObject("data"));
      }

  }

  @PluginMethod
  public void getDisplays(PluginCall call) {

    displayManager = (DisplayManager) getActivity().getSystemService(Context.DISPLAY_SERVICE);
    JSObject response = new JSObject();
    int displays = 0;

    if (displayManager != null) {

      presentationDisplays = displayManager.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
      displays = presentationDisplays.length;

    }
    response.put("displays", displays);
    call.resolve(response);
  }


}
