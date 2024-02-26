import React, { useEffect, useState } from 'react'
import Table from './Table'

const Seating = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [peopleData, setPeopleData] = useState([])

  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1', people: [] },
    { id: 2, name: 'Table 2', people: [] }
  ])

  useEffect(() => {
    fetch('assets/people.json')
      .then(response => response.json())
      .then(data => {
        setPeopleData(data)
        setSearchResults(data.slice(0, 10))
      })
      .catch(error => console.error('Error fetching people data:', error))
  }, [])


  useEffect(() => {
  const updatedTables = tables.map(table => ({
    ...table,
    people: peopleData.filter(person => person.tableId === table.id)
  }));
  setTables(updatedTables);
}, [peopleData]);


  const handleSearch = () => {
    const results = peopleData.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const addTable = () => {
    const newTable = { id: tables.length + 1, name: `Table ${tables.length + 1}`, people: [] }
    setTables([...tables, newTable])
  }

  const addPersonToTable = (tableId, person) => {
    if (tableId) {
      setTables(prevTables => {
        const updatedTables = prevTables.map(table =>
          table.id === parseInt(tableId)
            ? { ...table, people: [...table.people, person] }
            : table
        )
        return updatedTables
      })
      setSearchResults(prevResults =>
        prevResults.filter(p => p.id !== person.id)
      )
    }
  }


  return (
    <div>
      <input
        type="text"
        placeholder="Search people..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((person, index) => (
          <li key={index}>
            {person.name}{' '}
            <select 
              onChange={(e) => addPersonToTable(e.target.value, person)}
              value={person.tableId}
            >
              <option value="">Select Table</option>
              {tables.map(table => (
                <option key={table.id} value={table.id}>{table.name}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      {tables.map(table => (
        <Table key={table.id} table={table} />
      ))}

    </div>
  )
}

export default Seating