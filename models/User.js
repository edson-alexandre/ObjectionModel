const { Model } = require('objection');


class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings(){
      const Role = require('./Role')
      return {
          Role: {
              relation: Model.HasOneRelation,
              modelClass: Role,
              join: {
                  from: 'users.role_id',
                  to: 'roles.id'
              }
          }
      }
  }

}
module.exports = User;