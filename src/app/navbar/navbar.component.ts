import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

const username = localStorage.getItem('username')

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    ) { }

  ngOnInit(): void {
  }

  /**
   * opens modal with user details
   */
  movies(): void {
    this.router.navigate(['movies']);
  }

  favorites(): void {
    this.router.navigate(['favorites']);
  }

  /**
   * Navigates to the profile page.
   */
  goToProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px'
    } );
  }

  /**
   * This method will clear the token and username from local storage.
   * Logs user out and navigates to the welcome page.
   */
  signOut(): void {
    localStorage.clear;
    this.router.navigate(['welcome']);
    this.snackBar.open('You are logged out!', 'OK', {
      duration: 2000
    });
  }
}
