import { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Avatar,
  CircularProgress,
  Button
} from '@mui/material';
import AuthContext from '../contexts/AuthContext';
import userService from '../services/user.service';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getProfile();
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4">
          Welcome, {userData?.username || 'User'}!
        </Typography>
        <Button
          color="error"
          variant="outlined"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 3
              }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main',
                    mr: 3,
                    fontSize: '2rem'
                  }}
                >
                  {userData?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {userData?.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData?.email}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Personal Information
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2
              }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1">
                    {userData?.age || 'Not specified'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1">
                    {userData?.gender || 'Not specified'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Height
                  </Typography>
                  <Typography variant="body1">
                    {userData?.height ? `${userData.height} cm` : 'Not specified'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="body1">
                    {userData?.weight ? `${userData.weight} kg` : 'Not specified'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Stats Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Statistics
              </Typography>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Sleep Time
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        {userData?.sleepTime ? `${userData.sleepTime} hours` : 'Not tracked'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Therapy Type
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        {userData?.therapyType || 'Not specified'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Medication
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        {userData?.medication || 'None'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Financial Status
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        {userData?.financialStatus || 'Not specified'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;