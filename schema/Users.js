const { Text, Checkbox, Password, Select } = require("@keystonejs/fields");

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
  fields: {
    username: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    password: {
      type: Password,
      isRequired: true
    },
    name: {
      type: Text
    },
    email: {
      type: Text,
      isUnique: true,
      isRequired: true
    },
    isAdmin: {
      type: Checkbox,
      defaultValue: "false",
      // so a regular user can't just make themselves an admin
      access: {
        update: access.userIsAdmin
      }
    },
    userRole: {
      type: Select,
      label: "User Role",
      options: ["Owner", "Admin", "Editor", "Viewer"],
      defaultValue: "Viewer",
      isRequired: true,
      access: {
        update: access.userIsAdmin
      }
    }
  },
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  }
};
