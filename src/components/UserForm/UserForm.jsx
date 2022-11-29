import React, {useState} from 'react'
import {Button, Grid, Box, TextField, FormHelperText} from '@mui/material'

const UserForm = ({getUser, secondaryFunction, secondary, primary, error}) => {
  const [user, setUser] = useState()

  const handleSubmit = () => {
    getUser(user)
  }
  return(
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center" 
        minHeight="100vh"
      >
        <Grid>
          <TextField id="outlined-basic" label="Insira seu usuário" variant="outlined" onChange={e=>setUser(e.target.value)}/>
          <Grid container sx={{ marginTop: 2 }} rowSpacing={2}>
            <Grid item sx={{marginRight: 1}}>
              <Button variant="outlined" onClick={secondaryFunction}>{secondary}</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>{primary}</Button>
            </Grid>
          </Grid>
        {error && (
            <FormHelperText id="component-helper-text" error sx={{marginTop: 2}}>{error}</FormHelperText>
        )}
        </Grid>
    </Box>
  )
}

export default UserForm