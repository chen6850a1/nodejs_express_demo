var express = require('express');
var router = express.Router();

const { DefaultAzureCredential,ClientSecretCredential } = require("@azure/identity");

const mysql = require('mysql2');


const credential = new DefaultAzureCredential();
var accessToken = credential.getToken('https://ossrdbms-aad.database.windows.net/.default');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/test', function(req, res, next) {
  
  
  const connection = mysql.createConnection({
    host: process.env.AZURE_MYSQL_HOST,
    user: process.env.AZURE_MYSQL_USER,
    password: accessToken.token,
    database: process.env.AZURE_MYSQL_DATABASE,
    port: process.env.AZURE_MYSQL_PORT,
    ssl: process.env.AZURE_MYSQL_SSL
  });

  connection.connect((err) => {
    if (err) {
      res.send('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    res.send('Connected to MySQL database');
  });
  res.send('respond with a resource new5');
});

module.exports = router;
