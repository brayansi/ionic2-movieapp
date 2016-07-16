import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiService} from '../../services/api.service';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  selectedMovie: any;
  singleMovie: any;
  videoSrc: SafeResourceUrl;
  gallery: string;

  constructor(
      private nav: NavController, navParams: NavParams,
      private api: ApiService,
      private sanitizer: DomSanitizationService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedMovie = navParams.get('movie');
  }

  // playTrailer(element) {
  //   this.api.send('playTrailer', this.selectedMovie.id).subscribe(a => {
  //     console.log(a)
  //     this.videoSrc = 'http://www.youtube.com/embed/'+ a.results[0].key +'?html5=1';
  //   })
    
  // }

  ngOnInit() {
      this.api.send('getSingleMovie', this.selectedMovie.id).subscribe(a => {
          this.singleMovie = a;

          this.api.send('getVideo', this.selectedMovie.id).subscribe(a => {
            console.log(a)
            this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/'+ a.results[0].key + '?html5=1');
          })

          this.api.send('getImages', this.selectedMovie.id).subscribe(a => {
            this.gallery = a.backdrops;
            console.log(a)
          })

      })

      
  }
}
