## sql-helpers

A tiny wrapper around knex and other utility functions to give it a simple interface.

### Installation

`npm install sql-helpers`

### Usage

```
var sh = require('sql-helpers');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'password',
    database : 'dbname'
  }
});

knex = sh.wrap(knex);

var buildValues = sh.buildValues;

var sql = 'INSERT INTO users (username, password_hash, email, favorite_color) VALUES ('
          + buildValues([
            'yourUsername',
            '4Cc1h1Nq02YthshONRAB5IFZlwdrMGXZumE543tERRihu',
            'yourUsername@example.com',
            'blue'
            ] + ') returning id');

knex.run(sql, function(err, user) {
  // Do something
}, true);
```

#### API

`knex.run`:

Takes three arguments - a sql query, a callback, and optionally a boolean if you expect the query to return only one result. The callback also takes two arguments - an error and the result, which will either be an object (if you pass `true` as the third argument to `knex.run`), or an array.

```
knex.run('SELECT * FROM users', function(err, users) {
  _.each(users, function(user) {
    // Do something
  });
});
```

`buildValues`:

Takes an array of strings, puts quotes around each of them, then concatenates them with comma separators. Used for writing sql queries. Designed for use with postgres, may not work for other engines.

```
buildValues(['your', 12]);
// "\'your\', \'12\'"
```

### License

MIT
