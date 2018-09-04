// Dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');

// Create Server
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
    extended: false }));
 // override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
var port = 3000;
app.listen(port);

// Create MySql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'MyNewPass',
  database : 'my_movies_DB'
});
 
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected as id: '+connection.threadId);
});

// Create connection from MySql(index.handlebars) database to the Web page
//  * Note, res, result, and results
app.get('/',function(req,res){
    connection.query('SELECT * FROM movies;',function(err,data){
        res.render('index',{movies:data});
    })
})

app.post('/create', function(req,res){
    connection.query('INSERT INTO movies (movie) VALUES (?);', [req.body.movie],
    function(err,result){
        if(err)throw err;
        res.redirect('/');
    })
})

app.put('/update', function(req,res){
    connection.query('UPDATE movies SET movie = ? WHERE id = ?;', [req.body.movie, req.body.id],
    function(err,results){
        if(err)throw err;
        res.redirect('/');
    })
})

app.delete('/delete', function(req,res){
    connection.query('DELETE FROM movies WHERE id = ?;', [req.body.id],
    function(err,results){
        if(err)throw err;
        res.redirect('/');
    })
})




