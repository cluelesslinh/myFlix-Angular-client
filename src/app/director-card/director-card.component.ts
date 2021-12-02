import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  constructor(

    /**
     * using Inject to get movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name:string;
      bio:string;
      birth:number;
    }

  ) { }

  ngOnInit(): void {
  }
}
