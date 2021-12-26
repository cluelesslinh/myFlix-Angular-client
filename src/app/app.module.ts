import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DirectorCardComponent } from './director-card/director-card.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { SynopsisCardComponent } from './synopsis-card/synopsis-card.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileDeleteComponent } from './profile-delete/profile-delete.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: NavbarComponent },
  { path: 'user', component: NavbarComponent },
  { path: 'favorites', component: NavbarComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    SynopsisCardComponent,
    MovieCardComponent,
    WelcomePageComponent,
    DirectorCardComponent,
    GenreCardComponent,
    UserProfileComponent,
    NavbarComponent,
    ProfileUpdateComponent,
    ProfileDeleteComponent,
    UserFavoritesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
