import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input()
  public gif!: Gif; // Se define así porque aca estamos seguros de que se envia el Gif

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is required');
  }

}
