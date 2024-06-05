import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  // Este metodo seria publico
  get tags(): string[] {
    // Regreso los tagsHistory
    return this.gifsService.tagsHistory;
  }

  // Este metodo se llama al momento de dar clic en el sidebar para volver a consultar.
  searchTag( tag: string):void {
    this.gifsService.searchTag( tag );
  }
}
