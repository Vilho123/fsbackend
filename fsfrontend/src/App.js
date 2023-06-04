import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { getAll, create, remove, getPerson, updatePerson } from './services/persons';
import "./index.css";

const App = () => {
  useEffect(() => {
    getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])    

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [state, setState] = useState({
    query: '',
    list: []
  })

  const handleSave = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber
    };
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName && persons[i].number === newNumber) {
        return alert(`${newName} is already added to phonebook`)
      } else if (persons[i].name === newName && persons[i].number !== newNumber) {
        const id = persons[i].id;
        updatePerson(id, newObject)
        .then(response => {
          getAll()
          .then(initialPersons => {
            setPersons(initialPersons);
          })
        })
      }
    }

    const existingPerson = persons.find(person => person.name === newName)
    const existingNumber = persons.find(person => person.number === newNumber)

    if (!existingPerson && !existingNumber) {
      create(newObject)
      .then(response => {
        getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          handleSuccessMessage(newName);
        })
      })
    }
  };

  const handleErrorMessage = () => {
    if (errorMessage === null) {
      setErrorMessage('Error ocurred')
    } else if (errorMessage !== null) {
      setErrorMessage(null);
    }
  }

   const handleSuccessMessage = name => {
    if (name) {
      setSuccessMessage(`Added ${name}`)

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000)
    }
  }; 


  const handleFilter = (event) => {
    setFilter(event.target.value);
    const results = persons.filter(post => {
      if (event.target.value === "") return persons
      return post.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    })
    setState({
      query: event.target.value,
      list: results
    })
  };

  const handleRemove = id => {
    const existingPerson = persons.find(person => person.name === newName)
    const existingNumber = persons.find(person => person.number === newNumber)

    if (!existingPerson && !existingNumber) {
      console.log("here")
    }

    getPerson(id)
    .then(response => {
      if (window.confirm(`Delete ${response.name} ?`)) {
        remove(id)
        .then(response => {
          getAll()
          .then(initialPersons => {
          setPersons(initialPersons)
        })
        })
      }
    })
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <button
      className='error-button'
      onClick={() => handleErrorMessage()}
      >
        Display error
      </button>
      <Notification success={successMessage} />
      <Filter
      query={state.query}
      handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      
      <PersonForm
      newName={newName}
      newNumber={newNumber}
      handleSave={handleSave}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      
      <Persons
      persons={persons}
      state={state}
      query={state.query}
      handleRemove={handleRemove}
      />
      <Footer />
    </div>
  )
}

export default App