import Layout from "../../layouts/Layout";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "/css/common.css";
import { Head, InertiaLink } from "@inertiajs/inertia-react";
import "../../../css/relation.css";

const InfoTematica = ({}) => {
    return (
        <>
            {/* <Head>
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={relation.alt_nombre + " - Relaciones Geográficas"}
                />
                <meta
                    name="twitter:description"
                    content={
                        relation.alt_nombre +
                        ". Reproducción por cortesía de la Benson Latin America Collection. The General Libraries, The University of Texas Austin (JGI-XXIV-12)."
                    }
                />

                <meta name="og:type" content="article" />
                <meta
                    name="og:url"
                    content={
                        "https://relacionesgeograficas.inah.gob.mx/relaciones-geograficas/" +
                        relation.uuid
                    }
                />
                <meta
                    name="og:title"
                    content={relation.alt_nombre + " - Relaciones Geográficas"}
                />
                <meta
                    name="og:description"
                    content={
                        relation.alt_nombre +
                        ". Reproducción por cortesía de la Benson Latin America Collection. The General Libraries, The University of Texas Austin (JGI-XXIV-12)."
                    }
                />
                <meta
                    name="description"
                    content={
                        relation.alt_nombre +
                        ". Reproducción por cortesía de la Benson Latin America Collection. The General Libraries, The University of Texas Austin (JGI-XXIV-12)."
                    }
                />
                <meta
                    name="og:image"
                    content={
                        "https://relacionesgeograficas.inah.gob.mx/storage/relaciones/" +
                        relation.miniatura
                    }
                />
            </Head> */}
            <Grid container>
                <Grid item xs={12} style={{ backgroundColor: "#193661" }}>
                    <Container maxWidth={"xl"}>
                        <InertiaLink
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "white",
                                width: "max-content",
                            }}
                        >
                            <ArrowBackIosIcon />
                            <p style={{ fontSize: "20px" }}>
                                Extracción de información temática
                            </p>
                        </InertiaLink>
                    </Container>
                </Grid>
            </Grid>
            <Container maxWidth={"xl"} style={{ marginTop: 25 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <iframe
                            src="https://www.adminrgs.dh.inah.gob.mx/entidad/0"
                            style={{ width: "100%", height: "70vh" }}
                            scrolling="no"
                            frameborder="0"
                        ></iframe>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

InfoTematica.layout = (page) => (
    <Layout
        children={page}
        title="Relaciones Geográficas"
        pageTitle="Relaciones Geográficas"
    />
);

export default InfoTematica;
