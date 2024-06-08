import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

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
    }
});

export default theme;