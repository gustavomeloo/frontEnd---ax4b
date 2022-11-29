import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NoFoodIcon from '@mui/icons-material/NoFood';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

const pages = [{name:'Home', path:'/'}, {name:'Ranking', path:'/ranking'}];

function AppBarComponent() {

  const navigate = useNavigate();

  const {signed, user, logout} = React.useContext(LoginContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <NoFoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {navigate("/")}}

          >
            Restaurant Poll
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,i) => (
              <Button
                key={i}
                onClick={() => {navigate(page.path)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
            
          { signed && (
            <Box sx={{ flexGrow: 0 }} display="flex">
              <Typography sx={{marginRight: 3, alignSelf:'center'}}>
                {user.username.charAt(0).toUpperCase() + user.username.substring(1)}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username.charAt(0).toUpperCase() + user.username.substring(1)} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => logout()}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
        )}

        {!signed && (
          <Button variant="contained" color='secondary' onClick={() => navigate("/login")}>Login</Button>
        )}
        
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarComponent;