import React from 'react'

const Table = (props) => {
  const { table } = props
  return (
    <div className="table">
      <h3 id={`table_${table.id}`}>{table.name}</h3>
      <ul>
        {table.people.map((person, index) => (
          <li key={index}>{person.name} </li>
        ))}
      </ul>
    </div>
  )
}

export default Table
