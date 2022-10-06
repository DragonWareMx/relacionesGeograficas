import Layout from "../../layouts/Layout";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { InertiaLink } from "@inertiajs/inertia-react";
import "/css/common.css";
import "/css/carousel.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Head } from "@inertiajs/inertia-react";

/** Leaflet Imports **/
import L from "leaflet";
import {
    MapContainer,
    Marker,
    TileLayer,
    Circle,
    CircleMarker,
    Polyline,
    Polygon,
    Rectangle,
    Popup,
    Tooltip,
    GeoJSON,
    LayerGroup,
    LayersControl,
    ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

/** Axios Imports **/
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";

function showAlfa() {
    document.getElementById("mapa").style.display = "none";
    document.getElementById("alfabetico").style.display = "block";
    document.getElementById("btn-mapa").style.border = "5px solid white";
    document.getElementById("btn-alfa").style.border = "5px solid #f37946";
}
function showMapa() {
    document.getElementById("mapa").style.display = "block";
    document.getElementById("alfabetico").style.display = "none";
    document.getElementById("btn-mapa").style.border = "5px solid #f37946";
    document.getElementById("btn-alfa").style.border = "5px solid white";
}
function limitChar(nombre) {
    return nombre.substring(0, 61);
}

const Home = ({ relaciones, banners, api }) => {
    let locationSearch = window.location.search;
    let params = new URLSearchParams(locationSearch);
    let search = params.get("search");

    useEffect(() => {
        if (search) {
            showAlfa();
        }
    }, []);

    const [data, setData] = useState({
        infoMapa: {
            centro: {
                lat: "20.0853643565",
                long: "-98.76998",
            },
            limites: {
                visible: false,
                nE: {
                    lat: null,
                    long: null,
                },
                nO: {
                    lat: null,
                    long: null,
                },
                sE: {
                    lat: null,
                    long: null,
                },
                sO: {
                    lat: null,
                    long: null,
                },
            },
            zoom: {
                max: 12,
                min: 0,
                inicial: 4,
            },
            mapasBase: {
                0: {
                    nombre: "INEGI",
                    atribution: "INEGI",
                    link: "http://172.16.4.115/inegi50k/{z}/{x}/{y}.png",
                },
                1: {
                    nombre: "ESRI",
                    atribution: "ESRI",
                    link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
                },
                2: {
                    nombre: "GOOGLE",
                    atribution: "GOOGLE",
                    link: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga",
                },
            },
        },
        capas: null,
    });

    useEffect(() => {
        console.log("EL AXIOS");
        axios
            .get(api.url + `relaciones`)
            .then((response) => {
                let new_data = data;
                new_data.capas = response.data;
                setData({ ...data, new_data });
                console.log(response.data, new_data);
            })
            .catch((error) => {});
    }, []);

    /** Leaflet Consts and Functions **/
    const { BaseLayer, Overlay } = LayersControl;

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const styleMap = { width: "100%", height: "800px" };

    function getCoords(coord) {
        return L.latLng(coord.long, coord.lat);
    }

    return (
        <>
            <Head>
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Relaciones Geográficas de la Nueva España"
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
                    content="Relaciones Geográficas de la Nueva España"
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
            {/* CAROUSEL */}
            <Box component={"section"} sx={{ backgroundColor: "#193661" }}>
                <Container maxWidth="xl">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        navigation={false}
                        pagination={{ dynamicBullets: true, clickable: true }}
                        mousewheel={false}
                        keyboard={true}
                        modules={[Pagination, Mousewheel, Keyboard]}
                        className="oski-swiper"
                        loop={true}
                    >
                        {banners &&
                            banners.length > 0 &&
                            banners.map((banner, index) => (
                                <SwiperSlide key={index + "swiper"}>
                                    <div className="oski-carousel-element">
                                        <img
                                            src={
                                                "/storage/relaciones/" +
                                                banner.banner
                                            }
                                            className="oski-carousel-img"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </Container>
            </Box>

            {/* CONTENT */}
            <Container sx={{ pt: 5, paddingBottom: 5 }}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            paddingRight: {
                                sm: 3,
                            },
                        }}
                    >
                        <Typography align="justify">
                            Este proyecto describe la metodología y los primeros
                            resultados del proyecto Explorando el México
                            Colonial Temprano: Un análisis computacional a gran
                            escala de fuentes históricas del siglo XVI. Como el
                            título sugiere, el objetivo es desarrollar métodos y
                            herramientas computacionales que faciliten la
                            extracción de datos histórico-geográficos de manera
                            automática para responder preguntas acerca de la
                            sociedad novohispana.
                            <br />
                            <br />
                            La investigación utiliza como fuente principal el
                            conjunto de documentos conocido como Relaciones
                            Geográficas de la Nueva España, específicamente los
                            reportes redactados entre 1577 y 1585 en varias
                            provincias de México y Guatemala por orden del rey
                            Felipe II. Estos informes describen cómo eran la
                            organización territorial y el modo de vida de los
                            habitantes de Nueva España seis décadas después de
                            consumada la conquista de México-Tenochtitlan.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src="/img/assets/asset1.png" />
                    </Grid>
                </Grid>

                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row-reverse"
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            paddingLeft: {
                                sm: 3,
                            },
                        }}
                    >
                        <Typography align="justify">
                            Las Relaciones se componen de textos y mapas en cuya
                            elaboración participaron informantes indígenas y
                            oficiales españoles. Debido a la riqueza y variedad
                            del contenido, el corpus constituye una de las
                            fuentes más importantes para analizar la historia,
                            la geografía, las jurisdicciones administrativas, la
                            cultura, la religión, la economía, la interacción
                            social y los procesos de transculturación que
                            afectaron a las comunidades nativas y a los
                            colonizadores.
                            <br />
                            <br />
                            Otra aportación del proyecto es la compilación de un
                            directorio de nombres geográficos del siglo XVI, el
                            cual provee las coordenadas geográficas de cerca de
                            4000 topónimos, acompañadas de otros rubros de
                            información temática extraída de los documentos (lo
                            que en inglés se denomina gazetteer). Una tercera
                            contribución es la conversión del corpus de las
                            Relaciones Geográficas del medio analógico a un
                            formato legible por computadora. Esta versión
                            digital estará disponible en distintas plataformas
                            gracias a la tecnología de datos vinculados (i.e.
                            linked data) para que pueda ser reutilizada por
                            otros equipos de investigación.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img
                            src="/img/assets/asset2.png"
                            style={{ width: "60%" }}
                        />
                    </Grid>
                </Grid>

                <Grid
                    container
                    alignItems="flex-end"
                    justifyContent="space-between"
                    direction="row-reverse"
                >
                    <InertiaLink href="#!">
                        <img
                            style={{ width: "250px" }}
                            src="/img/assets/btn1.PNG"
                        />
                    </InertiaLink>
                </Grid>
            </Container>

            {/* MAP */}
            <Grid
                container
                justifyContent="center"
                spacing={2}
                alignItems="center"
                style={{ backgroundColor: "#475e80", padding: "10px" }}
            >
                <Grid xs={12}>
                    <Typography align="center" style={{ color: "white" }}>
                        Puedes consultar las relaciones geográficas por medio de
                        las dos opciones siguientes:
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={2} style={{ paddingTop: "0px" }}>
                    {/* <Button variant="outlined" sx={{}}>
                    MAPA
                </Button> */}
                    <Paper
                        id="btn-mapa"
                        className="btn-op"
                        onClick={showMapa}
                        style={{ border: "5px solid #f37946" }}
                    >
                        MAPA
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={4}
                    md={2}
                    style={{ paddingTop: "0px" }}
                    id="alfabetico2"
                >
                    <Paper id="btn-alfa" className="btn-op" onClick={showAlfa}>
                        LISTA
                    </Paper>
                </Grid>
            </Grid>

            {/* APARTADO DE MAPA LEAFLET */}
            <Container
                maxWidth="false"
                sx={{ maxWidth: "90%", border: "10px solid white" }}
            >
                <MapContainer
                    id="mapa"
                    style={styleMap}
                    center={L.latLng(
                        data.infoMapa.centro.lat,
                        data.infoMapa.centro.long
                    )}
                    zoom={5}
                    minZoom={5}
                    maxZoom={10}
                >
                    <LayersControl position="topleft" collapsed={false}>
                        {data && Object.values(data.infoMapa.mapasBase) ? (
                            Object.values(data.infoMapa.mapasBase).map(
                                (mapa, index) => (
                                    <BaseLayer
                                        checked={index === 0}
                                        name={mapa.nombre}
                                        key={index + "baselayer"}
                                    >
                                        <TileLayer
                                            attribution={
                                                '&copy; <a href="http://osm.org/copyright">' +
                                                mapa.nombre +
                                                "</a> contributors"
                                            }
                                            url={mapa.link}
                                        />
                                    </BaseLayer>
                                )
                            )
                        ) : (
                            <BaseLayer checked name="ESRI Satellite">
                                <TileLayer
                                    attribution={
                                        '&copy; <a href="http://osm.org/copyright">ESRI Satellite</a> contributors'
                                    }
                                    url={
                                        "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga"
                                    }
                                />
                            </BaseLayer>
                        )}
                        <LayerGroup>
                            {data.capas !== null && data.capas.length > 0
                                ? data.capas.map((item, i) => {
                                      return (
                                          <CircleMarker
                                              key={item.idDS + "layergroup"}
                                              center={L.latLng(item.Y, item.X)}
                                              radius={5}
                                              color={"white"}
                                              onClick={(e) => {
                                                  console.log("click");
                                              }}
                                              eventHandlers={{
                                                  click: (e) => {
                                                      Inertia.get(
                                                          route(
                                                              "fromapi",
                                                              item.idDS
                                                          )
                                                      );
                                                  },
                                              }}
                                          >
                                              <Tooltip>{item.cNombre}</Tooltip>
                                          </CircleMarker>
                                      );
                                  })
                                : ""}
                        </LayerGroup>

                        <ScaleControl
                            position="bottomright"
                            metric={true}
                            imperial={true}
                        />
                    </LayersControl>
                </MapContainer>
            </Container>

            {/* APARTADO DE TODAS LAS RELACIONES */}
            <Container
                id="alfabetico"
                style={{
                    paddingTop: "60px",
                    paddingBottom: "30px",
                    display: "none",
                }}
            >
                <Grid container alignItems="stretch">
                    {relaciones && relaciones.length > 0 ? (
                        relaciones.map((rel, index) => (
                            <Grid
                                item
                                xs={4}
                                sm={12 / 5}
                                md={12 / 7}
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    padding: "0px",
                                    marginBottom: "35px",
                                }}
                            >
                                {/* Agregar el uuid de la relacion */}
                                <InertiaLink
                                    href={route("relations.index", rel.uuid)}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Avatar
                                        alt={rel.alt_nombre}
                                        src={
                                            "/storage/relaciones/" +
                                            rel.miniatura
                                        }
                                        sx={{ width: 90, height: 90 }}
                                    />
                                    <p className="circle-name">
                                        {limitChar(rel.alt_nombre)}
                                    </p>
                                </InertiaLink>
                            </Grid>
                        ))
                    ) : (
                        <Grid>
                            No se encontraron resultados, intentalo más tarde.
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
};

Home.layout = (page) => (
    <Layout
        children={page}
        title="Relaciones Geográficas"
        pageTitle="Relaciones Geográficas"
    />
);

export default Home;
