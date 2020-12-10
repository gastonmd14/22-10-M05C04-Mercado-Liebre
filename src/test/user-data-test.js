const { getMaxListeners } = require('../app');
const user = require('../data/user')

// console.log(user);

//  let founded = user.findById(4)

let founded = user.findByEmail('gastonmd15@gmail.com')


// let newUser = {
//     id: 4,
//     email: 'gastonmd13@gmail.com',
//     password: '123456'
// };

// user.createUser(newUser);

// let founded = user.findById(2)

console.log(founded);