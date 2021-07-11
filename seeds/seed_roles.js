
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, colName: 'User'},
        {id: 2, colName: 'Admin'},
        {id: 3, colName: 'Staff'}
      ]);
    });
};
