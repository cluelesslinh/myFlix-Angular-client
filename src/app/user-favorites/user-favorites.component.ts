/**
 * UserFavoritesComponent view allows a user to view their list of favorites
 * offering the option to remove a movie from the list of favorites or visualize info about director, genre and its synopsis.
 * @module UserFavoritesComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favMovies: any[] = this.user.FavoriteMovies;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    ) { }

  /**
   * to get movies and favoritemovies when being initialized
   */
  ngOnInit(): void {
    const username = localStorage.getItem("username");
    this.getMovies();
    if (username) {
    this.getUsersFavs(username);
   }
  }

  /**
   * to gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * to get users favorite movies
   */
  getUsersFavs( username: string ): any {
    this.fetchApiData.getUser(username).subscribe((res:any) => {
      this.user = res;
      this.favMovies = res.FavoriteMovies;
      return this.favMovies;
    })
  }

  /**
   * opens genre modal with infos about genre
   * @param name (genre name)
   * @param description (genre description)
   */
  openGenre(name:string, description:string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
      width: '500px'
    });
  }

   /**
   * opens director modal with infos about director
   * @param name (director name)
   * @param bio (director bio)
   * @param birthYear (director birthYear)
   */
  openDirector(name:string, bio:string, birth:number ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birth},
      width: '500px'
    });
  }

   /**
   * opens synopsis modal with infos about movie
   * @param title (movie title)
   * @param imageUrl (movie image/cover)
   * @param description (movie description)
   */
  openSynopsis(title:string, imageUrl:any, description:string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {title, imageUrl, description},
      width: '500px'
    });
  }

  getUserFavs( username: string ): any {
    this.fetchApiData.getFavMovies(username).subscribe((res: any) => {
      this.user = res;
      this.favMovies = res.Favorites;
      return this.favMovies;
    });
  }

  /**
   * Adds a movie to the user's list of favorites
   * @param movieId the id of the movie
   * @param title the title of the movie
   */
  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addToFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.favMovies = res.FavoriteMovies;
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 2000,
          }
        );
      //  this.ngOnInit();
      });
    //return this.getUserFavs();
  }

  /**
   * Removes a movie from the user's list of favorites
   * @param movieId the id of the movie
   * @param title the title of the movie
   */
  removeFromFavs(movieId: string, title: string): void {
    this.fetchApiData
      .removeFromFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.favMovies = res.FavoriteMovies;
        this.snackBar.open(
          `${title} has been removed from your favorite movies ✔️`,
          'Alright',
          {
            duration: 2000,
          }
        );
      //  this.ngOnInit();
      });
  //  return this.getUserFavs();
  }

  /**
   * Checks if a movie is included in the user's list of favorites
   * @param movieId the id of the movie
   * @returns true if the movie is in the list of favorites, false otherwhise
   */
  isFav(movieId: string): boolean {
    return this.favMovies.some((m) => m === movieId);
  }

  /**
   * Toggles the heart shaped icon from full to empty, and invokes the method to add or
   * remove a function from the user's list of favorites
   * @function toggleFavs
   * @param movie the movie to add/remove to/from favs
   */
  toggleFavs(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFromFavs(movie._id, movie.Title)
      : this.addToFavs(movie._id, movie.Title);
  }
}