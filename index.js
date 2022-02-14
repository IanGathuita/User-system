const express = require('express');
const mssql = require('mssql');

const app = express();
app.use(express.json());
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    server: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    port: 1433,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options: {
        encrypt:false,
    }
}

app.get('/', async (req,res) => {
    
    try{
        await mssql.connect(config);
        const result = await (await mssql.query("SELECT * FROM USERS")).recordset;
        res.send(result);
        console.log(result);
    }
    catch(e){
        console.log(e);
        res.send(e);
    }

    
    
});

app.post("/",async (req,res) => {
    const {FirstName,SecondName,Email,Project,Password} = req.body;
    try{
        await mssql.connect(config);
        await (await mssql.query(`INSERT INTO USERS VALUES('${FirstName}','${SecondName}','${Email}','${Project}','${Password}')`));
        res.json("User added successfully");
    }
    catch(e){
        console.log(e);
    }

});
app.put("/user/:id",async (req,res) => {
    const id = req.params.id;
    const {FirstName,SecondName,Email,Project,Password} = req.body;
    let myQuery = `UPDATE USERS SET FirstName='${FirstName}', SecondName='${SecondName}',Email =
    '${Email}', Project = '${Project}',Password = '${Password}' WHERE id = ${id}`;
    try{
        await mssql.connect(config);
        await(await mssql.query(myQuery));
        res.json("User updated successfully");
    }
    catch(e){
        console.log(e);
    }   
});
app.delete("/user/:id",async (req,res) => {
    const id = req.params.id;
    let myQuery = `DELETE FROM USERS WHERE id = ${id}`;
    try{
        await mssql.connect(config);
        await(await mssql.query(myQuery));
        res.json("User deleted successfully");
    }
    catch(e){
        console.log(e);
    } 

});



app.listen(4000,() => console.log("Listening for requests ..."));

