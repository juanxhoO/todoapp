const express = require("express")
const express = require('express');
const router = express.Router();
const Todo = require('../models/todos.js');




var dbName = 'todoDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

router.get('/todos',(req, res, next) => {

    Todo.find({},'action').then(data => res.json(data)).catch(next);

});

router.post('/todos',(req, res, next) => {
    console.log(req.body.action);
    if(req.body.action){
        Todo.create(req.body).then(data => res.json.data).catch(next)
    }
    else{
        res.json({
            error: "The input is empty"
        })
    }
});

router.delete('/todos/:id',(req, res, next) => {
    Todo.findOneAndDelete({'_id':req.params.id}).then(data => res.json(data)).catch(next);
});


module.exports = router;
