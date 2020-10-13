# genesis-hasura-starter
Genesis: Hasura starter kit

Hasura starter will help you setup a hasura graphql server quickly with docker. You will get a hasura graphql engine setup with postgres server supporting postgis. Two default tables user and todo are also setup with appropriate permissions. 

The bundle also includes docker file to deploy hasura server using treafik reverse proxy with letsencrypt certificates

pgAdmin webapp is available at http://localhost:5050/
### Up and running

Install docker and docker-compose 

Run development server with

```sh
$ docker-compose -f docker-compose.dev.yml --env-file=.env.sample up
```

For creating default tables run

```sh
$ hasura migrate apply --envfile .env.sample
```

To access hasura console run
```sh
$ hasura console --envfile .env.sample
```

To access hasura console with loglevel debug
```sh
$ hasura console --envfile .env.sample --log-level DEBUG
```