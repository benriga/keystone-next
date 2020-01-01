const { Text } = require("@keystonejs/fields");

module.exports = {
  schemaDoc: "A list of things which need to be done",
  fields: {
    name: {
      type: Text,
      isRequired: true,
      schemaDoc: "This is the thing you need to do"
    }
  }
};
