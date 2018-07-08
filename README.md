# Nodepop

Api developed in order to do training with Node for an api.

This api has been developed on the assumption that it would serve applications to sell second-hand items.

## Install

### Install dependencies
```Shell
cd /nodepop
npm install
```


### Mongodb

This application uses MongoDB. To start MongoDB you can use the following command from the mongo folder:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```

#### Mongoose

```Shell
npm i mongoose --save
```

#### Load Demo Data

This command load or delete and load demo data

```Shell
npm run loadData
```

## Development

To start the application in development mode use:

```shell
npm run dev
```

## API Documentation

### Classifieds

To get classifieds you can use:

```shell
http://localhost:3000/apiv1/classifieds
```

To paginate results you can add to previos url:

```shell
?skip=1&limit=3
```

To choose only some fields:
```shell
&fields=name=name%20sell=false
```
When you fill fields you always get objects without id. 


### Users

You can only add users. You have to post user with x-www-form-urlencoded passing:
name, email and password to the next url.

```shell
http://localhost:3000/apiv1/users
```