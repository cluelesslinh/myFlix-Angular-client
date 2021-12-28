/**
 * DirectorCardComponent view allows a user to visualize info about the director of a movie.
 * @module DirectorCardComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss'],
})
export class DirectorCardComponent implements OnInit {
  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birthDate: any;
      deathDate: any;
    }
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {}
}
