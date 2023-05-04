import React, { useState } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import { Typography, AppBar, Toolbar, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RefreshIcon from '@mui/icons-material/Refresh';
import Logo from '../../extension/assets/overcrank-128.png';
// import Logo from '../assets/overcrank-128.png';
declare const chrome: any;

const TopBar = () => {
  const handleRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const activeTab = tabs[0];
      chrome.tabs.reload(activeTab.id);
    });
    window.location.reload();
  };
  return (
    <AppBar
      position='static'
      sx={{ bgcolor: 'rgb(22, 22, 24)' }}
    >
      <Toolbar>
        <div className='flex flex-row flex-1 max-h-full'>
          <img
            src={chrome.runtime.getURL('../assets/overcrank-2d-logo.png')}
            alt='OverCrank Logo'
            style={{ height: '40px', paddingRight: '10px' }}
          />
        </div>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          OverCrank
        </Typography>

        <IconButton
          color='inherit'
          className='refresh-btn'
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </IconButton>
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
