let users = [];
let idCounter = 1;

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

const findByUsername = async (username) => {
  return users.find(user => user.username === username);
};

const create = async ({ username, password }) => {
  const newUser = new User(idCounter++, username, password);
  users.push(newUser);
  return newUser;
};

module.exports = {
  findByUsername,
  create,
};
