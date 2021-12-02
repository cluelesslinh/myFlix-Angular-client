import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
        name: string;
        description: string;
    }
  ) { }

  ngOnInit(): void {
  }
}
