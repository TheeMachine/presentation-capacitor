package com.machine.thee.presentation;

public class VideoOptions {
  boolean showControls = false;
  String videoUrl = "";

  VideoOptions(String videoUrl,boolean showControls) {
    this.showControls = showControls;
    this.videoUrl = videoUrl;
  }
}
