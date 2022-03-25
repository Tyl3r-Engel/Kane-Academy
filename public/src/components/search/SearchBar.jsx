import React, { useContext } from 'react'
import { SearchContext } from '../../context'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchBar() {
  const { handleOnSearch, query } = useContext(SearchContext)
  return (
    <div>
        <form style={{padding: '10px', marginTop: '120px'}}>
          <TextField id='outlined-basic' label='Search by Skill/Mentor' autoComplete='off' value={query} onChange={handleOnSearch} />
          <Button variant='contained' id='muiPrimary' style={{margin: '10px'}}>Search</Button>
        </form>
    </div>
  )
}
