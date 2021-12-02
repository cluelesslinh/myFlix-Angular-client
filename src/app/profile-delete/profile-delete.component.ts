import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {
  /**
   *
   * @param fetchApiData
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * This method will delete user's account from the database
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open('Your account has been deleted!', 'OK',
        { duration: 3000,}
      );
      localStorage.clear();
    },
      (result) => {
      this.snackBar.open(result, 'OK', {duration: 3000,});
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
    }
    );
  }

  /**
   * This method will give user an option to cancel deletion of account
   */
  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}
