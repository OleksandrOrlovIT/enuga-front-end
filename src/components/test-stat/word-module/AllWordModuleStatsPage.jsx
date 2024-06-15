import {useParams} from "react-router-dom";
import {Box, Container, Paper} from "@mui/material";
import LastWordModuleAttemptsList from "./LastWordModuleAttemptsList";

const AllWordModuleStatsPage = () => {
    const { pageNumber } = useParams();
    const pageNum = parseInt(pageNumber, 10);

    return (
        <Container maxWidth="lg">
            <Box mt={4} display="flex" justifyContent="center">
                <Paper elevation={3} style={{ padding: '20px', flex: '1 0 100%', display: 'flex', flexDirection: 'column' }}>
                    <LastWordModuleAttemptsList pageSize={5} pageNumber={pageNum} isMinimized={false} />
                </Paper>
            </Box>
        </Container>
    );
};

export default AllWordModuleStatsPage;