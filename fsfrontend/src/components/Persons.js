import React from "react"

const Persons = ({ persons, state, handleRemove }) => {
  const getPersons = () => {
    return persons.map(person =>
    <ul key={person.name}>
      {person.name} {person.number}
      <button onClick={() => handleRemove(person.id)}>delete</button>
    </ul>)
  };

  return (
      <div>
        {(state.query === '' ? getPersons() : state.list.map(person => {
          return <ul className="filter-teksti" key={person.id}>
            {person.name} {person.number}
            </ul>
        }))}
      </div>
  );
};

export default Persons