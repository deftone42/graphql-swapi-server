# graphql-swapi-server
[GraphQL](http://graphql.org/) + Express server API using [Swapi](https://swapi.co/)

Created just for fun.

Steps to run project:

* Checkout the project
```
git clone https://github.com/deftone42/graphql-swapi-server.git
```

* Install dependencies (express, graphql, typescript)
```
yarn install or npm install
```

* Run project
```
yarn start or ts-node index.ts
```

* Start playing with GraphQL

Access `http://localhost:3000/graphql` and type a query, e.g:

```
{
  people(search: "Han Solo") {
    count
    results {
      name
      films {
        title
      }
    }
  }
}
```
