/**
 * LoginFormComponent view allows a user to login into the app
 * @module LoginFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Required for the login form
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,) { }

    /**
     * Initializes the component
     * @ignore
     */
  ngOnInit(): void {
  }

   /**
   * Sends a login request, if successful,
   * - saves username to local storage (for future requests)
   * - saves token to local storage (for future requests)
   * - redirects to the '/movies' API endpoint
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

  // Store current user and token in localStorage.
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('token', result.token);
  // Logic for a successful user registration
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 1000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 1000
      });
    });
  }
}
