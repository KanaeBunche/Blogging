import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6F4C3E', // Brown
        },
        secondary: {
            main: '#C4B6A6', // Beige
        },
        accent: {
            main: '#FF6F61', // Coral
        },
        background: {
            default: '#FAF3E0', // Off-White
        },
    },
    typography: {
        fontFamily: '"Time New Roman", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#6F4C3E',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#333333',
        },
        caption: {
            fontSize: '0.875rem',
            color: '#999999',
        },
    },
});

export default theme;
