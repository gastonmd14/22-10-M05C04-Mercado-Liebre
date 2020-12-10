const path = require('path')
let file = path.resolve(__dirname, 'usersDataBase.json')
let users = require(file);
let fs = require('fs');



function lastest() {
  return users.reverse()[0];
}

function createUser(user) {
  user.id = users.length + 1;
  users.push(user);
  fs.writeFileSync(file, JSON.stringify(users));
  //console.log(users);
}

function findById(id) {
  return users.find(function (user) {
    return (user.id == id);
  });
}

function findByEmail(email) {
  
  return users.find(function (user) {
    return (user.email == email);
  });
}

module.exports = {
  lastest,
  createUser,
  findById,
  findByEmail,
};
