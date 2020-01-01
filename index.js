const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "Keystone Next Playground";

const UsersSchema = require('./schema/Users.js');
const TodosSchema = require('./schema/Todos.js');

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
});

keystone.createList('User', UsersSchema);
keystone.createList('Todo', TodosSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username',
    secretField: 'password',
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    // Need to turn off the enableDefaultRoute to let NextApp render at /
    new AdminUIApp({ 
      enableDefaultRoute: false,
      authStrategy,
    }),
    new NextApp({ 
      dir: 'client'
    }),
  ],
};

