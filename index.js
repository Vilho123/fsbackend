require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const Note = require('./models/note')

/* const url = `mongodb+srv://fullstack:${password}@cluster0.bpui307.mongodb.net/noteApp?retryWrites=true&w=majority` */


app.use(express.static('build'))
app.use(cors())

// Muuta koodi json muotoon.
app.use(express.json())
app.use(morgan('tiny', {
    skip: function (req) {
        console.log("morgan log", req.body)
    }
}))

// Express error handling example
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.get('/api/notes', (request, response, next) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
    .catch(error => next(error))
})

/* app.get('/api/info', (request, response) => {
    const date = new Date()
    const contactsCount = request.body.length
    response.send(`<p>Phonebook has info for ${contactsCount} people</p>` + date)
}) */

// Get person with id
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }) // sends the error to errorhandling middleware
    .catch(error => next(error))
})

// Delete note
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(/*result*/() => {
        response.status(204).end()
    })
    .catch(error => next(error))
});

// Update note
app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    console.log("body ", body)

    const note = {
        name: body.content,
        number: body.number
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))

    // better way to make it with validators

    /* const { name, number } = request.body;
    Note.findByIdAndUpdate(request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error)) */
});

/* const generateId = () => {
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
} */

app.post('/api/notes', (request, response, next) => {
    const body = request.body
    console.log("body ", body)

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const note = new Note({
        name: body.name,
        number: body.number,
    })

    note.save().then(savedNote => {
        console.log("inside save")
        response.json(savedNote)
    })
    .catch(error => next(error))
});

// Exampe middleware function

/* const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
}
 app.use(unknownEndpoint)
*/

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})