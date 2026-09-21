# MyWishlist Backend

Das Backend von MyWishlist stellt eine REST-API zur Verwaltung einer persönlichen Wunschliste bereit. Die Daten werden dauerhaft in einer PostgreSQL-Datenbank gespeichert.

## Funktionen

- alle Wünsche abrufen
- neue Wünsche erstellen
- vorhandene Wünsche bearbeiten
- Kaufstatus ändern
- Wünsche löschen
- Eingaben im Backend validieren
- sehr dringende Wünsche zuerst zurückgeben
- verständliche HTTP-Statuscodes und Fehlermeldungen senden

## Verwendete Technologien

- Node.js
- Express
- PostgreSQL
- pg
- CORS
- Git und GitHub

## Voraussetzungen

Für die lokale Ausführung werden benötigt:

- Node.js
- npm
- PostgreSQL

## Installation

Repository klonen und Abhängigkeiten installieren:

```bash
git clone https://github.com/Sara807-web/mywishlist-backend.git
cd mywishlist-backend
npm install
```

## Datenbank einrichten

Lokale PostgreSQL-Datenbank erstellen:

```bash
createdb mywishlist
```

Tabellenstruktur anlegen:

```bash
psql mywishlist -f schema.sql
```

Optionale Beispieldaten einfügen:

```bash
psql mywishlist -f seed.sql
```

## Backend starten

```bash
npm start
```

Das Backend ist anschließend unter folgender Adresse erreichbar:

```text
http://localhost:3000
```

Die Wünsche können über diesen Endpunkt abgerufen werden:

```text
http://localhost:3000/wishes
```

## API-Endpunkte

| Methode | Endpunkt | Funktion |
| --- | --- | --- |
| GET | `/wishes` | Alle Wünsche abrufen |
| POST | `/wishes` | Neuen Wunsch erstellen |
| PUT | `/wishes/:id` | Wunsch bearbeiten |
| DELETE | `/wishes/:id` | Wunsch löschen |

## Datenmodell

Ein Wunsch besitzt folgende Eigenschaften:

```json
{
  "id": 1,
  "name": "Kamera",
  "price": 499.99,
  "bought": false,
  "priority": "high"
}
```

Für `priority` sind diese Werte erlaubt:

- `high` – sehr dringend
- `low` – eher nicht so dringend

## Projektstruktur

```text
index.js     Express-Server und API-Routen
db.js        Verbindung zur PostgreSQL-Datenbank
schema.sql   Tabellenstruktur
seed.sql     optionale Beispieldaten
```

## Frontend

Das zugehörige Angular-Frontend befindet sich in einem separaten Repository:

https://github.com/Sara807-web/mywishlist-frontend 