import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutePrevioService {

    previaUrl: string;
    actualUrl: string;

    constructor( private _router: Router ) { }

    /**
     * Encargado de guardar de forma local la url actual y la previa a esta.
     */
    registrarUrls(): void {
        this.actualUrl = this._router.url;
        this._router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.previaUrl = this.actualUrl;
                    this.actualUrl = event.url;
                }
        });
    }
}
