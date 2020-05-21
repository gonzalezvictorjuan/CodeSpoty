import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = 'https://api.spotify.com/v1';

/**
 * En este punto es necesario generar el token por fuera del sistema.
 * TODO: Esto se tiene que implementar de otra manera.
 */
const token = 'Bearer ' + 'BQBpPSXm06_pZ8ufGQgYnw0mIBz7gHKYO54wnczzFuRBr_KNMzahEbLbveCLkdY7ERqHNHPGAsD1Vn4Gszo';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

    constructor( private _http: HttpClient ) { }

    /**
     * Encargado de recuperar las nuevas canciones.
     */
    getNewReleases(): Observable<any> {
        // Spotify por defecto devuelve 5 elementos, si se quiere cambiar usar
        // ?limit=X siendo x la cantidad que se quiera.
        // 'browse/new-releases?limit=30';

        return this._getQuery('/browse/new-releases')
                    .pipe(
                        map( data => {
                            // console.log(data['albums'].items);
                            return data['albums'].items;
                        })
                    );
    }

    /**
     * Encargado de recuperar artistas segun el termino de busqueda.
     * @param termino: string
     */
    getArtistas(termino: string): Observable<any> {
        return this._getQuery(`/search?q=${termino}&type=artist`)
            .pipe(
                map(data => {
                    // console.log(data['artists'].items);
                    return data['artists'].items;
                })
            );
    }

    /**
     * Encargado de recuperar un artista especifico.
     * @param id: string
     */
    getArtista(id: string): Observable<any> {
        return this._getQuery(`/artists/${id}`);
    }

    /**
     * Encargado de recuperar los top tracks de un artista.
     * @param id: string
     */
    getTopTracksArtista(id: string): Observable<any> {
        return this._getQuery(`/artists/${id}/top-tracks?country=us`)
            .pipe(
                map(data => {
                    // console.log(data['tracks'].items);
                    return data['tracks'];
                })
            );
    }

    /**
     * Encargado de recuperar una playlist en particular
     * @param termino: string
     */
    getPlaylist(termino?: string): Observable<any> {
        const EmbajadoresDeCodigo = '3WB6oNCd3HvfpfVCBZE2nJ';

        if (!(termino)) {
            termino = EmbajadoresDeCodigo;
        }

        if (termino == '') {
            termino = EmbajadoresDeCodigo;
        }

        return this._getQuery(`/playlists/${termino}`);

    }

    /**
     * Encargado de crear una peticion abstracta para no repetir codigo.
     * @param query: string
     */
    private _getQuery(query: string): Observable<any> {
        const url = base_url + query;

        const headers = new HttpHeaders({
            'Authorization': token
        });

        return this._http.get(url, { headers });
    }

}
