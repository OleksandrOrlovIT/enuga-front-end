import React, {useContext} from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Button
} from '@mui/material';
import api from "../auth/api";
import {AuthContext} from "../auth/AuthContext";

function TranslationTable({data}) {
    const {hasRole} = useContext(AuthContext);

    const handleButtonClick = async (pairId) => {
        try {
            await api.delete(`/translation-pair/${pairId}`);
        } catch (error) {
            console.error('Error deleting translation pair:', error);
        } finally {
            window.location.reload();
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head" sx={{fontWeight: 'bold', fontSize: '24px'}}>English
                                Word</TableCell>
                            <TableCell variant="head" sx={{fontWeight: 'bold', fontSize: '24px'}}>Ukrainian
                                Word</TableCell>
                            {hasRole("ROLE_ENGLISH_TEACHER_USER") &&
                                <TableCell variant="head" sx={{fontWeight: 'bold', fontSize: '24px'}}>Delete</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.content.map((pair) => (
                            <TableRow key={pair.id}>
                                <TableCell>
                                    <Typography>
                                        {pair.englishWord.word}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {pair.ukrainianWord.word}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {hasRole("ROLE_ENGLISH_TEACHER_USER") &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleButtonClick(pair.id)}
                                        >
                                            Delete
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TranslationTable;