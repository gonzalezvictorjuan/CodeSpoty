import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    @Input() title: string;

    @ViewChild('toggler') toggler: ElementRef<HTMLElement>;

    constructor() { }

    /**
     * Oculto la navbar en mobile luego de realizar un click en alguno de los elementos.
     */
    clickToggle(): void {
        if (this.toggler.nativeElement['ariaExpanded'] != 'false') {
            this.toggler.nativeElement.click();
        }
    }

}
