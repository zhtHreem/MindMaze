import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SideNavBar from './navbar';
import { EmojiObjects, Psychology, TimelapseOutlined } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box sx={{    minHeight: '100vh',   background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',  color: 'white',  overflow: 'hidden', position: 'relative' }}>
      <SideNavBar />
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography  component="h1"   variant="h2"  align="center"  fontWeight="bold" sx={{   mb: 2,   background: 'linear-gradient(90deg, #FFFFFF 0%, #E0F7FA 100%)',    backgroundClip: 'text',   textFillColor: 'transparent',   WebkitBackgroundClip: 'text',   WebkitTextFillColor: 'transparent',  }}  >
            MindMaze
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
            Challenge your mind with AI-powered riddles and fascinating facts
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button   variant="contained"    size="large"  onClick={() => navigate('/riddle')}  sx={{   backgroundColor: 'rgba(255, 255, 255, 0.2)',   backdropFilter: 'blur(10px)',  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },   borderRadius: 2, px: 4 }}  >
              Start Riddle Challenge
            </Button>
            <Button  variant="outlined"   size="large"  onClick={() => navigate('/funfact')}  sx={{  color: 'white',   borderColor: 'rgba(255, 255, 255, 0.5)',  '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' },  borderRadius: 2,  px: 4 }}  >
              Discover Fun Facts
            </Button>
          </Box>
        </motion.div>
      </Container>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Card sx={{    height: '100%',    display: 'flex',    flexDirection: 'column',  backgroundColor: 'rgba(255, 255, 255, 0.1)',   backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)',   borderRadius: 4, boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  color: 'white' }}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <Psychology sx={{ fontSize: 60, mb: 2, color: '#E0F7FA' }} />
                    <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                      Brain Teasers
                    </Typography>
                    <Typography>
                      Engage with our AI-generated riddles that adapt to your skill level and push your cognitive abilities.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Card sx={{   height: '100%',    display: 'flex',    flexDirection: 'column',   backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',    border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 4,   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',   color: 'white' }}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <EmojiObjects sx={{ fontSize: 60, mb: 2, color: '#E0F7FA' }} />
                    <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                      Fascinating Facts
                    </Typography>
                    <Typography>
                      Discover amazing facts from various domains including science, history, art, and technology.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  color: 'white'
                }}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <TimelapseOutlined sx={{ fontSize: 60, mb: 2, color: '#E0F7FA' }} />
                    <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                      Timed Challenges
                    </Typography>
                    <Typography>
                      Test your quick thinking with timed quiz sessions that keep your mind sharp and ready.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      
      {/* Call to Action */}
      <Box   sx={{  backgroundColor: 'rgba(0, 0, 0, 0.2)',   pt: 8,  pb: 12,  position: 'relative',  overflow: 'hidden',   }}  >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0 }}  animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} >
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 4 }}>
              Ready to Challenge Your Mind?
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, opacity: 0.9 }}>
              Join thousands of users who exercise their brain daily with MindMaze
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained"   size="large"  sx={{   backgroundColor: '#E0F7FA',  color: '#134e5e', fontWeight: 'bold',  '&:hover': { backgroundColor: '#B2EBF2' },  px: 5, py: 1.5,  borderRadius: 2  }}   onClick={() => navigate('#')} >
                Get Started
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', p: 6 }} component="footer">
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} MindMaze. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;