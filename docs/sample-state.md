```
user: {
  1: {
    id: 1,
    first_name: Paul
    last_name: Angland
  }
}

restaurants: {
  1: {
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
}

reservation: {
  1: {
    user: user_id,
    restaurant: restaurant_id,
    date: 01/01/1111,
    time: 11:11,
    size: 11
  }
}

favorites: {
  1: {
    user: 1
    restaurant: 1
  }
}
```
