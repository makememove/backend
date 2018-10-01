# MakeMeMove-Backend

This is the backend for makememove.


## USERS

### GET /api/me

A bejelentkezett user lekéri a saját adatait.

  

### GET /api/users

Minden user lekérése.

  

### POST /api/user/create

Regisztrálás.

URL paraméterek:

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
JSON BODY paraméterek: rankinget leíró adatok jsonban, TO BE DISCUSSED
