import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            <Navbar />
            <Container 
                maxWidth={false}
                component="main" 
                sx={{ 
                    mt: 4, 
                    mb: 4,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 2, sm: 3, md: 4 },
                    width: '100%'
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;