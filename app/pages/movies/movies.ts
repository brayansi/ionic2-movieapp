import {ViewController} from 'ionic-angular/components/nav/view-controller';
import {MovieTypeService} from './../../services/movieType.service';
import {MyPopover} from './popover';
import {ShortTextPipe} from './../../pipes/shortText.pipe';
import {Component} from '@angular/core';
import {Popover, Loading, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {ApiService} from '../../services/api.service';

@Component({
  templateUrl: 'build/pages/movies/movies.html',
  pipes: [ShortTextPipe]
})


export class MoviesPage {
  movies: Array<{}> = [];
  selectedItem: any;
  movieType: string;
  popover: any;
  title: string = 'Now playing';
  private _movieTypeListener;
  private _page:number=2;
  private _loadingProgress = false;

  constructor(
      private nav: NavController, navParams: NavParams,
      private view: ViewController,
      private api: ApiService,
      private movieTypeService: MovieTypeService) {
          this.selectedItem = navParams.get('item');
  }

  // show popover in header
  showPopover(event){
    this.popover = Popover.create(MyPopover);
    this.nav.present(this.popover, {
      ev: event
    })
  }

  // get single movie
  itemTapped(event, movie) {
        this.api.send('getSingleMovie', movie.id).subscribe(a => console.log(a))
        this.nav.push(ItemDetailsPage, {
            movie: movie
        });
    }

  // infite scroll for movies
  doInfinite(infiniteScroll) {
    if(!this._loadingProgress) {
        this._loadingProgress = true;
        this.api.send('getMoviesByPage', this._page).subscribe(
            res => {
                console.log(res);
                this._page += 1;
                res.results.forEach(b => {
                    this.movies.push({
                        id: b.id,
                        title: b.title,
                        image: b.poster_path,
                        overview: b.overview,
                        rating: b.vote_average
                    })
                })
                setTimeout(() => {
                    this._loadingProgress = false;
                }, 500)
            }
        )
    }
    infiniteScroll.complete();
  }

  ngOnInit() {
        let loading = Loading.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.nav.present(loading);

        this.api.send('getMovies', 'now_playing').subscribe(a => {
            console.log(a);
            this.movies = a.results.map(b => {
                return {
                    id: b.id,
                    title: b.title,
                    image: b.poster_path,
                    overview: b.overview,
                    rating: b.vote_average
                }
            })
            loading.dismiss();
        });

        this._movieTypeListener = this.movieTypeService.newType.subscribe(a => {
            if(a) {
                switch(a) {
                    case 'now_playing':
                        this.title = 'Now playing';
                        break;

                    case 'popular':
                        this.title = 'Popular';
                        break;

                    case 'top_rated':
                        this.title = 'Top rated';
                        break;

                    case 'upcoming':
                        this.title = 'Upcoming';
                        break;

                }
                this.api.send('getMovies', a).subscribe(a => {
                    this.movies = a.results.map(b => {
                        return {
                            id: b.id,
                            title: b.title,
                            image: b.poster_path,
                            overview: b.overview,
                            rating: b.vote_average
                        }
                    })
                })
            }
        });
        
    }
}
