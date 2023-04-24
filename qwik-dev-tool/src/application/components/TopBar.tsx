import React, { useState } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import { Typography, AppBar, Toolbar, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const TopBar = () => {
  return (
    <AppBar
      position='static'
      sx={{ bgcolor: 'rgb(22, 22, 24)' }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Qwik Dev Tool
        </Typography>
        <Link
          href='https://github.com/oslabs-beta/OSP1-Qwik-Dev-Tool'
          target='_blank'
          rel='noopener noreferrer'
          underline='none'
          color='inherit'
        >
          <Typography
            variant='body1'
            component='span'
            className='p-1 align-middle'
          >
            Repo
          </Typography>
          <IconButton
            color='inherit'
            aria-label='github'
          >
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          href='https://github.com/oslabs-beta/OSP1-Qwik-Dev-Tool/blob/main/README.md'
          target='_blank'
          rel='noopener noreferrer'
          underline='none'
          color='inherit'
        >
          <Typography
            variant='body1'
            component='span'
            className='p-2 align-middle'
          >
            Docs
          </Typography>
          <OpenInBrowserIcon></OpenInBrowserIcon>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
