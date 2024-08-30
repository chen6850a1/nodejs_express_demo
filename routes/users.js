var express = require('express');
var router = express.Router();
const pino = require('pino');
const logger = pino({
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
});

const { DefaultAzureCredential,ClientSecretCredential } = require("@azure/identity");

const mysql = require('mysql2');
var fs = require("fs");




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/test', async (req, res, next)=>{
  const credential = new DefaultAzureCredential();
  var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
  logger.info(
    {
      requestID: "f9ed4675f1c53513c61a3b3b4e25b4c0",
    },
    accessToken,
  );


  const connection = mysql.createConnection({
    host: process.env.AZURE_MYSQL_HOST,
    user: process.env.AZURE_MYSQL_USER,
    password: accessToken.token,
    database: process.env.AZURE_MYSQL_DATABASE,
    port: process.env.AZURE_MYSQL_PORT,
    ssl:{ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')}
  });
  
  logger.info(
    {
      requestID: "f9ed4675f1c53513c61a3b3b4e25b4c0",
    },
    {
      host: process.env.AZURE_MYSQL_HOST,
      user: process.env.AZURE_MYSQL_USER,
      password: accessToken.token,
      database: process.env.AZURE_MYSQL_DATABASE,
      port: process.env.AZURE_MYSQL_PORT,
      ssl:{ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')}
    }
  );

 
  let log="";
  connection.connect((err) => {
      if (err) {
        log="mysql error";
        logger.info({
          requestID: "f9ed4675f1c53513c61a3b3b4e25b4c0",
        },err)
        res.send('respond with a resource new6 '+log);
      }else{
        log="mysql success";
        logger.info({
          requestID: "f9ed4675f1c53513c61a3b3b4e25b4c0",
        },log)
        res.send('respond with a resource new6 '+log);
      }
  });
  
});

module.exports = router;
