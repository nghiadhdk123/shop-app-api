# node-admin-base

## Project setup
```
npm install
```
##Usage
- Config your database in file .env
``` bash
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=MY_DATABASE

PORT_CONNECT=3000
```
### Create file public/uploads contains images
```
cd src

mkdir -p public/uploads
```

### Create database seeder for table User
```
npm run seeder
```

### Start serve
```
npm start
```
