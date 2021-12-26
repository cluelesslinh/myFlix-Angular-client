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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any[] = this.user.FavoriteMovies;

  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
   ngOnInit(): void {
     const username = localStorage.getItem("username");
     if (username) {
     this.getUsersFavs(username);
    }
   }

   /**
    * Updates the local list of favorites by downloading it from the DB
    */
    getUsersFavs( username: string ): any {
        forkJoin([
          this.fetchApiData.getUser(username),
          this.fetchApiData.getAllMovies()
        ])
          .subscribe(([ user, movies ]) => {
            console.log("Forked?",  user, movies);
            this.favMovies = user.FavoriteMovies
              .map(
                (movieId) => movies.find((movie) => movie._id === movieId)
              );
          });
      }


  /**
   * Opens a dialog containing info about the genre
   * @param name the name of the genre
   * @param description the description of the genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * Opens a dialog containing info about the director
   * @param name the name of the director
   * @param bio the bio of the director
   * @param birthDate bith date of the director
   * @param deathDate death date of the director
   */
  openDirector(
    name: string,
    bio: string,
    birthDate: any,
    deathDate: any
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birthDate,
        deathDate,
      },
      width: '500px',
    });
  }

  /**
   * Opens a dialog containing info about the movie
   * @param title the title of the movie
   * @param description the description of the movie
   */
  openSynopsis(
    title: string,
    description: string
  ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        title,
        description
      },
      width: '500px',
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
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 2000,
          }
        );
        //this.ngOnInit();
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
        this.snackBar.open(
          `${title} has been removed from your favorite movies ✔️`,
          'Alright',
          {
            duration: 2000,
          }
        );
        //this.ngOnInit();
      });
    //return this.getUserFavs();
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
