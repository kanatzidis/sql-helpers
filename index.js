module.exports = {
  wrap: function(knex) {
    knex.run = function(sql, cb, singleValue) {
      knex.raw(sql).asCallback(wrapSQLResponse(cb, singleValue));
    };
  
    return knex;
  },
  buildValues: function(arr) {
    return arr.map(function(i) { return '\'' + i + '\''; }).join(', ');
  }
};

function wrapSQLResponse(callback, singleValue) {
  return function(err, res) {
    if(err) return callback(err);
    callback(null, singleValue?res.rows[0]:res.rows);
  }
}
