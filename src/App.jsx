import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider, createTheme } from '@mui/material';
import Books from './components/books/Books';
import MyRentals from './components/rentals/MyRentals';
import Reviews from './components/reviews/Reviews';
import ManageBooks from './components/admin/ManageBooks';
import TrackRentals from './components/admin/TrackRentals';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
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
            <Route index element={<div>Welcome to Library Management System</div>} />
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
