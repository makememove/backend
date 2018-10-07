# MakeMeMove-Backend

This is the backend for makememove.

# ENDPOINTS

## USERS

### GET /api/me

A bejelentkezett user lekéri a saját adatait.

### GET /api/users

Minden user lekérése.


### POST /api/user/create

Regisztrálás.

URL paraméterek:
* email: String

* username: String

* pasword: String

### POST /api/me/edit

További mezők (pl firstName) kitöltése/módosítása.

URL paraméterek:

* firstName: String

* lastName: String

… további mezők az ER diagramból

## EVENTS

### GET /api/event/:id

Egy event részletes lekérése ID alapján.

### GET /api/events

Minden event lekérése.
QUERY paraméterek: itt majd lesz több ami szerint lehet majd filterezni


### POST /api/event/create

Event létrehozása.

JSON BODY paraméterek: minden property, ami az ER diagramban található. Creator-t backend állítja be. Kötelező mezőket majd megbeszéljük.

### POST /api/event/:id/edit

További mezők (pl lowestSkillPoint) kitöltése/módosítása.

JSON BODY paraméterek: minden property, ami az ER diagramban található. Creator-t backend állítja be. Kötelező mezőket majd megbeszéljük.

### POST /api/event/:id/join

Event-en való részvétel.

URL paraméterek: team ID

### POST /api/event/:id/rankings
Ranking(ek) feltöltése egy eventhez. Csak a létrehozó user teheti meg.
JSON BODY paraméterek: rankinget leíró adatok jsonban

### GET /api/event/:id/attend/:teamId
Részvétel egy event-en.

### GET /api/event/:id/remove
Event törlése.

## CATEGORIES

### GET /api/categories
Kategóriák lekérése.

### POST /api/categories
Kategória létrehozása (admin), JSON body

## SPORTS

### GET /api/sports
Sportok lekérése.

### POST /api/sports
Sport létrehozása (admin), JSON body

## TEAMS

### GET /api/teams
Csapatok lekérése.

### POST /api/teams/create
Csapat létrehozása, JSON body

### GET /api/team/:id/join
Csapathoz való csatlakozás

### GET /api/team/:id/leave
Csapat elhagyása
