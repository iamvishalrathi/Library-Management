import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

const MOCK_RENTALS = [
    {
        id: 1,
        bookTitle: 'The Great Gatsby',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        rentDate: '2024-01-01',
        dueDate: '2024-02-01',
        status: 'active',
    },
    {
        id: 2,
        bookTitle: 'To Kill a Mockingbird',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        rentDate: '2023-12-01',
        dueDate: '2023-12-31',
        status: 'returned',
    },
];

const NotificationDialog = ({ open, onClose, rental }) => {
    const [message, setMessage] = useState(
        `Dear ${rental?.userName},\n\nThis is a reminder that the book "${rental?.bookTitle}" is due to be returned by ${new Date(rental?.dueDate).toLocaleDateString()}.\n\nBest regards,\nLibrary Management Team`
    );

    const handleSend = () => {
        // Handle sending notification
        console.log('Sending notification:', { rental, message });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSend} variant="contained">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const TrackRentals = () => {
    const [rentals] = useState(MOCK_RENTALS);
    const [selectedRental, setSelectedRental] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);

    const handleSendNotification = (rental) => {
        setSelectedRental(rental);
        setOpenNotification(true);
    };

    const getStatusColor = (status, dueDate) => {
        if (status === 'returned') return 'default';
        const isOverdue = new Date(dueDate) < new Date();
        return isOverdue ? 'error' : 'success';
    };

    return (
        <Container>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Track Rentals
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Title</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Rent Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentals.map((rental) => {
                            const statusColor = getStatusColor(rental.status, rental.dueDate);
                            return (
                                <TableRow key={rental.id}>
                                    <TableCell>{rental.bookTitle}</TableCell>
                                    <TableCell>
                                        <Box>
                                            {rental.userName}
                                            <Typography variant="caption" display="block" color="text.secondary">
                                                {rental.userEmail}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{new Date(rental.rentDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(rental.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={rental.status === 'active' ? 'Active' : 'Returned'}
                                            color={statusColor}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleSendNotification(rental)}
                                            disabled={rental.status !== 'active'}
                                        >
                                            <EmailIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <NotificationDialog
                open={openNotification}
                onClose={() => {
                    setOpenNotification(false);
                    setSelectedRental(null);
                }}
                rental={selectedRental}
            />
        </Container>
    );
};

export default TrackRentals;