/**
 * GenreCardComponent view allows a user to visualize info about the genre of a movie.
 * @module GenreCardComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss'],
})
export class GenreCardComponent implements OnInit {
  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {}
}
