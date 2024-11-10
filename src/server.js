const https = require('https');
const fs = require('fs');
const app = require('./app');
const path = require('path');

const port = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/certificate.pem'))
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
