Star Wars API reader

This is a React web application that displays data fetched from Star Wars API.

Functionality:
-Home page with it's content
-Info page and first data fetch.
-Fetching additional info by typing the name
-Uploaded to heroku https://starwarsfetchapidisplay.herokuapp.com/
-All pages somewhat reactive to window size

Known bugs or bad functionality:
-When fetching additional information about characters or vehicles or whatever, the api doesn't have them organized the same way I tried to fetch them.
Meaning that there were some id slots missing. For example vehicles didn't have id 1. Instead they started at 4. And then 5 was skipped again. I designed the
additional info fetch with the idea that the id's were all used and there would be no empty spots. This could be fixed by checking every response and one by one setting
the categories right.

-Screen division isn't quite right. Everything is placed on top of each other which makes the elements move when more info is shown. This made it so I can't put as much extra
info on the screen as I would like have.

-Sometimes very slow to show wanted info.

-You can't get additional info about anything besides things/characters shown on screen. Also can't have typos.

API link: https://swapi.dev/api/
