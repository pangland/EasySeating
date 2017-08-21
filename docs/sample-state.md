```
user: {
  id: 1,
  first_name: Paul
  last_name: Angland
}

restaurants: {
  id: 1
  name: Sushi Place
  description: Great Sushi
  cuisine: Japanese
  price: 4
  rating: 5
  image: /image
  hours: 11
  owner_id: 1
  city_id: 1
}

reservation: {
  id: {
    user: user_id,
    restaurant: restaurant_id,
    date: 01/01/1111,
    time: 11:11,
    size: 11
  }
}

favorite: {
  user: 1
  restaurant: 1
}
```
