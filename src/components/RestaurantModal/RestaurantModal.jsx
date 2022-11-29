import React, {useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createRestaurant } from '../../services/Restaurant';

export default function RestaurantModal({addRestaurant}) {
  const [open, setOpen] = React.useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleSubmit = async () => {

    await createRestaurant(restaurantName, restaurantDescription)
    addRestaurant()
    setOpen(false)

  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Criar novo restaurante
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar novo restaurante</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome do restaurante"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                    setRestaurantName(e.target.value)
                }}
                />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Descrição do restaurante"
                type="text-area"
                multiline
                rows={3}
                fullWidth
                variant="standard"
                onChange={(e) => {
                    setRestaurantDescription(e.target.value)
                }}
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} >Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}