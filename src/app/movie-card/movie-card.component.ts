import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

const user = localStorage.getItem('Name');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

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
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * to gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * to get users favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp:any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, 'favs');
      return this.favs;
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

    /**
   * adds the movie to the users favoritemovies array
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  addToUserFavorites(id:string, title:string): void {
    this.fetchApiData.addMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getUsersFavs();
  }

   /**
   * removes the movie from users favoritemovies array
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  removeFromUserFavorites(id:string, title:string): void {
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getUsersFavs();
  }

     /**
   * Compares movie id's with getUsersFavs returned list to display the favorite movie icon (heart) correctly
   * @param id
   * @returns
   */
   setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
