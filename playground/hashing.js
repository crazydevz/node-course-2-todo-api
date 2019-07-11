const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'looolpop';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$XKE98IG43VSd9bFdZ/qn1eVBL65kkQGrDllM9zYDQzq5b.B0OSkRa';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// This is what we are going to use in our app
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log('token', token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// Basic example
// var text = "Talha Iqbal";
// var hash = SHA256(text).toString();
// console.log(hash);


// Real life example for understanding
// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// The user might try to do the following in order to hack any other user
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data has been changed, do not trust');
// }

