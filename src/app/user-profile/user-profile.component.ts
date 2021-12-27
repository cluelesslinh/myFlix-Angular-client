/**
 * UserProfileComponent view allows a user to see their profile info,
 * provides the options to edit or delete the profile
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favMovies: any = {};

  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Fetches the user info from localStorage if present, otherwise it
   * fetches them from the backend
   */
  getUserData(): void {
    const username = localStorage.getItem('username') || '';
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * Opens a dialog asking the user if they want to proceed with the user deregistration
   */
  deleteUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '400px',
      panelClass: 'delete-user-dialog',
    });
  }

  /**
   * Opens a dialog holding a form to edit the user's info
   */
  editUser(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '300px',
    });
  }
}
