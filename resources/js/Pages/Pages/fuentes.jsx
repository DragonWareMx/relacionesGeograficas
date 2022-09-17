import Layout from "../../layouts/Layout";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "/css/creditos.css";
import "/css/common.css";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { InertiaLink, Head } from "@inertiajs/inertia-react";

const Fuentes = ({ idDS, api, uuid }) => {
    const [fuentes, setFuentes] = useState(null);
    useEffect(() => {
        axios
            .get(api.url + `relaciones/` + idDS)
            .then((response) => {
                setFuentes(response.data);
                console.log("LAS FUENTES: ", response);
            })
            .catch((error) => {});
    }, []);

    return (
        <div className={"body-creditos"}>
            <Head>
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Relaciones Geográficas de la Nueva España - Fuentes"
                />
                <meta
                    name="twitter:description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />

                <meta name="og:type" content="article" />
                <meta
                    name="og:url"
                    content="https://relacionesgeograficas.inah.gob.mx"
                />
                <meta
                    name="og:title"
                    content="Relaciones Geográficas de la Nueva España - Fuentes"
                />
                <meta
                    name="og:description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />
                <meta
                    name="description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />
                <meta
                    name="og:image"
                    content="https://relacionesgeograficas.inah.gob.mx/img/assets/asset1.png"
                />
            </Head>
            <Container
                maxWidth={"xl"}
                style={{ paddingTop: "40px", paddingBottom: "50px" }}
            >
                <Grid container justifyContent="space-between">
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <InertiaLink href={route("relations.index", uuid)}>
                                <ArrowBackIcon
                                    style={{
                                        color: "white",
                                        marginRight: 10,
                                        marginTop: 4,
                                    }}
                                />
                            </InertiaLink>
                            <Typography variant="h5">Fuentes</Typography>
                        </Grid>
                        <Typography
                            style={{
                                whiteSpace: "pre-line",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {/* {fuentes || 'Sin fuentes'} */}
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
