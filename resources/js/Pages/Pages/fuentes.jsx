import Layout from "../../layouts/Layout";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "/css/creditos.css";
import "/css/common.css";
import { Typography } from "@mui/material";

const Fuentes = ({ fuentes }) => {
    return (
        <div className={"body-creditos"}>
            <Container
                maxWidth={"xl"}
                style={{ paddingTop: "40px", paddingBottom: "50px" }}
            >
                <Grid container justifyContent="space-between">
                    <Grid item xs={12}>
                        <p className="big-text">Fuentes</p>
                        <Typography style={{whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis'}}>
                            {fuentes || 'Sin fuentes'}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Fuentes.layout = (page) => (
    <Layout children={page} title="Fuentes" pageTitle="Fuentes" />
);

export default Fuentes;
