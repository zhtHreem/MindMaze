import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import SideNavBar from './navbar';

const RiddlePage = () => {
  const [riddle, setRiddle] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const { time, startTimer } = useTimer(10, () => setShowAnswer(true));

  const generateRiddle = async () => {
    setLoading(true);
    setShowAnswer(false);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-riddle/`, {
        method: 'POST',
      });
      const data = await response.json();
      setRiddle(data);
      startTimer();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      width: '100vw', 
      backgroundImage: 'linear-gradient(135deg, #86A788, #007F73)',  
      p: 3,
      boxSizing: 'border-box',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <SideNavBar />
      {/* Riddle Content on the Right */}
      <Box sx={{  flexGrow: 1,  ml: { xs: 0, md: '10%' },  p: 3, backgroundImage: 'linear-gradient(135deg, #86A788, #007F73)', overflow: 'hidden',}}>
        {/* Header */}
        <Box sx={{  display: 'flex',   justifyContent: 'space-between',   alignItems: 'center',  mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="span">🤔</Typography>
            <Typography  variant="h6" sx={{   color: '#FFFFFF',fontWeight: 500 }} >
              Random Riddle Time!
            </Typography>
          </Box>
           
          <Button  onClick={generateRiddle} disabled={loading}  sx={{   bgcolor: '#7161EF',  color: '#FFFFFF',borderRadius: '50px',  px: 3, py: 1,  textTransform: 'uppercase', '&:hover': {  bgcolor: '#5B4DE3' }, '&.Mui-disabled': {    bgcolor: '#4A4A4A',  color: '#A0A0A0'  }  }}
            startIcon={<Typography component="span">✨</Typography>} >
            Generate New Riddle
          </Button>
        </Box>

        {/* Riddle Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Riddle Section */}
          <Box sx={{   bgcolor: '#FFFFFF',    borderRadius: '12px',  p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography component="span">✨</Typography>
              <Typography sx={{ color: '#086E7D', fontWeight: 500, textTransform: 'uppercase' }}>
                Riddle Me This:
              </Typography>
            </Box>
            {loading ? (
              <Skeleton   variant="text"  sx={{   bgcolor: 'rgba(20, 7, 7, 0.1)',  height: 80  }}  />
            ) : (
              <Typography sx={{ color: '#086E7D' }}>
                {riddle?.question || "Click 'Generate' to get a riddle!"}
              </Typography>
            )}
          </Box>

          {/* Answer Section */}
          <Box sx={{ 
            bgcolor: '#FFBB64',
            borderRadius: '12px',
            p: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Typography component="span">📚</Typography>
              <Typography sx={{ color: '#FFFFFF', fontWeight: 500, textTransform: 'uppercase' }}>
                The Answer:
              </Typography>
            </Box>
            {loading ? (
              <Skeleton 
                variant="text" 
                sx={{ 
                  bgcolor: 'white',
                  height: 40
                }} 
              />
            ) : (
              <>
                {!showAnswer && riddle && (
                  <Typography variant="h2" sx={{ color: 'white', textAlign: 'center' }}>
                    {time} seconds
                  </Typography>
                )}
                {showAnswer && riddle && (
                  <Typography variant="h2" sx={{ color: 'white', textAlign: 'center' }}>
                    {riddle.answer}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Timer hook
const useTimer = (initialTime, onComplete) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, onComplete]);

  const startTimer = (newTime = initialTime) => {
    setTime(newTime);
    setIsRunning(true);
  };

  return { time, isRunning, startTimer };
};

export default RiddlePage;
