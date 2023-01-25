require("dotenv").config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {  // alter para no borrar a cada rato
  server.listen(3001, () => {
    console.log(`server raised in port ${port}`); // eslint-disable-line no-console
  });
});
