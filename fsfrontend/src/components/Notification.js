import React from 'react'

const Notification = ({ success }) => {
    if (success == null) {
        return null
    }
    
  return (
    <div className='success'>
      {success}
    </div>
  )
}

export default Notification