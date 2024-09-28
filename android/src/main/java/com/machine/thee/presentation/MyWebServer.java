package com.machine.thee.presentation;

import android.content.Context;
import android.content.res.AssetManager;


import java.io.IOException;
import java.io.InputStream;

import fi.iki.elonen.NanoHTTPD;

public class MyWebServer extends NanoHTTPD {

  private final Context context;

  protected String html;

  public MyWebServer(Context context, int port, String html) throws IOException {
    super(port);
    this.context = context;
    this.html = html;
    start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
    System.out.println("Web server started on port: " + port);
  }

  @Override
  public Response serve(IHTTPSession session) {
    String uri = session.getUri();
    if (!uri.contains(".") || uri.equals("/")) {
      uri = "/index.html";
    }

    return getAssetFileResponse(uri);
  }


  private Response getAssetFileResponse(String uri) {
    AssetManager assetManager = context.getAssets();
    InputStream inputStream;

    try {

      inputStream = assetManager.open("public" + uri);
      String mimeType = getMimeType(uri);


      return newChunkedResponse(Response.Status.OK, mimeType, inputStream);
    } catch (IOException e) {
      e.printStackTrace();

      return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "404 - File Not Found");
    }
  }

  private String getMimeType(String uri) {
    if (uri.endsWith(".js")) {
      return "application/javascript";
    } else if (uri.endsWith(".html")) {
      return "text/html";
    } else if (uri.endsWith(".css")) {
      return "text/css";
    } else if (uri.endsWith(".png")) {
      return "image/png";
    } else if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) {
      return "image/jpeg";
    } else if (uri.endsWith(".gif")) {
      return "image/gif";
    } else if (uri.endsWith(".svg")) {
      return "image/svg+xml";
    } else if (uri.endsWith(".json")) {
      return "application/json";
    }

    return "text/plain";
  }
}
