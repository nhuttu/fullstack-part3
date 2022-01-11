const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
app.use(express.static('backend'))
require('dotenv').config()
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', req => JSON.stringify(req.body))


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then(p => {
    res.send(`<p>Phonebook has info ${p.length} for people</p>${date}`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(p => {
      if (p) {
        res.json(p)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error)

    )

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  return Math.floor(Math.random() * 10000) + 1
}
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.map(p => p.number).includes(body.number) || (persons.map(p => p.name).includes(body.name))) {
    return res.status(400).json({
      error: 'number or name already is in the phonebook'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  person.save().then(p => {
    res.json(p)
  })
  .catch(error => next(error))

})
app.put('/api/persons/:id', (req, res, next) => {
  console.log('test')
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedP => {
      res.json(updatedP)
    })
    .catch(error => next(error))
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)
