import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        white: {
            main: '#FFFFFF'
        },
    },
    root: {
        margin: '16px',
    },
    input: {
        marginTop: '8px',
    },
    WordContainer: {
        styleOverrides: {
            root: {
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                marginBottom: '8px',
            },
        },
    },
    EnglishWord: {
        styleOverrides: {
            root: {
                marginRight: '8px',
                fontWeight: 'bold',
            },
        },
    },
    UkrainianWord: {
        styleOverrides: {
            root: {
                fontStyle: 'italic',
            },
        },
    },
});

export default theme;