import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import {Link, useParams} from "react-router-dom";
import api from "../auth/api";
import {Button, Grid} from "@mui/material";
import Words from "../word/Words";
import CustomPair from "./CustomPair";

function WordModule() {
    const { hasRole, user } = useContext(AuthContext);
    const { id } = useParams();
    const [wordModule, setWordModule] = useState(null);
    const [translation, setTranslation] = useState({});
    const [wrongTranslations, setWrongTranslations] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        api.get(`/word-module/${id}`)
            .then(response => {
                setWordModule(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleTranslationChange = (customPairId, translation) => {
        setTranslation(prevAnswers => ({
            ...prevAnswers,
            [customPairId]: translation
        }));
    };

    const handleSubmit = () => {
        const wordModuleAttemptRequest = {
            userId: user.id,
            wordModuleId: id,
            answers: translation
        };

        api.post('/word-module/take', wordModuleAttemptRequest)
            .then(response => {
                setWrongTranslations(response.data.wrongAnswers);
                setSubmitted(true);
            })
            .catch(err => {
                console.error('Error submitting wordModule:', err);
            });
    };

    if (!wordModule) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{wordModule.moduleName}</h1>
            {
                wordModule.customPairs.map((customPair, index) => (
                    <React.Fragment key={index}>
                        <CustomPair
                            customPair={customPair}
                            translation={translation}
                            onTranslationChange={handleTranslationChange}
                            submitted={submitted}
                            isWrong={wrongTranslations.hasOwnProperty(customPair.id)}
                        />
                    </React.Fragment>
                ))
            }
            <Grid container justifyContent="left" style={{ marginTop: '20px', marginRight: '400px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: '1.0rem', padding: '10px 20px' }}
                    onClick={handleSubmit}
                >
                    <Words text="Submit word module" />
                </Button>
            </Grid>
            {(wordModule.userId === user.id || hasRole("ROLE_ADMIN")) &&
                <Grid container justifyContent="right" style={{ marginTop: '20px', marginRight: '400px' }}>
                    <Link to={`/word-modules/update/${wordModule.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '1.0rem', padding: '10px 20px' }}>
                            <Words text="Edit word module" />
                        </Button>
                    </Link>
                </Grid>
            }
        </div>
    );
}

export default WordModule;