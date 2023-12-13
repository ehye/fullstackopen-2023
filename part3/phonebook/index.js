require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const PhoneBook = require('./models/person')

app.use(cors())
app.use(express.json())
morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

app.use(express.static('dist'))

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    PhoneBook.find({}).then(result => {
        if (result.length > 0) {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            // mongoose.connection.close()
        }
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {

    const person = persons.find(p => p.id === Number(request.params.id))
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${Persons.length} people</div><br /><div>${new Date()}</div>`)
})

app.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const phoneBook = new PhoneBook({
        name: body.name,
        number: body.number,
    })

    phoneBook.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }
