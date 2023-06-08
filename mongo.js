const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.bpui307.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: name,
  number: number,
  important: true,
})

// finds notes from mongo database
/* Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
}) */

// saves notes to mongo database
if (process.argv.length >= 4) {
  note.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}else {
  Note.find({}).then(result => {
    console.log("phonebook")
    result.forEach(note => {
      console.log(note.name + " " + note.number)
    })
    mongoose.connection.close()
  })
}