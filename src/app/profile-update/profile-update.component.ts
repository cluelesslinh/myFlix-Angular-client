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
  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

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
   * This method will will send input data to database and will upadate user account details
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close();
      localStorage.setItem('username', res.username)
      console.log(res)
        this.snackBar.open('Successfully updated user details!', 'OK', {
        duration: 2500
        });
    }, (resp) => {
      this.snackBar.open(resp, 'OK', {
        duration: 2500
      });
      setTimeout(function () {
        window.location.reload();
       }, 3500);
    });
  }
}
