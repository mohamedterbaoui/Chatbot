let express = require('express');
let ejs = require('ejs');

let app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(8080);

// localhost:8080
app.get('/', function(request, response) {
    response.render('pages/index');

    
});
