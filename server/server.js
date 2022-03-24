const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

//create the get request
app.get('/api/students', cors(), async (req, res) => {
    // const STUDENTS = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(STUDENTS);
    try{
        const { rows: students } = await db.query('SELECT * FROM students');
        res.send(students);
    } catch (e){
        console.log(e);
        return res.status(400).json({e});
    }
});

//create the POST request
app.post('/api/students', cors(), async (req, res) => {
    const newUser = { firstname: req.body.firstname, lastname: req.body.lastname }
    console.log([newUser.firstname, newUser.lastname]);
    const result = await db.query(
        'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
        [newUser.firstname, newUser.lastname]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});