import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Box, Button} from "@mui/material";



const Header = () => {
  return (
      <AppBar position="static" sx={{backgroundColor: '##29b6f6'}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
              <img src="/logo_station.png" alt="logo" style={{width: 50, height: 50}} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Weather Station
            </Typography>
          <Box component="div" sx={{ flexGrow: 20}}>
            <Button color="inherit" href="/">Main</Button>
            <Button color="inherit" href="/stats">Stats</Button>
            <Button color="inherit" href="/stats-average">Monthly Average</Button>
            <Button color="inherit" href="/stats-chart">Weather Chart</Button>
          </Box>
        </Toolbar>
      </AppBar>
  );
};
export default Header;
