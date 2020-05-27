import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/compartido/navbar/navbar.component';
import { TarjetasComponent } from './components/compartido/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/compartido/loading/loading.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ErrorComponent } from './components/compartido/error/error.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';

// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    DomseguroPipe,
    TarjetasComponent,
    LoadingComponent,
    ErrorComponent,
    AccessTokenComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
