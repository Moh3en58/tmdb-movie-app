# TMDB Movie Explorer

## Beschrijving

TMDB Movie Explorer is een interactieve Single Page Application (SPA) ontwikkeld voor het vak Web Advanced. De applicatie maakt gebruik van de TMDB API om echte filmgegevens op te halen en weer te geven. Gebruikers kunnen films zoeken, filteren, sorteren, favorieten opslaan, een watchlist beheren en gedetailleerde informatie bekijken.

## Functionaliteiten

- Ophalen van echte filmgegevens via de TMDB API
- Weergave van films in responsieve kaarten
- Zoekfunctie
- Sorteren op beoordeling, releasedatum en titel
- Filteren op genre
- Favorieten opslaan met LocalStorage
- Watchlist opslaan met LocalStorage
- Donker en licht thema met opgeslagen gebruikersvoorkeur
- Detailvenster (modal) voor films
- Trailerknop met TMDB-videogegevens
- Paginering met Previous- en Next-knoppen
- Statistiekendashboard
- Back-to-top knop
- Loading- en foutmeldingen
- Animaties met de Intersection Observer API
- Sneltoetsen:
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

## Projectstructuur

```text
src/
├── api/
│   └── tmdbApi.js
├── components/
│   └── movieCard.js
├── utils/
│   └── storage.js
├── main.js
└── style.css
```

## Toegepaste JavaScript-concepten

- DOM-selectie en DOM-manipulatie
- Event listeners
- Template literals
- Arrow functions
- Array-methodes zoals map(), filter(), sort() en reduce()
- Fetch API
- Promises
- Async/Await
- Foutafhandeling met try/catch
- LocalStorage
- Intersection Observer API
- Modulaire JavaScript-bestanden

## Gebruik van Externe Bronnen

Tijdens de ontwikkeling van dit project werd gebruikgemaakt van verschillende publiek beschikbare leermiddelen, waaronder officiële documentatie, online artikels en educatieve video's. Deze bronnen werden geraadpleegd om concepten zoals JavaScript, API-integratie, asynchrone programmering, DOM-manipulatie, LocalStorage en moderne frontendontwikkeling beter te begrijpen.

Wanneer specifieke implementatieproblemen of programmeerfouten niet konden worden opgelost met behulp van documentatie of educatieve bronnen, werd in sommige gevallen gebruikgemaakt van AI-ondersteunde hulpmiddelen om mogelijke oplossingen te onderzoeken, fouten te analyseren en de kwaliteit van de code te verbeteren.

De uiteindelijke implementatie, integratie, testen en aanpassingen van de applicatie werden zelfstandig uitgevoerd.
