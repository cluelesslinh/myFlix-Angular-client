import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  user: any = localStorage.getItem('user') || '';

  /**
   * This decorator binds the form input values to the userData object
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthdate: this.user.Birthdate,
  };

  /**
   *
   * @param data
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Updates the info of the user, sending the data to the backend.
   * A snack bar element is shown, containing the result of the operation
   */
  editUser(): void {
    this.fetchApiData
      .editUser(this.userData)
      .subscribe((res) => {
        this.dialogRef.close();
        //updating the localstorage with the updated user
        localStorage.setItem('user', JSON.stringify(res));
        this.snackBar.open('The profile was successfully updated! 👏', 'Nice', {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  }
}
