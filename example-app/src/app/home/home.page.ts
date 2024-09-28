import { Component } from '@angular/core';
import { CapacitorPresentation } from 'presentation-capacitor';
import { HtmlExample } from '../html-example';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  openVideo() {
    CapacitorPresentation.open({
      type: "video",
      videoOptions: {
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      }
    })
  }

  openUrl() {
    CapacitorPresentation.open({
      type: "url",
      url: "https://github.com/TheeMachine/presentation-capacitor"
    })
  }

  openLocal() {
    CapacitorPresentation.open({
      type: "url",
      url: "second-page"
    })
  }

  openHtml() {
    CapacitorPresentation.open({
      type: "html",
      html: HtmlExample
    })
  }
}
 