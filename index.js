const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
// Muuta koodi json muotoon.
app.use(express.json())
app.use(morgan('tiny', {
    skip: function (req, res) {
        console.log(req.body)   
    }
}))

// Kovakoodattu taulukko
let notes = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: "040-123456",
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

app.get('/', (request, response) => {
    response.send("Hey hey hey...")
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
});

app.get('/api/info', (request, response) => {
    const date = new Date()
    const contactsCount = notes.length
    response.send(`<p>Phonebook has info for ${contactsCount} people</p>` + date)
})
// Get person with id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)
    response.json(note)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    console.log("note: ", note)

    if (note) {
        console.log("deleted")
        response.status(204).end()
    } else {
        console.log("not found")
        response.status(404).end()
    }
});

const generateId = () => {
    let arr = [];
    const random = Math.floor(Math.random() * 100000)
    const thing = notes.map(note => {
        arr.push(note.id)
    })
    const searching = arr.includes(random)

    if (searching) {
        return generateId()
    }
    return random;
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

    const newId = id + 1;

    const existingName = notes.find(note => note.name.toLowerCase() === body.name.toLowerCase())

    if (body.number === "") {
        console.error("number cannot be empty")
        return response.status(409).end()
    } else if (body.name === "") {
        console.error("Name cannot be empty")
        return response.status(409).end()
    } else if (existingName) {
        console.error("Name already exists")
        return response.status(404).end() 
    }

    const note = [
        {
            id: generateId(),
            name: body.name,
            number: body.number || "no number"
        }
    ]
    notes = notes.concat(note)
    response.status(204).end()
});

// Exampe middleware function

/* const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
}
 app.use(unknownEndpoint)  */



//----------------------
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)