import React, { useContext } from 'react'
import { SearchContext } from '../../context'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchBar() {
  const { handleOnSearch, query } = useContext(SearchContext)
  return (
    <div>
        <form style={{padding: '10px'}}>
          <TextField id='outlined-basic' label='Search Mentor Skill' autoComplete='off' value={query} onChange={handleOnSearch} />
          <Button variant='contained' style={{margin: '10px'}}>Search</Button>
        </form>
    </div>
  )
}
