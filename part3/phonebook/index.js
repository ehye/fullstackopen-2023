const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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
    response.json(persons)
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
    response.send(`<div>Phonebook has info for ${persons.length} people</div><br /><div>${new Date()}</div>`)
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(note => note.id !== Number(request.params.id))
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    if (persons.some(p => p.name === request.body.name)) {
        response.status(400).json({ error: 'name must be unique' })
    }
    if (request.body.name == null || request.body.number == null) {
        response.status(400).json({ error: 'name is empty' })
    }
    if (request.body.number == null) {
        response.status(400).json({ error: 'number is empty' })
    }
    else {
        var person = {
            "id": getRandomIntInclusive(1, 1000),
            "name": request.body.name,
            "number": request.body.number
        }
        persons.push(person)
        response.status(200).send(person)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
