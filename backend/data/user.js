// This is the user "data layer", which will interact with the database's user table
// These will get utilized by the user routes

// test users until we have a database set up
const users = [
  {
    id: 1,
    username: "foo",
    password: "password",
    email: "foo@bar.com",
    firstName: "Foo",
    lastName: "Bar",
  },
  {
    id: 2,
    username: "bar",
    password: "password",
    email: "bar@foo.com",
    firstName: "Bar",
    lastName: "Foo",
  },
];

// defining some basic functions on mock data here -> will need to be replaced by database queries
// idea -> will be imported as userData, and used like userData.get.byId(1) -> returns user with id 1
// feel free to change, just first idea to get scaffolded
const userData = {
  get: {
    all: async function () {
      return users;
    },
    byId: async function (id) {
      return users.find((user) => user.id === id);
    },
    byUsername: async function (username) {
      return users.find((user) => user.username === username);
    },
    byEmail: async function (email) {
      return users.find((user) => user.email === email);
    },
  },
};

export default userData;
