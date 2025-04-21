import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Rating,
    Button,
    Chip,
} from '@mui/material';

const MOCK_BOOKS = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        publication: 'Scribner',
        rating: 4.5,
        available: true,
        image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
        price: 9.99,
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        publication: 'Grand Central Publishing',
        rating: 4.8,
        available: true,
        image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
        price: 12.99,
    },
    {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        category: 'Science Fiction',
        publication: 'Penguin Books',
        rating: 4.7,
        available: true,
        image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
        price: 11.99,
    },
];

const Books = () => {
    const [books] = useState(MOCK_BOOKS);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [author, setAuthor] = useState('all');
    const [publication, setPublication] = useState('all');

    // Get unique values for filters
    const categories = ['all', ...new Set(MOCK_BOOKS.map(book => book.category))];
    const authors = ['all', ...new Set(MOCK_BOOKS.map(book => book.author))];
    const publications = ['all', ...new Set(MOCK_BOOKS.map(book => book.publication))];

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || book.category === category;
        const matchesAuthor = author === 'all' || book.author === author;
        const matchesPublication = publication === 'all' || book.publication === publication;

        return matchesSearch && matchesCategory && matchesAuthor && matchesPublication;
    });

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Search Books"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Author</InputLabel>
                            <Select
                                value={author}
                                label="Author"
                                onChange={(e) => setAuthor(e.target.value)}
                            >
                                {authors.map(auth => (
                                    <MenuItem key={auth} value={auth}>{auth}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Publication</InputLabel>
                            <Select
                                value={publication}
                                label="Publication"
                                onChange={(e) => setPublication(e.target.value)}
                            >
                                {publications.map(pub => (
                                    <MenuItem key={pub} value={pub}>{pub}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {filteredBooks.map(book => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'visible'
                        }}>
                            <CardMedia
                                component="img"
                                height="280"
                                image={book.image}
                                alt={book.title}
                                sx={{
                                    objectFit: 'cover',
                                    borderRadius: '4px 4px 0 0'
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    by {book.author}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Rating value={book.rating} precision={0.5} readOnly size="small" />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        {book.rating}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                    ${book.price}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Chip
                                        label={book.available ? 'Available' : 'Rented'}
                                        color={book.available ? 'success' : 'error'}
                                        size="small"
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    disabled={!book.available}
                                >
                                    {book.available ? 'Rent Now' : 'Not Available'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Books;