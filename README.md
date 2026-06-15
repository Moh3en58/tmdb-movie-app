# TMDB Movie Explorer

## Beschrijving

TMDB Movie Explorer is een interactieve Single Page Application (SPA) ontwikkeld voor het vak Web Advanced. De applicatie gebruikt de TMDB API om echte filmgegevens op te halen en weer te geven. Gebruikers kunnen films zoeken, filteren, sorteren, favorieten opslaan, een watchlist beheren en gedetailleerde informatie bekijken.

## Gebruikte API

Deze applicatie gebruikt The Movie Database API:

https://www.themoviedb.org/documentation/api

Gebruikte data:

- Trending movies
- Search results
- Movie videos / trailers

## Functionaliteiten

- Ophalen van echte filmgegevens via de TMDB API
- Weergave van minstens 20 films per pagina
- Responsieve filmkaarten
- Zoekfunctie
- Sorteren op rating, releasedatum en titel
- Filteren op genre
- Favorieten opslaan met LocalStorage
- Watchlist opslaan met LocalStorage
- Donker en licht thema met opgeslagen voorkeur
- Detailvenster / modal per film
- Trailerknop via TMDB-videogegevens
- Paginering met Previous- en Next-knoppen
- Statistiekendashboard
- Back-to-top knop
- Loading- en foutmeldingen
- Animaties met Intersection Observer API
- Keyboard shortcuts:
  - Escape sluit de modal
  - Ctrl + K focust het zoekveld

## Gebruikte Technologieën

- HTML
- CSS
- JavaScript
- Vite
- TMDB API
- Fetch API
- LocalStorage
- Intersection Observer API

## Installatie

Installeer de dependencies en start de ontwikkelingsserver:

```bash
npm install
npm run dev
```
