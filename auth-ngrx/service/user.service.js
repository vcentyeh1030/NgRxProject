let service = {};
service.authenticate = function (username, password) {
  //mockup user
  let user = {
    username: 'vincent',
    password: 'vincent'
  }
  console.log(username, password);
  return new Promise((resolve, reject) => {
    //should check database
    if(username === user.username && password === user.password) {
      resolve(true); // user found and password correct
    } else {
      resolve(false); // user not found or password not correct
    }
  });
}

module.exports = service;
