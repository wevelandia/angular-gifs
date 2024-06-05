import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  //templateUrl: './search-box.component.html',
  //#txtTagInput: Referencia local al template solo el HTML
  // Con @ViewChild en la linea (keyup.enter)="searchTag( txtTagInput.value )" ta no se requiere de enviar el dato.
  // Con @ViewChildren tomaria la refrencia demas de una input o elemento html.

  template:`
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput>
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  // Esta propiedad tagInput hace referencia a nuestro txtTagInput mediante el uso del decorador ViewChild,
  // el elemento HTML debe de ir en ViewChild sin el caracter #.
  // tagInput!: El signo ! nos indica que siempre va a tener un valor.
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // Inyectamos aca el servicio
  constructor( private gifsService: GifsService ) {}

  /* searchTag( newTag: string ) {
    console.log({ newTag });
  } */

  // Como el elemento HTML txtTagInput ya lo tenemos en tagInput no necesitamos recibirlo como parametro en searchTag
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    //console.log({ newTag });
    // Llamamos el servio searchTag para insertarlo en this._tagsHistory
    this.gifsService.searchTag(newTag);

    // Blanquemos el input
    this.tagInput.nativeElement.value = '';
  }
}
