# EasySeating
---
[Live](https://easyseating.herokuapp.com/#/)
EasySeating is a full-stack web application inspired by OpenTable. It uses React/Redux on the frontend and uses Ruby on Rails in the backend with a postgres database.

## Features
---

### Searching Restaurants
Some pages in the website feature a restaurant search bar, which takes in inputs `seats`, `date`, `time`, and user-entered text. When the user enters text, a dropdown appears showing possible restaurants that match the entered text. In order to allow for slight mistyping, the match is based on a trigram comparison between the search term and the restaurants in the database. This way, users can find restaurants with foreign or unfamiliar spellings without much difficulty.

### Reservations
A restaurant page features a form that takes in `date`, `time`, and `seats`. Submitting this form runs a database query that finds open reservations (reservations with `user_id IS NULL`) within one hour of the selected time on the selected date and adds buttons to the restaurant page corresponding to those reservations. Clicking a button creates the reservations.

### Reviews
A reviewer who has a past, completed reservation at a restaurant will be able to review that restaurant. If a reservation is complete and matches the current user, the user will receives a prompt to leave reviews on his profile page, where his previous reservations are logged.

## Future Improvements
---
Significant styling improvements to restaurant pages and profile page will be made. Will increase capacity for pictures that each restaurant can have and display them on the restaurant page.
