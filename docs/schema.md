## Schema Information
---------------
### user
---
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
first_name | string | not null, indexed
last_name | string | not null, indexed
email | string | not null, indexed, unique
password_digest | string | not null
session_token | string | not null

### city
---
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
name | string | not null, unique
image | string | not null

### restaurant
---
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
name | string | not null
description | text | not null
cuisine | string | not null
price | integer | not null
rating | integer | not null
image | string | not null
hours | int | not null
owner_id | integer | not null, foreign key
city_id | integer | not null, foreign key

### review
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
user_id | integer | not null, foreign key
restaurant_id | integer | not null, foreign key
rating | integer | not null
body | text |
reservation_id | integer | not null, foreign key


### reservation
---
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
user_id | integer | not null, foreign_key
restaurant_id | integer | not null, foreign key
date | string | not null
time | integer | not null
size | integer | not null

### favorite
---
column name | data type | details
--- | --- | ---
id | integer | not null, primary key
user_id | integer | not null, foreign key
restaurant_id | integer| not null, foreign key
