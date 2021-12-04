import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };


  user: any = {};
  movies: any = {};
  favorites: any = {};

  /**
   *
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

 /**
   * ngOnInit() is a place to put the code that we need to execute at very first as soon as the class is instantiated
   * This method will run the getUser method after the User Profile Component is initialised and rendered.
   * @returns User object.
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * This method will get user details and array of user's favorite movies
   */
   getUserData(): void {
    let user = localStorage.getItem('Name');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * This method will get user's favorite movie array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
      console.log(this.user);
    });
  }

  /**
   * This method filters user's movies
   * @returns favorite movies
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }


  /**
   * This method will delete a movie from user's favorite movies
   * @param id
   * @param title
   */
  removeFromFavs(id: string, title: string): void {
    this.fetchApiData.removeFromFav(id, title).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed successfully!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

  /**
   * This method will update user's profile data
   */
  editUser(): void {
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      width: '280px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserData();
    });
  }

  /**
   * Deletes user's account
   */
  deleteUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '280px'
    });
  }

  /**
   * Opens modal with movie genre information
   * @param name
   * @param description
   */
  showGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
    });
  }

  /**
   * Opens modal with movie director information
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  showDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth, death },
    });
  }

  /**
   * Opens modal with movie synopsis
   * @param title
   * @param description
   * @param director
   * @param genre
   * @param releaseYear
   * @param imdbRating
   * @param actors
   */
  showSynopsis(title: string, description: string, director: string, genre: string, releaseYear: number, imdbRating: number, actors: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, description, director, genre, releaseYear, imdbRating, actors },
    });
  }
}
