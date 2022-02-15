const config = require("../Config/db");
const mssql = require('mssql');

const users_get = async (req, res) => {

    try {
        await mssql.connect(config);
        const result = await (await mssql.query("SELECT * FROM USERS")).recordset;
        res.send(result);
        console.log(result);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }



}

const users_post = async (req, res) => {
    const { FirstName, SecondName, Email, Project, Password } = req.body;
    try {
        await mssql.connect(config);
        await (await mssql.query(`INSERT INTO USERS VALUES('${FirstName}','${SecondName}','${Email}','${Project}','${Password}')`));
        res.json("User added successfully");
    }
    catch (e) {
        console.log(e);
    }

}


const users_put = async (req, res) => {
    const id = req.params.id;
    const { FirstName, SecondName, Email, Project, Password } = req.body;
    let myQuery = `UPDATE USERS SET FirstName='${FirstName}', SecondName='${SecondName}',Email =
    '${Email}', Project = '${Project}',Password = '${Password}' WHERE id = ${id}`;
    try {
        await mssql.connect(config);
        await (await mssql.query(myQuery));
        res.json("User updated successfully");
    }
    catch (e) {
        console.log(e);
    }
}

const users_delete = async (req, res) => {
    const id = req.params.id;
    let myQuery = `DELETE FROM USERS WHERE id = ${id}`;
    try {
        await mssql.connect(config);
        await (await mssql.query(myQuery));
        res.json("User deleted successfully");
    }
    catch (e) {
        console.log(e);
    }

}

module.exports = { users_get, users_post, users_put, users_delete };