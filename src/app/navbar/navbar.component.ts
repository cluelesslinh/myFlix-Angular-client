/**
 * NavbarComponent view renders a side nav and toolbar to facilitate the navigation for the user
 * @module NavbarComponent
 */

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Signs a user out by clearing the localStorage and redirecting to the welcome page.
   */
  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You successfully logged out! 👋', 'Bye', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }
}
