import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import { EmojiObjects as EmojiObjectsIcon } from '@mui/icons-material';

const SideNavBar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        left: { xs: 0, md: '5%' },
        bottom: { xs: 0, md: 'auto' },
        top: { xs: 'auto', md: '50%' },
        transform: { xs: 'none', md: 'translateY(-50%)' },
        width: { xs: '100%', md: '60px' },
        height: { xs: '60px', md: '50vh' },
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTop: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 'none' },
        borderRight: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.1)' },
        zIndex: 1000,
      }}
    >
      <IconButton
        sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
        onClick={() => navigate('/')}
      >
        <HomeIcon />
      </IconButton>

      <IconButton
        sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
        onClick={() => navigate('/riddle')}
      >
        <HelpOutlineIcon />
      </IconButton>

      <IconButton
        sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
        onClick={() => navigate('/funfact')}
      >
        <EmojiObjectsIcon />
      </IconButton>
    </Box>
  );
};

export default SideNavBar;
