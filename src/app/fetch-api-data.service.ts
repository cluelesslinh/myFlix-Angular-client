import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixcl.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http the HttpClient
   */
  constructor(private http: HttpClient) {
    this.http = http;
  }

  /**
   * Handles the error passed as argument
   * @param error the error to handle
   * @returns the handled error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened, please try again later. 💔');
  }

  /**
   * Non-typed response extraction
   * @param res the response to extrac
   * @returns the body of the response
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Calls the user registration endpoint
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /login endpoint
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const { Username, Password } = userDetails;
    return this.http
      .post(apiUrl + 'login?Username=' + Username + '&Password=' + Password, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /movies endpoint
   * @returns an Observable containing a response
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'catalog/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });

    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /movies/:movieTitle endpoint
   * @param movieTitle the id of the movie to retrieve
   * @returns an Observable containing a response
   */
  public getMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'catalog/movies/' + movieTitle, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /directors/:directornName endpoint
   * @param directorNane the name of the actor to retrieve
   * @returns an Observable containig a response
   */
  public getDirector(directorNane: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(
      apiUrl + 'catalog/directors/' + directorNane,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /genres/:genreName endpoint
   * @param genreName the name of the genre to retrieve
   * @returns an Observable conianing a response
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'catalog/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/:username endpoint
   * @param username the name of the user to retrieve
   * @returns an Observable conianing a response
   */
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/username/favorites endpoint
   * @param username the username of the user to retrieve the favorite movies of
   * @returns an Observable containing a response
   */
  public getFavMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(
      apiUrl + 'users/' + username + '/favorites',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToFav(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const response = this.http
      .post(
        apiUrl + 'users/' + username + '/favorites/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));

    return response;
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to remove from favorites
   * @returns an Observable containing a response
   */
  public removeFromFav(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/favorites/' + movieId,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/:username/deregister endpoint
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/deregister',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the PUT /users/:username
   * @param username the user we want to update the info of
   * @param updatedInfo the new info
   * @returns an Observable containing a response
   */
  public editUser(username: string, updatedInfo: object): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + 'users/' + username, updatedInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}
