##  Component Hierarchy
------------------------
### AuthFormContainer
- AuthForm

### HomeContainer
- Navbar
- RestaurantSearch
- CityIndex
- AddRestaurant

### UserContainer
- Navbar
- Reservations
- Favorites

### CityContainer
- Navbar
- RestaurantSearch
- RestauntIndex (?)

### RestaurantContainer
- Navbar



### Navbar

### RestaurantSearch

### AddRestaurantContainer

Path | Component
--- | ---
"/sign-up" | AuthFormContainer
"/sign-in" | AuthFormContainer
"/home" | HomeContainer
"/city" | CityContainer
"/user" | UserContainer
"/user/user:id/reservations" | Fav
"/user/user:id/favorites" | FavoriteContainer
