import { AuthGuard } from './services/auth.guard';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ArtistaComponent } from './components/artista/artista.component';


const routes: Routes = [
    { path: 'home',         component: HomeComponent,       canActivate: [AuthGuard] },
    { path: 'buscar',       component: BuscarComponent,     canActivate: [AuthGuard] },
    { path: 'artista/:id',  component: ArtistaComponent,    canActivate: [AuthGuard] },
    { path: 'access_token', component: AccessTokenComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
