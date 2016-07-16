import {MovieTypeService} from './../../services/movieType.service';
import {Component} from '@angular/core';


@Component({
  template: `
    <ion-list radio-group [(ngModel)]="movieType" (ionChange)="changeMovieType(movieType)" class="popover-page">
      <ion-item>
        <ion-label>Now playing movies</ion-label>
        <ion-radio value="now_playing" checked="true"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Popular movies</ion-label>
        <ion-radio value="popular"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Top rated movies</ion-label>
        <ion-radio value="top_rated"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Upcoming movies</ion-label>
        <ion-radio value="upcoming"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})

export class MyPopover{
  selectedType: string;

  constructor(
    private _movieTypeService: MovieTypeService
  ) {

  }

  changeMovieType(movieType) {
      this._movieTypeService.createNewType(movieType)
  }
}