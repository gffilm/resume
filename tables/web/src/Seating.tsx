import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton
} from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

const Seating = () => {
  const [unassignedCount, setUnassignedCount] = useState(0)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [peopleData, setPeopleData] = useState([])
  const [startTableIndex, setStartTableIndex] = useState(1)
  const [startPeopleIndex, setStartPeopleIndex] = useState(1)

  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1', max: 10, people: [] },
    { id: 2, name: 'Table 2', max: 8, people: [] },
    { id: 3, name: 'Table 3', max: 10, people: [] },
    { id: 4, name: 'Table 4', max: 10, people: [] },
    { id: 5, name: 'Table 5', max: 10, people: [] },
    { id: 6, name: 'Table 6', max: 10, people: [] },
    { id: 8, name: 'Table 7', max: 10, people: [] },
    { id: 9, name: 'Table 8', max: 10, people: [] },
    { id: 10, name: 'Table 9', max: 8, people: [] },
    { id: 12, name: 'Table 10', max: 10, people: [] },
    { id: 15, name: 'Table 11', max: 34, people: [] },
  ])

  useEffect(() => {
    fetch('assets/people.json')
      .then(response => response.json())
      .then(data => {
        setPeopleData(data)
        setSearchResults(data.slice(0, 8))
      })
      .catch(error => console.error('Error fetching people data:', error))
  }, [])


  useEffect(() => {
    // Calculate unassigned count
    const unassignedPeople = peopleData.filter(person => !person.tableId)
    setUnassignedCount(unassignedPeople.length)

    const updatedTables = tables.map(table => ({
      ...table,
      people: peopleData.filter(person => person.tableId === table.id)
    }))
    setTables(updatedTables)
  }, [peopleData])


  const handleSearch = () => {
    const searchTerms = searchTerm.split(',').map(term => term.trim())

    const results = peopleData.filter(person =>
      searchTerms.some(searchTerm =>
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setSearchResults(results)
  }
  
  const addTable = () => {
    const newTable = { id: tables.length + 1, name: `Table ${tables.length + 1}`, people: [] }
    setTables([...tables, newTable])
  }

  const addPersonToTable = (tableId, person) => {
    if (tableId) {
      person.tableId = parseInt(tableId)
      const personIndex = peopleData.findIndex((p) => p.id === person.id)
      const updatedPeopleData = [...peopleData]
      updatedPeopleData[personIndex] = person
      setPeopleData(updatedPeopleData)
    }
  }

  const removePersonFromTable = (tableId, person) => {
    person.tableId = 0
    const updatedPeopleData = [...peopleData]
    const personIndex = updatedPeopleData.findIndex((p) => p.id === person.id)
    updatedPeopleData[personIndex] = person
    setPeopleData(updatedPeopleData)
  }

  const autoAssign = () => {
    if (searchTerm) {
      let sortedPeople = searchResults.sort((a, b) => a.lastName.localeCompare(b.lastName))
    } else {
      let sortedPeople = peopleData.sort((a, b) => a.lastName.localeCompare(b.lastName))
    }
    let tableIndex = startTableIndex - 1
    let currentTable = tables[tableIndex]
    let currentTableId = currentTable.id
    let peopleAssigned = currentTable.people.length
    let totalPeopleAssigned = 0
    let totalPeople = sortedPeople.length
    let totalTables = tables.length

    for (const person of sortedPeople) {
      // Move to the next table if the current one is filled to the maximum
      if (peopleAssigned >= currentTable.max) {
        tableIndex++
        setStartTableIndex(tableIndex + 1)
        if (tableIndex >= totalTables) {
          setError(`Not enough tables available: ${totalPeopleAssigned}/${totalPeople}`)
          return
        }
        currentTable = tables[tableIndex]
        currentTableId = currentTable.id
        peopleAssigned = 0
      }
      if (!person.tableId) {
        person.tableId = currentTableId
        peopleAssigned++
        totalPeopleAssigned++
      }

    }
    setPeopleData(prevPeopleData => {
      const updatedData = prevPeopleData.map(person => {
        const updatedPerson = sortedPeople.find(updated => updated.id === person.id)
        return updatedPerson || person
      })
      return updatedData
    })

    setSearchResults(sortedPeople.slice(0, 8))
  }

  const copyToClipBoard = async () => {
    try {
      const prettyData = JSON.stringify(peopleData, null, 2)
      await navigator.clipboard.writeText(prettyData)
      saveDataToAPI()
    } catch (error) {
      console.error('Unable to copy to clipboard', error)
    }
  }

  const saveDataToAPI = async () => {
    try {
      const apiUrl = 'http://localhost:3001/save-data'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(peopleData),
      })

      if (response.ok) {
        alert('Data saved successfully!')
      } else {
        console.error('Failed to save data to API:', response.statusText)
      }
    } catch (error) {
      console.error('Error while saving data to API', error)
    }
  }


  const showNextUnassigned = () => {
    // Fetch all unassigned people
    const unassignedPeople = peopleData.filter(person => !person.tableId)
    let index = startPeopleIndex

    // Display the next 8 unassigned people starting from the current index
    const nextUnassigned = unassignedPeople.slice(index, startTableIndex + 8)

    if (!nextUnassigned.length) { 
      index = 0
    }
    
    // Update the start index for the next call
    setStartPeopleIndex(index + nextUnassigned.length)
    
    // Update the search results to show the next unassigned people
    setSearchResults(nextUnassigned)
  }


   return (
    <Container style={{ padding: '2em' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch();
            }}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Button
            sx={{ marginRight: '1em' }}
            variant="contained"
            color="primary"
            disabled={!searchResults.length}
            onClick={autoAssign}
          >
            Auto Assign
          </Button>
          <TextField
            type="number"
            inputProps={{ style: { height: '.5em', width: '6em' } }}
            label="Starting Table"
            value={startTableIndex}
            onChange={(e) => setStartTableIndex(e.target.value)}
          />
          <Button
            sx={{ marginLeft: '1em' }}
            variant="contained"
            color="secondary"
            onClick={showNextUnassigned}
          >
            Show Next Unassigned
          </Button>
          <Typography>{ peopleData.length - unassignedCount } / {peopleData.length} assigned seats </Typography>
           <Button 
            sx={{marginRight: '1em'}}
            variant="contained" 
            color="primary"
            onClick={copyToClipBoard}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {error && <Typography style={{ color: '#ff0000' }}>{error}</Typography>}
      </Grid>
      <Grid sx={{padding: '1em 0'}} container spacing={2}>
        <Grid item xs={12}>
          <TableContainer style={{ border: '1px solid #ddd', marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Pronoun</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Table #</TableCell>
                  <TableCell>Table</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((person, index) => (
                 <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white', lineHeight: '.5' }}>
                    <TableCell style={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{person.pronoun}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{person.firstName}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{person.lastName}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{person.tableId || ''}</TableCell>
                    <TableCell>
                      <Select
                        style={{ height: '2em' }}
                        onChange={(e) => addPersonToTable(e.target.value, person)}
                        value={person.tableId}
                      >
                        <MenuItem value='0'>Select Table</MenuItem>
                        {tables.map((table) => (
                          <MenuItem key={table.id} value={table.id}>
                            {table.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <IconButton
                        disabled={!person.tableId} 
                        onClick={() => removePersonFromTable(person.tableId, person)} 
                        style={{ marginLeft: '10px' }}>
                      <RemoveCircleIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {tables.map((table, tableIndex) => (
          <Grid item xs={12} md={6} key={tableIndex}>
            <div
                className="table"
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  backgroundColor: `${table.people.length > table.max ? 'red' : table.people.length === table.max ? '#d9ffd9' : '#fff'}`,
                  border: `${table.people.length > table.max ? '1em solid red' : table.people.length === table.max ? '1em solid green' : '3px solid #ddd'}` }}
              >
              <h3 id={`table_${table.id}`}>{table.name}</h3>
                  <p>
                    Max Capacity: {table.max} | Current Seats: {table.people.length}
                  </p>              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {table.people.map((person, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Avatar style={{ marginRight: '10px' }}>
                      {person.firstName.charAt(0)}
                      {person.lastName.charAt(0)}
                    </Avatar>
                    <span>{person.firstName} {person.lastName}</span>
                    <IconButton onClick={() => removePersonFromTable(table.id, person)} style={{ marginLeft: '10px' }}>
                      <RemoveCircleIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
     <Button 
            sx={{marginRight: '1em'}}
            variant="contained" 
            color="primary"
            onClick={copyToClipBoard}>
            Save
          </Button>
    </Container>
  )
}

export default Seating