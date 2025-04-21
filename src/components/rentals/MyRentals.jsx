import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Tab,
    Tabs,
} from '@mui/material';

const MOCK_RENTALS = [
    {
        id: 1,
        bookTitle: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        rentDate: '2024-01-01',
        dueDate: '2024-02-01',
        status: 'active',
    },
    {
        id: 2,
        bookTitle: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        rentDate: '2023-12-01',
        dueDate: '2023-12-31',
        status: 'returned',
    },
];

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const RentalCard = ({ rental }) => {
    const isActive = rental.status === 'active';
    const dueDate = new Date(rental.dueDate);
    const today = new Date();
    const isOverdue = isActive && dueDate < today;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {rental.bookTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {rental.author}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Rent Date: {new Date(rental.rentDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Due Date: {new Date(rental.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip
                        label={rental.status === 'active' ? 'Active' : 'Returned'}
                        color={rental.status === 'active' ? 'primary' : 'default'}
                        size="small"
                    />
                    {isOverdue && (
                        <Chip
                            label="Overdue"
                            color="error"
                            size="small"
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

const MyRentals = () => {
    const [rentals] = useState(MOCK_RENTALS);
    const [tabValue, setTabValue] = useState(0);

    const activeRentals = rentals.filter(rental => rental.status === 'active');
    const rentalHistory = rentals.filter(rental => rental.status === 'returned');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Active Rentals" />
                    <Tab label="Rental History" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                    {activeRentals.map(rental => (
                        <Grid item key={rental.id} xs={12} sm={6} md={4}>
                            <RentalCard rental={rental} />
                        </Grid>
                    ))}
                    {activeRentals.length === 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="text.secondary" textAlign="center">
                                No active rentals
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                    {rentalHistory.map(rental => (
                        <Grid item key={rental.id} xs={12} sm={6} md={4}>
                            <RentalCard rental={rental} />
                        </Grid>
                    ))}
                    {rentalHistory.length === 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="text.secondary" textAlign="center">
                                No rental history
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
        </Container>
    );
};

export default MyRentals;