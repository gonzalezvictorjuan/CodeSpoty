import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit, OnDestroy {

    artistas: any[] = [];
    loading: boolean;

    error: boolean;
    textoError: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _spotify: SpotifyService ) {
        this.error = false;
    }

    ngOnInit(): void {
    }

    buscar(termino: string): void {
        this.loading = true;

        this._spotify.getArtistas( termino )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: any) => {
                    this.artistas = data;
                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                    this.error = true;
                    this.textoError = error.error.error.message || 'Error con la API de Spotify';
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
