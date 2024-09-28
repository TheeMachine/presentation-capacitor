package com.machine.thee.presentation;

import android.annotation.SuppressLint;
import android.app.Presentation;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.VideoView;

import androidx.annotation.RequiresApi;

import com.getcapacitor.CapacitorWebView;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;

import java.io.IOException;
import java.util.Objects;
import java.util.function.Function;


public class SecondaryDisplay extends Presentation {

  CapacitorPresentationPlugin capPlugin = new CapacitorPresentationPlugin();
  private MyWebServer webServer;
  protected String url = "";
  protected String video = "";
  private WebView webView;
  private VideoView videoView;

  private Context outerContext;

  public SecondaryDisplay(Context outerContext, Display display) {
    super(outerContext, display);
    this.outerContext = outerContext;
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_secondary_display);
    webView = findViewById(R.id.secondary_webview);
    videoView = findViewById(R.id.videoView);
  }

  public void init(OpenType type, VideoOptions data) {
    if (Objects.requireNonNull(type) == OpenType.VIDEO) {
      video = data.videoUrl;
      startVideo(data.showControls);
    }
  }

  public void init(OpenType type, String data) {
    switch (type) {
      case URL:
      case HTML:
        url = (String) data;
        this.startWebView(type);
        break;
    }
  }

  @SuppressLint("SetJavaScriptEnabled")
  private void startWebView(OpenType type) {
    if (webView != null) {
      WebSettings webSettings = webView.getSettings();
      webSettings.setJavaScriptEnabled(true);
      webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
      webSettings.setDomStorageEnabled(true);
      webSettings.setDatabaseEnabled(true);
      webSettings.setAllowContentAccess(true);
      webSettings.setAllowFileAccess(true);
      webSettings.setMediaPlaybackRequiresUserGesture(false);
      webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
      webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
      String path = url;

      if (!url.startsWith("https://") && !url.startsWith("https://") && type != OpenType.HTML) {
        path = Uri.parse("http://localhost:8080/" + url).toString();
        startWebServer(path);
      } else {
        path = Uri.parse(url).toString();
      }


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
      webView.setWebChromeClient(new WebChromeClient());
      if(type == OpenType.HTML) {
        webView.loadDataWithBaseURL(null, path, "text/html", "UTF-8", null);
      } else {
        webView.loadUrl(path);
      }
    }
  }

  private void startVideo(boolean showControls) {
    webView.setVisibility(View.GONE);
    videoView.setVisibility(View.VISIBLE);

    String videoUrl = video;
    Uri uri = Uri.parse(videoUrl);
    videoView.setVideoURI(uri);

    if(showControls) {
      MediaController mediaController = new MediaController(this.getContext());
      mediaController.setAnchorView(videoView);
      videoView.setMediaController(mediaController);
    }

    videoView.start();
  }

  public void startWebServer(String path) {
    if (webServer == null) {
      try {
        webServer = new MyWebServer(this.getContext(), 8080, path);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

  }
}