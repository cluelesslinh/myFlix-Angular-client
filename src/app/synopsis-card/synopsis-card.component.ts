import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(

    /**
     * uses Inject to get movie details from the movie object
     */
     @Inject(MAT_DIALOG_DATA)
     public data: {
       title: string;
       description: string;
    }

  ) { }

  ngOnInit(): void {
  }
}
