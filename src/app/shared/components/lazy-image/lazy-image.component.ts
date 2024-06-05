import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  // Definir variable para saber si ha cargado la imagem
  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required.');
  }

  onLoad() {
    //console.log('Image loaded');

    // Simular demora en el tiempo para ver el cargue de las imagenes
    /* setTimeout(() => {
      this.hasLoaded = true;
    }, 1000); */

    this.hasLoaded = true;
  }

}
