import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        white: createColor('#FFFFFF'),
    },
});

export default theme;