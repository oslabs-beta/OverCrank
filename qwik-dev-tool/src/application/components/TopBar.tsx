import React, { useState } from 'react'
import {
    Typography,
    AppBar,
    Toolbar,
    Link, 
    IconButton
  } from '@mui/material';
  import GitHubIcon from '@mui/icons-material/GitHub'


const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Qwik DevTool
        </Typography>
        <Link
          href="https://github.com/yourusername/yourrepository"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="inherit"
        >
          <IconButton edge="end" color="inherit" aria-label="github">
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        color="inherit"
      >
        <Typography variant="body1" component="span">
          Thirsty boys website
        </Typography>
      </Link>
    </Toolbar>
    </AppBar>
  )
};



export default TopBar;