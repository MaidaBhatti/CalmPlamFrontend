import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  SelfImprovement as SelfImprovementIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

function Options() {
  const navigate = useNavigate();

  const options = [
    { 
      name: 'Listen to Music', 
      icon: <MusicNoteIcon fontSize="large" color="primary" />,
      description: 'Calming music to soothe your mind',
      action: () => console.log('Music selected')
    },
    { 
      name: 'Exercise', 
      icon: <FitnessCenterIcon fontSize="large" color="primary" />,
      description: 'Physical activity to boost your mood',
      action: () => console.log('Exercise selected')
    },
    { 
      name: 'Cook', 
      icon: <RestaurantIcon fontSize="large" color="primary" />,
      description: 'Creative cooking to distract and relax',
      action: () => console.log('Cook selected')
    },
    { 
      name: 'Breathing Exercise', 
      icon: <SelfImprovementIcon fontSize="large" color="primary" />,
      description: 'Guided breathing to reduce anxiety',
      action: () => console.log('Breathing selected')
    },
    { 
      name: 'Chat with us', 
      icon: <ChatIcon fontSize="large" color="primary" />,
      description: 'Talk to our mental health assistant',
      action: () => navigate('/chat')
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        How are you feeling today?
      </Typography>
      
      <Grid container spacing={3}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Box sx={{ 
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  {option.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {option.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {option.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={option.action}
                  sx={{ mt: 'auto' }}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Options;