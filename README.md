# CodeSpoty

La Finalidad de esto proyecto es crear una aplicacion web la cual consuma la api de Spotify, esto es a modo de enseñanza y aprendizaje.

Este Proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.


## Comandos Utilizados durante el desarrollo

### Antes de comenzar

Es necesario crear un proyecto desde el sitio de [Spotify](https://developer.spotify.com/dashboard/)
- Login
- Create a Client ID (Completamos los datos).
- Dentro del proyecto obtendremos el Client ID & Client Secret para utilizar en nuestro proyecto.
- Edit Settings
- Redirect URIs >> Agregamos http://localhost:4200 y posteriormente la url de "producción".


### Creacion de proyecto 📋

```
ng new CodeSpoty
npm install bootstrap --save
npm install jquery --save
npm install popper.js --save
npm install @fortawesome/fontawesome-free --save
```

### Agrego las librerias en el "angular.json"

```
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
        "src/styles.scss"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.slim.min.js",
        "node_modules/popper.js/dist/umd/popper.min.js",
        "node_modules/@fortawesome/fontawesome-free/js/all.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]
```

### Genero Componentes

```
ng g c components/home --skipTests=true
ng g c components/buscar --skipTests=true
ng g c components/artista --skipTests=true
ng g c components/compartido/navbar --skipTests=true
ng g c components/compartido/tarjetas --skipTests=true
ng g c components/compartido/loading --skipTests=true
ng g c components/compartido/error --skipTests=true
ng g c components/access_token --skipTests=true
```

### Genero Servicios

```
ng g s services/spotify --skipTests=true
ng g s services/access-token --skipTests=true
ng g s services/route-previo --skipTests=true
ng g g services/auth --skipTests=true
```

### Genero Pipes

```
ng g p pipes/noimage --skipTests=true
ng g p pipes/domseguro --skipTests=true
```