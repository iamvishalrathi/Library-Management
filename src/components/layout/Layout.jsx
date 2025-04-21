import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default'
        }}>
            <Navbar />
            <Container 
                component="main" 
                sx={{ 
                    mt: 4, 
                    mb: 4,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;