package com.machine.thee.presentation;

import android.annotation.SuppressLint;
import android.app.Presentation;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.getcapacitor.Plugin;

import java.util.function.Function;

public class SecondaryDisplay extends Presentation {

    CapacitorPresentationPlugin capPlugin = new CapacitorPresentationPlugin();

    protected String url = "";

    public SecondaryDisplay(Context outerContext, Display display) {
        super(outerContext, display);
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secondary_display);

        WebView webView = findViewById(R.id.secondary_webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setAllowFileAccess(true);
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        String path = url;
        /*
        if(!url.startsWith("https://")) {
            path = Uri.parse("file:///android_asset/public/index.html?route=" + url).toString();
        } else {
            path = url;
        }
         */
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String _url) {
                capPlugin.notifyToSuccess(webView, _url);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    capPlugin.notifyToFail(webView, error.getErrorCode());
                } else {
                    capPlugin.notifyToFail(webView, 400);
                }
            }
        });
        webView.loadDataWithBaseURL(null, path, "text/html", "UTF-8", null);
    }

    public void loadUrl(String url) {
       this.url = url;

    }
}