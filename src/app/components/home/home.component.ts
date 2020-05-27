import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, OnDestroy {

    canciones: any[] = [];
    loading: boolean;

    error: boolean;
    textoError: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _spotify: SpotifyService ) {
        this.loading = true;
        this.error = false;
    }

    ngOnInit(): void {
        this._spotify.getNewReleases()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: any) => {
                    this.canciones = data;
                    this.loading = false;
                },
                (error) => {
                    if (error.error.error.message) {
                        this.textoError = error.error.error.message;
                    } else {
                        this.textoError = 'Error con la API de Spotify';
                    }

                    this.loading = false;
                    this.error = true;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
