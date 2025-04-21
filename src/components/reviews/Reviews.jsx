import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Rating,
    TextField,
    Button,
    Avatar,
    Divider,
} from '@mui/material';

const MOCK_REVIEWS = [
    {
        id: 1,
        bookTitle: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        userName: 'John Doe',
        rating: 4.5,
        comment: 'A masterpiece of American literature. The prose is beautiful and the story is captivating.',
        date: '2024-01-15',
    },
    {
        id: 2,
        bookTitle: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'One of the most important American novels ever written. The themes are still relevant today.',
        date: '2024-01-10',
    },
];

const ReviewCard = ({ review }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {review.bookTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {review.author}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                        {review.userName.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2">{review.userName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(review.date).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={review.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {review.rating}
                    </Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
            </CardContent>
        </Card>
    );
};

const AddReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle review submission
        console.log({ rating, comment });
        // Reset form
        setRating(0);
        setComment('');
    };

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Add a Review
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            precision={0.5}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!rating || !comment.trim()}
                    >
                        Submit Review
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const Reviews = () => {
    const [reviews] = useState(MOCK_REVIEWS);

    return (
        <Container>
            <AddReviewForm />
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={3}>
                {reviews.map(review => (
                    <Grid item key={review.id} xs={12} sm={6} md={4}>
                        <ReviewCard review={review} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Reviews;