import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CategoryIcon from '@mui/icons-material/Category';
import SideNavBar from './navbar';

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)',
  color: '#3D155F',
  height: '100%',
  boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 12px 24px rgba(0,0,0,0.3)',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const FunFactGenerator = () => {
  const [factData, setFactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateNewFact = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-fact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFactData(data);
      setError(null);
    } catch (err) {
      setError('Failed to generate fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', backgroundImage: 'linear-gradient(135deg, #86A788, #007F73)', p: 3, boxSizing: 'border-box', minHeight: '100vh', overflow: 'hidden' }}>
      <SideNavBar />
      <Container maxWidth="xl" sx={{ flexGrow: 1, ml: { xs: 0, md: '10%' }, p: 3,  overflow: 'hidden' }}>
        <HeaderBox>
          <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255, 255, 255, 0.9)' , fontWeight: 600 }}>
  
            Random Fun Fact Time!
          </Typography>
          <Button variant="contained" onClick={generateNewFact} disabled={loading} startIcon={<AutoAwesomeIcon />} sx={{ bgcolor: '#DEAA79', '&:hover': { bgcolor: 'white',color: '#DEAA79',},borderRadius: '100px',px: 3, py: 1.5, }} >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'GENERATE NEW FACT'}
          </Button>
        </HeaderBox>

        {loading ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard elevation={0}>
                <CardContent>
                  <Skeleton variant="text" width="80%" sx={{ bgcolor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)', height: 80 }} />
                  <Skeleton variant="text" width="60%" sx={{ bgcolor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)', height: 20 }} />
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard elevation={0}>
                <CardContent>
                  <Skeleton variant="text" width="70%" sx={{ bgcolor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)', height: 20 }} />
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard elevation={0}>
                <CardContent>
                  <Skeleton variant="text" width="70%" sx={{ bgcolor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)', height: 20 }} />
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard elevation={0}>
                <CardContent>
                  <Skeleton variant="text" width="70%" sx={{ bgcolor: 'linear-gradient(135deg,rgb(245, 240, 240) 0%, #fad0c4 100%)', height: 20 }} />
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        ) : factData ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard elevation={0}>
                <CardContent sx={{backgroundColor:"#FBFFDC "}}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#659287' }}>
                    <AutoAwesomeIcon /> DID YOU KNOW?
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#659287' }}>
                    {factData.fun_fact}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard elevation={0} sx={{backgroundColor:"#E9C46A"}}> 
                <CardContent >
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    <MenuBookIcon /> THE STORY BEHIND IT:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {factData.explanation}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard elevation={0}  sx={{backgroundColor:"#E16A54"}}>
                <CardContent>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                    <HelpOutlineIcon /> HOW DO WE KNOW THIS?:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {factData.origin}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard elevation={0}sx={{backgroundColor:"#F09319"}}>
                <CardContent >
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                    <CategoryIcon /> CATEGORY
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {factData.category}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        ) : (
          <StyledCard elevation={0} sx={{backgroundColor:"#FBFFDC" }}>
            <CardContent sx={{ textAlign: 'center', py: 6,}}>
              <Typography variant="body1" sx={{ color: '#A4907C' }}>
                ✨ Click the generate button to discover an amazing fun fact! ✨
              </Typography>
            </CardContent>
          </StyledCard>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FunFactGenerator;
