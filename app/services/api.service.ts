import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, Request} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ApiService {

    constructor (
        private http: Http
    ) {}

    send(name, id?, item?) {

        let url: string,
            type: any,
            body: any,
            api_key: string = '7b74515365040ec944160e05ca28fa77';

        // Set the right url using the provided name
        switch (name) {

            case 'getMovies':
                url = 'http://api.themoviedb.org/3/movie/'+id+'?api_key=' + api_key;
                type = RequestMethod.Get;
                break;

            case 'getMoviesByPage':
                url = 'http://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&page=' + id;
                type = RequestMethod.Get;
                break;

            case 'getSingleMovie':
                url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=' + api_key;
                type = RequestMethod.Get;
                break;

            case 'getVideo':
                url = 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=' + api_key;
                type = RequestMethod.Get;
                break;

            case 'getImages':
                url = 'https://api.themoviedb.org/3/movie/'+id+'/images?api_key=' + api_key;
                type = RequestMethod.Get;
                break;
        }

        // Define the options for the request
        let options = {
            method: type,
            url: url,
            body: null
        };

        // If the passed item is a string use it
        // Otherwise json stringify it
        if (item) {
            body = typeof item === 'string' ? item : JSON.stringify(item);
            options.body = body;
        }

        // If authHeader is true we need to append the token to the header
        //if (authHeader) options.headers.append('Authorization', 'Basic a3Jlc29nYWxpYzg6WmlkYW5lNTU1');

        return this.http.request(new Request(options))
            .map(res => res.json())

            .catch(error => {
                return Observable.throw(error);
            });
    }
}
