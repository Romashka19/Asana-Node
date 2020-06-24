const path = require('path');
const db = require('./db');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname , "index.html") );
});


app.get('/projects', function (req, res) {
    db.connection.query(
        'SELECT * FROM projects ',
        function (error, results) {
            if( error ){
                return console.log(error);
            }
            res.json({
                data: results
            });
        }
    );
});


app.get('/tasks/:project_id', function (req, res) {
    db.connection.query(
        'SELECT * FROM tasks where project_id = ?', [+req.params.project_id]   ,
        function (error, results) {
            if( error ){
                return console.log(error);
            }

            res.json({
                data: results
            });
        }
    );
});

app.get('/projects/:projectName', function (req, res) {
    db.connection.query(
        'INSERT INTO projects (name) VALUES (?)', [+req.params.projectName]   ,
        function (error, results) {
            if( error ){
                return console.log(error);
            }

            res.json({
                data: results
            });
        }
    );
});

app.get('/task/:taskName/id/:project_id', function (req, res) {
    db.connection.query(
        'INSERT INTO tasks (name, project_id) VALUES (?, ?)', [+req.params.taskName, +req.params.project_id]   ,
        function (error, results) {
            if( error ){
                return console.log(error);
            }

            res.json({
                data: results
            });
        }
    );
});

app.get('/task/:taskName/taskid/:task_id', function (req, res) {
    db.connection.query(
        'UPDATE tasks SET name = ? WHERE id = ?', [+req.params.taskName, +req.params.task_id]   ,
        function (error, results) {
            if( error ){
                return console.log(error);
            }

            res.json({
                data: results
            });
        }
    );
});

app.get('/taskid/:task_id', function (req, res) {
    db.connection.query(
        'DELETE FROM tasks WHERE id = ?', [+req.params.task_id]   ,
        function (error, results) {
            if( error ){
                return console.log(error);
            }

            res.json({
                data: results
            });
        }
    );
});

app.listen(3000, function(){
    console.log('Run server');
});