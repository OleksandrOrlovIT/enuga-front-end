import { Box, Typography, useTheme } from "@mui/material";

const TranslationPair = ({ word }) => {
    const theme = useTheme();
    const { WordContainer } = theme;

    return (
        <Box className={WordContainer.styleOverrides.root}>
            <Box
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    border: '1px solid black',
                    padding: '8px',
                }}
            >
                <Typography
                    style={{
                        marginRight: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                >
                    {word.englishWord.word}
                </Typography>
                <Typography
                    style={{
                        fontStyle: 'italic',
                        fontSize: '1.5rem',
                    }}
                >
                    {' - '}
                    {word.ukrainianWord.word}
                </Typography>
            </Box>
        </Box>
    );
};

export default TranslationPair;
