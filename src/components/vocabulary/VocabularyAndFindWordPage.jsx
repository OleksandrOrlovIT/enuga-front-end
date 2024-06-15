import React from 'react';
import CustomCard from "../common/CustomCard";
import {Container, Grid} from "@mui/material";

function VocabularyAndFindWordPage() {
    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item key={1}>
                    <CustomCard heading={"Vocabulary"} linkToGet={"/vocabulary/1"}/>
                </Grid>
                <Grid item key={2}>
                    <CustomCard heading={"Translate English Word"} linkToGet={"/translate-eng/"}/>
                </Grid>
                <Grid item key={3}>
                    <CustomCard heading={"Translate Ukrainian Word"} linkToGet={"/translate-ukr/"}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default VocabularyAndFindWordPage;
