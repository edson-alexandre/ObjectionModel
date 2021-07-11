const { Model } = require('objection');

module.exports = class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
      const User = require('./User')

      return {
        User: {
          relation: this.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'roles.id',
            to: 'users.role_id'
          }
        }
      }
  }
} 