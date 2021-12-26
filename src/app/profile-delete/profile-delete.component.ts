/**
 * ProfileDeleteComponent view allows the user to deregister their profile.
 * @module ProfileDeleteComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss'],
})
export class ProfileDeleteComponent implements OnInit {
  //Getting the user info from localStorage if present
  user: any = localStorage.getItem('user');

  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * Deregister the user by invoking the service deleteUser which removes a user from the database.
   * A snack bar element is shown, holding a message with the result of the operation.
   */
  deregisterUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      () => {
        this.snackBar.open(
          `The user ${this.user.Username} has been deregistered`,
          'Great',
          {
            duration: 2000,
          }
        );
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open('Something went wrong, please try later. 😿', 'Ok', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
