package com.machine.thee.presentation;

public enum OpenType {
  URL("url"),
  VIDEO("video"),
  HTML("html");

  private final String type;

  OpenType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}