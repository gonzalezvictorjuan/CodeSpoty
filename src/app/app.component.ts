import { constantes } from './../environments/constantes';
import { AccessTokenService } from './services/access-token.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Component } from '@angular/core';
import { RoutePrevioService } from './services/route-previo.service';
import { Location } from '@angular/common';

const token = constantes.token;
const urlAToken: string = 'access_token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'CodeSpoty';

    constructor(private _routerPrevio: RoutePrevioService,
                private _accessToken: AccessTokenService,
                private _router: Router,
                private _location: Location
        ) {
        this._routerPrevio.registrarUrls();

        this._router.events.subscribe(
            (data) => {
                if (data instanceof RoutesRecognized) {
                    const URL = this._location.path();

                    if (URL.split('=')[0] === urlAToken) {
                        let param = this._obtenerParametrosHash(URL);

                        let newToken = param[urlAToken];

                        if ( newToken ) {
                            sessionStorage.setItem(token, newToken);
                            this._accessToken.actualizarToken();
                        }
                    }
                }
            });
    }

    private _obtenerParametrosHash(url) {
        const regExp = /([^&;=]+)=?([^&;]*)/g;

        let hashParams = {};
        let iterador = [];

        // tslint:disable-next-line: no-conditional-assignment
        while (iterador = regExp.exec(url)) {
            hashParams[iterador[1]] = decodeURIComponent(iterador[2]);
        }
        return hashParams;
    }

}
