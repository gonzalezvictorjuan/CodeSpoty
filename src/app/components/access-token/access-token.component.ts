import { constantes } from './../../../environments/constantes';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

const vinculoUrl = constantes.vinculoUrl;

@Component({
    selector: 'app-access-token',
    template: ``,
    styleUrls: []
})
export class AccessTokenComponent {

    private _vinculoURL: string;

    constructor( private _route: Router) {
        this._vinculoURL = sessionStorage.getItem(vinculoUrl);

        if (this._vinculoURL) {
            sessionStorage.removeItem(vinculoUrl);
            this._route.navigate([this._vinculoURL]);
        } else {
            this._route.navigate(['/']);
        }
    }

}
