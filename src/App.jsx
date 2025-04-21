import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider, createTheme, Box, Typography, Button } from '@mui/material';
import Books from './components/books/Books';
import MyRentals from './components/rentals/MyRentals';
import Reviews from './components/reviews/Reviews';
import ManageBooks from './components/admin/ManageBooks';
import TrackRentals from './components/admin/TrackRentals';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* User Routes */}
            <Route index element={
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                    borderRadius: 2,
                    color: 'white'
                }}>
                    <Typography variant="h3" gutterBottom>
                        Welcome to Library Management System
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Discover, Read, and Manage Your Books
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        component={Link} 
                        to="/books"
                        sx={{ 
                            px: 4, 
                            py: 1.5,
                            fontSize: '1.1rem'
                        }}
                    >
                        Browse Books
                    </Button>
                </Box>
            } />
            <Route path="books" element={<Books />} />
            <Route path="my-rentals" element={<MyRentals />} />
            <Route path="reviews" element={<Reviews />} />

            {/* Admin Routes */}
            <Route path="manage-books" element={<ManageBooks />} />
            <Route path="track-rentals" element={<TrackRentals />} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
