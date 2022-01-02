/**
 * UserFavoritesComponent view allows a user to view their list of favorites
 * offering the option to remove a movie from the list of favorites or visualize info about director, genre and its synopsis.
 * @module UserFavoritesComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService, Movie, User } from '../fetch-api-data.service';
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
  movies: Movie[] = [];
  favMovies: any[] = [];

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
     const username = localStorage.getItem('username');
     if (username) {
     this.getUsersFavs(username);
     console.log(this.getUsersFavs(username))
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
          this.favMovies = user.FavoriteMovies
            .reduce(
              (favMovies: Movie[], movieId: String) => {
                const movie = movies.find((movie) => movie._id === movieId);

                if(movie) {
                  favMovies.push(movie);
                }
                return favMovies;
               },
              []
            );
        });
      }

      /**
       * Removes a movie from the user's list of favorites
       * @param movieId the id of the movie
       * @param title the title of the movie
       */
     removeFromFavs(movieId: string, title: string): void {
       const username = localStorage.getItem('username');
       if(username)
       this.fetchApiData
         .removeFromFav(username, movieId)
         .subscribe((user: User) => {
           this.favMovies = user.FavoriteMovies
           .reduce(
             (favMovies: Movie[], movieId: String) => {
               const movie = this.movies.find((movie) => movie._id === movieId);

               if(movie) {
                 favMovies.push(movie);
               }
               return favMovies;
              },
             []
           );
           console.log("remove from favs", user.FavoriteMovies, this.favMovies)
           this.snackBar.open(
             `${title} has been removed from your favorite movies ✔️`,
             'Alright',
             {
               duration: 2000,
             }
           );
           //this.ngOnInit();
         });
       //return this.getUsersFavs();
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
     * Checks if a movie is included in the user's list of favorites
     * @param movieId the id of the movie
     * @returns true if the movie is in the list of favorites, false otherwhise
     */
    isFav(movieId: string): boolean {
      return this.favMovies.some((movie) => movie._id === movieId);
    }
  }
