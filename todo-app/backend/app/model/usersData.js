
const Database = require('../core/database/database');
const bcrypt = require('bcrypt');



//#####   Preventing account creation with duplicate email  ######
//################################################################
const chkAuth = async (bodyEmail) => {
  const query = `
    SELECT * FROM UserDatabase.login WHERE email = ?;
  `;
  const [rows, fields] = await Database.query(query, [bodyEmail]);
  return rows.length === 0;
};



//#####   Check database based on incoming email   ######
//#######################################################
const chkAuthLogin = async (email, password) => {
  const query = `
    SELECT * FROM UserDatabase.login WHERE email = ?;
  `;
  const [rows, fields] = await Database.query(query, [email]);
  const user = rows[0];
  if (!user) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};



//#####   Add a new user account in the database   ######
//##########################################################
const createUser = async (first_name, last_name, email, password) => {
  const query = `
  INSERT INTO UserDatabase.login (first_name, last_name, email, password) VALUES (?, ?, ?, ?);
  `;
  const params = [first_name, last_name, email, password];
  const [result] = await Database.query(query, params);
  return result;
};




//#####   Checking the existence of the user in the database   ######
//###################################################################
const loginUser = async (email, password) => {

  const query = `
    SELECT * FROM UserDatabase.login WHERE email = ?;
 `;
  const [rows, fields] = await Database.query(query, [email]);
  const user = rows[0];
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
};



module.exports = {
  createUser,
  chkAuth,
  loginUser,
  chkAuthLogin
};


