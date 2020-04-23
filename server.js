var todos = require('./todos.js')

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such todo: ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
  response.json(todos)
})

app.post('/todos', function (request, response) {
  var id = request.body.description.trim().toLowerCase().split(' ').join('-')
  todos[id] = {
    description: request.body.description.trim(),
    completed: request.body.completed.trim()
  }
  response.redirect('/todos/' + id)
})

app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var todo = todos[request.params.id]
  if (request.body.description !== undefined) {
    todo.description = request.body.description.trim()
  }
  if (request.body.completed !== undefined) {
    todo.completed = request.body.completed.trim()
  }
  response.redirect('/todos/' + request.params.id)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

/* app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such todo: ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})
*/

app.listen(port)
