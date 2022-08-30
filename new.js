let express = require('express');
let add = require('add');
let calc = express();
calc.get('/', function(req, res){
    res.send(add(4, 2, '+'));
});
calc.listen(3000, function(req, res){
    console.log('running');
});
