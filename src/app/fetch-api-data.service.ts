import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  Email: string;
  FavoriteMovies: Array<String>
  Username: string;
  _id: string;
}

export interface Movie {
  Description: string;
  Director: {
    Bio: string;
    Birth: string;
    Death: string;
    ImagePath: string;
    Name: string;
    _id: string;
  }

  Featured: boolean;
  Genre: {
    Description: string;
    ImagePath: string;
    Name: string;
    _id: string;
  }
  ImagePath: string;
  Title: string;
  _id: string
}

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://linhflix-cluelesslinh.vercel.app/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
    this.http = http;
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
  public getAllMovies(): Observable<Array<Movie>> {
    const token = localStorage.getItem('token');
    return this.http.get<Array<Movie>>(apiUrl + 'movies', {
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
  public getMovie(title: any): Observable<any> {
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
  public getDirectors(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(
      apiUrl + `directors/${director}`,
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
   * Get a genre
   * @returns Object - data about genre of a movie
   */
  //return a single genre by name to user
  public getGenre(): Observable<any> {
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
  public getUser(username: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http.get<User>(apiUrl + `users/${username}`, {
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
  public addToFav(username: string, movieId: string): Observable<User> {
    const token = localStorage.getItem('token');
    const response = this.http
      .post<User>(
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
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
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
   * Calls the /users/:username/deregister endpoint
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("user");
    const response = this.http.delete(
      apiUrl + `users/${user}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to remove from favorites
   * @returns an Observable containing a response
   */
  public removeFromFav(username: string, movieId: string): Observable<User> {
    const token = localStorage.getItem('token');
    const response = this.http.delete<User>(
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
  private handleError(error: HttpErrorResponse): Observable<never> {
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
