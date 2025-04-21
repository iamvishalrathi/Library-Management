import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const MOCK_BOOKS = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        publication: 'Scribner',
        price: 9.99,
        stock: 5,
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        publication: 'Grand Central Publishing',
        price: 12.99,
        stock: 3,
    },
];

const BookForm = ({ book, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(book || {
        title: '',
        author: '',
        category: '',
        publication: '',
        price: '',
        stock: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Publication"
                            name="publication"
                            value={formData.publication}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                    {book ? 'Update' : 'Add'} Book
                </Button>
            </DialogActions>
        </form>
    );
};

const ManageBooks = () => {
    const [books, setBooks] = useState(MOCK_BOOKS);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleAddBook = (bookData) => {
        const newBook = {
            ...bookData,
            id: books.length + 1,
        };
        setBooks([...books, newBook]);
        setOpenDialog(false);
    };

    const handleUpdateBook = (bookData) => {
        setBooks(books.map(book =>
            book.id === bookData.id ? bookData : book
        ));
        setOpenDialog(false);
        setSelectedBook(null);
    };

    const handleDeleteBook = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId));
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setOpenDialog(true);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Manage Books</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Add Book
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Publication</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>{book.publication}</TableCell>
                                <TableCell>${book.price}</TableCell>
                                <TableCell>{book.stock}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEdit(book)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteBook(book.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedBook(null);
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {selectedBook ? 'Edit Book' : 'Add New Book'}
                </DialogTitle>
                <BookForm
                    book={selectedBook}
                    onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
                    onClose={() => {
                        setOpenDialog(false);
                        setSelectedBook(null);
                    }}
                />
            </Dialog>
        </Container>
    );
};

export default ManageBooks;