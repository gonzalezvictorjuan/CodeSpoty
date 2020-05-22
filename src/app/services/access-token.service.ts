import { environment } from './../../environments/environment';
import { constantes } from './../../environments/constantes';
import { Injectable } from '@angular/core';

const token = constantes.token;
const vinculo = constantes.vinculoUrl;
const ClientId = constantes.clientId;
const ClientSecret  = constantes.clientSecret;
const redirectUri = environment.redirectUri;

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

    private _credenciales = {
        clientId: ClientId,
        clientSecret: ClientSecret,
        accessToken: ''
    };

    private _request = {
        authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
            this._credenciales.clientId + '&response_type=token' +
            '&redirect_uri=' +
            encodeURIComponent(redirectUri) +
            '&expires_in=3600',
        refreshaAcessToken: 'https://accounts.spotify.com/api/token'
    };

    constructor() { }

    /**
     * Encargado de retornar el token con el formato correcto para los llamados.
     */
    getToken(): string {
        if (this._credenciales.accessToken != '') {
            return 'Bearer ' + this._credenciales.accessToken;
        }

        return '';
    }

    /**
     * Actualiza la variable interna del token.
     */
    actualizarToken(): void {
        this._credenciales.accessToken = sessionStorage.getItem(token);
    }

    /**
     * Encargado de checkear si el token esta seteado.
     */
    checkToken(): boolean {
        return !!this._credenciales.accessToken;
    }

    /**
     * En caso de que no este seteado el token, redirijo al login de Spotify
     */
    checkLogin(): void {
        if (!(this.checkToken())) {
            sessionStorage.setItem(vinculo, location.href);
            window.location.href = this._request.authorize;
        }
    }

    /**
     * Limpia las variables locales y de sistema y redirije al login de Spotify
     */
    tokenRefreshURL(): void {
        this._credenciales.accessToken = '';
        sessionStorage.removeItem(token);
        this.checkLogin();
    }

}
