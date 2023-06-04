import React, { useState } from 'react'

const PersonForm = ({ newName, newNumber, handleSave, setNewName, setNewNumber }) => {
  return (
    <div>
        <form>
          <div>
            name: {""}
            <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            />
          </div>
          <div>
            number: {""}
            <input
              onChange={(e) => setNewNumber(e.target.value)}
              value={newNumber}
            />
          </div>
          <div>
            <button onClick={handleSave}>save</button>
          </div>
        </form>
    </div>
  )
}

export default PersonForm