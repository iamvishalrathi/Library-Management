import { useState } from 'react';
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton, 
    Typography, 
    Menu, 
    Container, 
    Avatar, 
    Button, 
    MenuItem, 
    Switch, 
    FormControlLabel,
    Divider
} from '@mui/material';
import { Menu as MenuIcon, LocalLibrary as LibraryIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Books', 'My Rentals', 'Reviews'];
const adminPages = ['Manage Books', 'Track Rentals', 'Notifications'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigation = (page) => {
        const path = page.toLowerCase().replace(' ', '-');
        navigate(`/${path}`);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="sticky" elevation={2} sx={{ bgcolor: 'primary.main' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 70 } }}>
                    {/* Desktop Logo */}
                    <LibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 4,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            alignItems: 'center'
                        }}
                    >
                        Library Management
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ p: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                mt: 1
                            }}
                        >
                            {(isAdmin ? adminPages : pages).map((page) => (
                                <MenuItem 
                                    key={page} 
                                    onClick={() => handleNavigation(page)}
                                    sx={{ minWidth: 200 }}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile Logo */}
                    <LibraryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Library
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {(isAdmin ? adminPages : pages).map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleNavigation(page)}
                                sx={{
                                    color: 'white',
                                    px: 2,
                                    py: 1,
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* User Controls */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 1, md: 2 }
                    }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    color="secondary"
                                    size="small"
                                />
                            }
                            label={
                                <Typography 
                                    color="white" 
                                    sx={{ 
                                        fontSize: { xs: '0.8rem', md: '1rem' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    Admin
                                </Typography>
                            }
                        />
                        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'primary.light', opacity: 0.5 }} />
                        <IconButton sx={{ p: 0 }}>
                            <Avatar 
                                alt="User" 
                                sx={{ 
                                    width: { xs: 32, md: 40 }, 
                                    height: { xs: 32, md: 40 },
                                    bgcolor: 'secondary.main'
                                }} 
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;