import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#22C55E',
            main: '#4B9B62',
        },
        secondary: {
            light: '#34313F',
            main: "#292633",
        },
        error: {
            main: '#f2183c',
        },
        warning: {
            main: '#eab308',
        },
        info: {
            main: '#98c0e2',

        },
        success: {
            main: '#17c45c',
        },
        accent: {
            main: '#d18917'
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '1rem',
        },
        p: {
            fontSize: '0.75rem'
        }
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
                containedPrimary: {
                    backgroundColor: '#22C55E',
                    '&:hover': {
                        backgroundColor: '#1C9A55',
                    },
                },
            },
        },
    },
});

export default theme;