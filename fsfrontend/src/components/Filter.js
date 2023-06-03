import React from 'react'

const Filter = ({ query, handleFilter }) => {  
  return (
    <div>
      <form>
        filter shown with <input
        type='search'
        value={query}
        onChange={handleFilter}
        />
      </form>
    </div>
  )
}

export default Filter