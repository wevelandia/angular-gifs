import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';


// Cuando se trabaja con providedIn: 'root', se hace que este servicio (GifsService) se pueda trabajar ne toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // Estos gifList no se creo como una propiedad privata y con un get. Porque esta llista es volatil porque cada vez que se realice una consulta
  // esta lista se va a volver a crear.
  public gifList: Gif[] = [];

  // Propiedad para ir guardando lo que el usuario escribe en la busqueda.
  private _tagsHistory: string[] = [];
  private apiKey:       string   = 'ZG4udDmo7QR9AwyWr4HmfOr6uptSHZl0';
  private serviceUrl:   string   = 'https://api.giphy.com/v1/gifs';

  // Inyectamos un serbvicio de HttpClientModule
  constructor( private http: HttpClient ) {

    // Realizamos el llamado a loadLocalStorage
    this.loadLocalStorage();

   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    // Pasamos todo a minusculas
    tag = tag.toLowerCase();

    // Verificamos si esta incluido el tag dentro de la lista sino retornamos solo los diferentes
    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);

    // Limitamos el _tagsHistory a 10 elementos
    this._tagsHistory = this._tagsHistory.splice(0,10);

    // Aca se hace el llamado para guardar los datos en LocalStorage
    this.saveLocalStorage();

  }

/*   searchTag( tag: string ): void {

    if (  tag.length === 0) return;

    // Realizamos una función para buscar el tag si ya fue digitado lo aceptamos pero borramos el primer buscado
    this.organizeHistory( tag );

    // Insertarlo al inicio
    //this._tagsHistory.unshift(tag);

  } */

/*   async searchTag( tag: string ): Promise<void> {

    if (  tag.length === 0) return;
    this.organizeHistory( tag );

    // Esta es una manera de consumir las Apis.
    fetch('https://api.giphy.com/v1/gifs/search?api_key=ZG4udDmo7QR9AwyWr4HmfOr6uptSHZl0&q=valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );

  } */

  // Creamos metodos para grabar en el LocalStorage
  private saveLocalStorage():void {
    localStorage.setItem( 'history', JSON.stringify( this._tagsHistory ) );
  }

  // Creamos metodo para cargar de LocalStorage
  private loadLocalStorage():void {
    // Preguntamos si tenemos el elemento history en LocalStorage
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    //const temporal = localStorage.getItem('history');

    // Realizamos el cargue del primer elemento para cuando se carga la pagina, o se habre el explorador,
    // como se tiene un historial en localhost se visualizan las imagenes del primer item que esta en el sidebar.
    if ( this._tagsHistory.length === 0 ) return;

    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ):void {

    if (  tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', tag );

    // resp es del tipo SearchResponse que se tomo copiando el resultado en postman y convirtiendolo en la aplicación de: https://app.quicktype.io/
    // Tecnicamente resp no lleva el tipo de dato aca, porque para este punto ya deberiamos de saber como luce este objeto.
    // resp:SearchResponse
    // como get es generico es allí donde se define el tipo de dato.

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`,{ params })
      .subscribe( resp => {
        //console.log(resp.data);
        this.gifList = resp.data;
        //console.log({ gifs: this.gifList });
      } );

  }


}
