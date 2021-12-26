/**
 * SynopsisCardComponent view allows a user to visualize the synopsis of a movie in a dialog
 * @module SynopsisCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss'],
})
export class SynopsisCardComponent implements OnInit {
  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
    }
  ) {}

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {}
}
