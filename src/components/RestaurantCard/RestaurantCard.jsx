import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia , Modal , Typography, Popover } from "@mui/material";
import React, {useState, useContext} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoginContext } from '../../contexts/LoginContext'


const RestaurantCard = ({restaurant, voted, vote, isShown, remove}) => {
    const {user} = useContext(LoginContext)
    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selected, setSelected] = useState(false);

    const handleSubmit = () =>{ 
        vote()
        handleClose()
        setSelected(true)
    }

    const handleRemove = () =>{ 
        remove()
        handleClosePopover()
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return ( 
        <>
            <Card  sx={{ maxWidth: 345, border: selected ? "3px solid #87b0da" : "", boxShadow: "5px 5px 5px #aaaa;"}} >
                <CardActionArea onClick={handleClick} aria-describedby={id}>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1571987530791-58e3e7744d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt="green iguana"
                    />
                    <CardContent sx={{height: 150}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {restaurant?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {restaurant?.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {isShown && (
                        <Box sx={{float: "right"}}>
                            {voted && (
                                user && (
                                <Button color="primary" variant="contained" disabled onClick={handleOpen}>Votar</Button>
                                ))}
                                
                            {!voted && (
                                user && (
                                <Button color="primary" variant="contained" onClick={handleOpen}>Votar</Button>
                                ))}
                        </Box>
                    )}

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Deseja votar em: {restaurant?.name}?
                        </Typography>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://images.unsplash.com/photo-1571987530791-58e3e7744d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            alt="Mocked image"
                        />
                        <Box sx={{marginTop: 5}}>
                            <Button color="error" variant="outlined" onClick={() => handleClose()}>Cancelar</Button>
                            <Button color="success" variant="outlined" sx={{marginLeft: 3}} onClick={() => handleSubmit()}>Sim, votar</Button>
                        </Box>
                        </Box>
                    </Modal>
                </CardActions>
            </Card>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <Button variant="outlined" color="error" onClick={() => handleRemove()}>
                    Remover
                        <DeleteIcon />
                </Button>
            
            </Popover>
      </>
     );
}
 
export default RestaurantCard;