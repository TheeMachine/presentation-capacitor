package com.machine.thee.presentation;

import android.content.Context;
import android.hardware.display.DisplayManager;
import android.os.Debug;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.LinearLayout;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.Arrays;

@CapacitorPlugin(name = "CapacitorPresentation")
public class CapacitorPresentationPlugin extends Plugin {

    private final CapacitorPresentation implementation = new CapacitorPresentation();
    public DisplayManager displayManager = null;
    public Display[] presentationDisplays = null;

    final String SUCCESS_CALL_BACK = "onSuccessLoadUrl";
    final String FAIL_CALL_BACK = "onFailLoadUrl";

    @PluginMethod
    public void openLink(PluginCall call) {
        String url = call.getString("url");

        JSObject ret = new JSObject();
        ret.put("url", url);
        new Handler(Looper.getMainLooper())
                .post(
                        () -> {
                            displayManager = (DisplayManager) getActivity().getSystemService(Context.DISPLAY_SERVICE);
                            Log.d("CapacitorPresentation", String.valueOf(displayManager));
                            if (displayManager != null) {
                                presentationDisplays = displayManager.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
                                if (presentationDisplays.length > 0) {
                                    Log.d("presentationDisplays", String.valueOf(presentationDisplays[0]));
                                    SecondaryDisplay secondaryDisplay = new SecondaryDisplay(getContext(), presentationDisplays[0]);
                                    secondaryDisplay.loadUrl(url);
                                    Log.d("-> SecondaryDisplay", "Çalışıyor...");
                                    secondaryDisplay.show();
                                }
                            }
                        }
                );

        call.resolve(ret);
    }


    public void notifyToSuccess(WebView view, String url) {
        JSObject response = new JSObject();
        response.put("url", url);
        response.put("message", "success");
        notifyListeners(SUCCESS_CALL_BACK,response, true );
    }

    public void notifyToFail(WebView view, int errorCode) {
        JSObject response = new JSObject();
        response.put("url", errorCode);
        response.put("message", "fail");
        notifyListeners(FAIL_CALL_BACK,response, true );
    }
}
