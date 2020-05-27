import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: []
})
export class ErrorComponent {

    @Input() mensaje: string = 'Error';

    constructor() { }

}
