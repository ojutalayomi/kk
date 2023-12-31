
// Import the necessary modules
const express = require('express');
const expressStatic = express.static;
const bodyParser = require('body-parser');
const validator = require('validator');
const nodemailer = require('nodemailer');
const multer = require('multer');
const {successmsg} = require('./htmlfiles.js');
var sqlite3 = require('sqlite3').verbose();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const chokidar = require('chokidar');

// Open a database handle
var db = new sqlite3.Database('mydb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydb database.');
});

/*let data = ['value1', 'value2'];
let sql = `INSERT INTO emails (Time, Emails) VALUES (?, ?)`;

db.run(`CREATE TABLE IF NOT EXISTS emails (Time TEXT, Emails TEXT)`, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) inserted: ${this.lastID}`);
});*/

//sql = `CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, Time TEXT, Emails TEXT)`;

// Create an Express application
const app = express();

// Multer configuration
const upload = multer({ dest: '/submit' });

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Define a route to handle form submissions
app.post('/submit', upload.single('myfile'),async (req, res) => {
    
  const email = req.body.email;
  const time = new Date().toLocaleString();
  
  
  let createTableSql = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,Time TEXT, Emails TEXT UNIQUE)`;

  db.run(createTableSql, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log("Users table created");
  });

  let insertDataSql = `INSERT OR IGNORE INTO users (Time, Emails) VALUES (?, ?)`;
  let data = [time, email];

  db.run(insertDataSql, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) inserted: ${this.lastID} - ${time} - ${email}`);
  });

  /*db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Close the database connection.`);
    }
  });*/

  //res.send('Data received and stored in database');
    // Access form data
    //const file = req.file;

    // Validate the email address
    if (validator.isEmail(email)) {
        // If the email is valid, do something with it (like save it in a database)
        ;
        console.log(`Received a valid email: ${email}`);

         // Check if a file was uploaded
        /* if (file) {
          return res.status(400).send('No file was uploaded.');
        }*/

        //console.log(`Received a file: ${file.originalname}`);
        res.send(successmsg(email));
        //console.log(req.file);

  
        // Send confirmation email
        await sendConfirmationEmail(email,req);
    } else {
        // If the email is not valid, send an error message
        console.log(`Received an invalid email: ${email}`);
        res.status(400).send('Invalid email address');
    }
});


function exportToCsv() {
  let data = [];
  let csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'Time', title: 'TIME'},
      {id: 'Emails', title: 'EMAILS'},
      // add more column headers as needed
    ]
  });



db.serialize(() => {
  db.each(`SELECT * FROM users`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    data.push(row);
  }, () => { // callback function when all rows have been retrieved
    csvWriter
      .writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  });
});
}

// Watch the SQLite database file for changes
chokidar.watch('./mydb.db').on('change', exportToCsv);

// Start the server
const join = require('path').join;
const hostname = '127.0.0.1';
const port = 8080;

app.use(express.static('public'));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Function to send confirmation email
async function sendConfirmationEmail(email, req) {
  const file = req.file;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreply.noow@gmail.com', // replace with your Gmail email
      pass: 'qulm ifwi edgd erne' // replace with your Gmail password or an app-specific password
    }
  });

  const mailOptions = {
    from: `noreply@ayocodex.site`, // replace with your Gmail email
    to: email,
    subject: 'Confirmation Email',
    text: `Thank you for submitting the form. This is a confirmation email.`,
    html: `<h1>Welcome</h1>
    <h2>Thank you for submitting the form. This is a confirmation email.</h2>
    <img src="cid:unique@kreata.ee" alt="Company Logo" width="100" height="100">
    <p>That was easy! ${email} has been successfully added to our email list.</p>`,
    attachments: [
        {
          filename: `Company-Logo.png`,
          path: 'Newsletter-sign-up/public/assets/images/favicon-32x32.png', // Replace with your file path
          cid: 'unique@kreata.ee' //same cid value as in the html img src
        },
        /*{
          filename: file.originalname,
          path: file.path,
        }*/
      ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}