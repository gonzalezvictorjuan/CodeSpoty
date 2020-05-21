import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit, OnDestroy {

    artista: any;
    topTracks: any;
    idParam: string;
    loading: boolean;

    error: boolean;
    textoError: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    readonly base_spotify_play: string = 'https://open.spotify.com/embed/';
    readonly base_spotify_follow: string = 'https://open.spotify.com/follow/1/?uri=spotify:artist:';

    constructor( private _activatedRoute: ActivatedRoute,
                 private _spotify: SpotifyService
                ) {
        this.error = false;

        this._activatedRoute.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe( params =>  {
                console.log(params['id']);
                this.idParam = params['id'];
            });
    }

    ngOnInit(): void {
        this.loading = true;

        /**
         * El Promise.all me permite esperar a que todas las promesas se cumplan,
         * pero si ocurre un error en alguna corta la ejecucion del resto y sale por el error.
         * Me permite controlar bien la visualizacion del DOM.
         */
        Promise.all([
            this._getArtista(this.idParam),
            this._getTopTracks(this.idParam)
        ]).then(
            (data) => {
                // console.log(data);
                this.artista = data[0];
                this.topTracks = data[1];
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.error = true;
                this.loading = false;
                this.textoError = error.error.error.message || 'Error con la API de Spotify';
            }
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    transformUrl(uri: string): string {
        uri = uri.replace(/spotify:/g, '');
        uri = uri.replace(/:/g, '/');
        return uri;
    }

    private _getArtista(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._spotify.getArtista(id)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    (artista) => {
                        resolve(artista);
                    },
                    reject
                );
        });
    }

    private _getTopTracks(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._spotify.getTopTracksArtista(id)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    (tracks) => {
                        resolve(tracks);
                    },
                    reject
                );
        });
    }

    // Forma Simple

    // private _getArtista(id: string): void {
    //     this.loading = true;
    //     this._spotify.getArtista(id)
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .subscribe(
    //             (artista) => {
    //                 console.log(artista);
    //                 this.artista = artista;
    //                 this.loading = false;
    //             },
    //             (error) => {
    //                 console.log(error);
    //                 this.loading = false;
    //                 this.error = true;
    //                 this.textoError = error.error.error.message || 'Error con la API de Spotify';
    //             }
    //         );
    // }

    // private _getTopTracks(id: string): void {
    //     this.loading = true;
    //     this._spotify.getTopTracksArtista(id)
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .subscribe(
    //             (data) => {
    //                 console.log(data);
    //                 this.topTracks = data;
    //                 this.loading = false;
    //             },
    //             (error) => {
    //                 console.log(error);
    //                 this.loading = false;
    //                 this.error = true;
    //                 this.textoError = error.error.error.message || 'Error con la API de Spotify';
    //             }
    //         );
    // }

}
