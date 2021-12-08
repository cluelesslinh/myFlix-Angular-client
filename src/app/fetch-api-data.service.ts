import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixcl.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * Registration to the API
   * @param userDetails
   * @returns status message: success/error
   */
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Login to the Application
   * @param userDetails
   * @returns status message: success/error
   */
  //Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies method
   * @returns array of movies
   */
  // To Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get one particular movie
   * Method handled by website, movie cards contain data
   * @returns Object - data about a single movie
   */
  //get movie by title
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/:title`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a director
   * @returns Object - data about the director of a movie
   */
  //Return a single director by name to user
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/:director`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a genre
   * @returns Object - data about genre of a movie
   */
  //return a single genre by name to user
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/:name`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get one user by username
   * @param username
   * @returns Object - data about a user
   */
  //get a user by username
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
   * Makes an API call to get the list of favorite movies
   * @param username
   * @returns a list (array) of favorite movies
   */
  // get list of favorite movies

  public getFavMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(
      apiUrl + `users/${username}/movies`,
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
        apiUrl + `users/${username}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));

    return response;
  }

  /**
   * Update user information
   * @param userData, username (Injected automatically, username extracted from login params)
   * @returns status message: success/error
   */
  // Update a user's info, by username
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('users/:Username');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to delete the account of a user
   * @returns status message: success or error
   */
  // Delete a user by username
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('/users/:Username/movies/:MovieID');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
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
      apiUrl + `users/${username}/movies/${movieId}`,
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
   * Non-typed response extraction
   * @param res
   * @returns body of response
   */
  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   *
   * @param error
   * @returns status of an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        'Error body is:' + JSON.stringify(error.error));
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
