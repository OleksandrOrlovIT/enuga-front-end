import React from 'react';
import CustomCard from "../common/CustomCard";
import {Container, Grid} from "@mui/material";

function VocabularyAndFindWordPage() {
    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item key={1}>
                    <CustomCard heading={"Vocabulary"} linkTo={"/vocabulary/1"}/>
                </Grid>
                <Grid item key={2}>
                    <CustomCard heading={"Translate English Word"} linkTo={"/translate-eng/"}/>
                </Grid>
                <Grid item key={3}>
                    <CustomCard heading={"Translate Ukrainian Word"} linkTo={"/translate-ukr/"}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default VocabularyAndFindWordPage;
