import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent {

    @Input() items: any[] = [];

    constructor( private _router: Router ) { }

    getId(item: any) {
        let artistaId: any;

        if (item.type === 'artist') {
            artistaId = item.id;
        } else {
            artistaId = item.artists[0].id;
        }

        this._router.navigate(['/artista', artistaId]);
    }
}
