import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

    data: any;

    loading: boolean;

    error: boolean;
    textoError: string;

    readonly base_playlist: string = 'https://open.spotify.com/embed/playlist/';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _spotify: SpotifyService ) {
        this.loading = true;
        this.error = false;
    }

    ngOnInit(): void {
        this._spotify.getPlaylist()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: any) => {
                    this.data = data;
                    console.log(data);
                    this.loading = false;
                },
                (error) => {
                    this.textoError = error.error.error.message || 'Error con la API de Spotify';
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
