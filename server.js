// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');
const Pool = require('pg').Pool;
const db = new Pool({
    user:"postgres",
    password:"Kakaroto1",
    host: "localhost",
    port: "5432",
    database: "SoftwareFinal"
})


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier

app.get('/', function(req, res) {
    res.render('pages/main', {
        my_title : "Home Page",
        item: ''
    });
});

app.get('/home', function(req, res) {
    res.render('pages/main', {
        my_title : "Home Page",
        item: ''
    });
});

app.get('/review', async (req, res) => {
    try
    {
        var getRevs = await db.query('select * from showTable');
        res.render('pages/review', { showTable: getRevs.rows});
    }
    catch(err)
    {
        console.log('error', err);
        res.render('pages/review', {
            my_title : "Review Page",
            item: ''
        });
    }
});

app.post('/home/add_reviews', async (req,res) =>{
    try{
        var show = req.body.show;
        var showRev = req.body.showRev;
        var temp = await db.query("insert into showTable(show, review, revdate) values($1, $2, CURRENT_TIMESTAMP)", [show, showRev]);
        res.redirect('/review')
    }
    catch(err)
    {
        console.log('error', err);
        res.render('pages/review', {
            my_title : "Review Page",
            item: ''
        });
    }
});

app.get('/revFilter', async (req, res) =>{
    if (req.query.getFilter === ""){
        const getRevs = await db.query('SELECT * FROM showTable')
        return res.render('pages/review', { showTable: getRevs.rows })
    }
    try{
        const getFilter = req.query.getFilter;
        console.log(getFilter);
        const filter = await db.query("SELECT DISTINCT * from showTable WHERE show @@$1",[getFilter])
        res.render('pages/review', { showTable: filter.rows})
    }
    catch (err) {
        console.log('error', err);
        res.render('pages/review', {
        })
    }
})

app.listen(3000);
console.log('3000 is the magic port');
