import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

function TranslationTable({data}) {
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TranslationTable;