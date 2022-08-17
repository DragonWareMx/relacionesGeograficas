import Layout from "../../layouts/Layout";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "/css/common.css";
import { InertiaLink } from "@inertiajs/inertia-react";
import "../../../css/relation.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

//iconos
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SwiperCore, { Navigation, Virtual, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Translate } from "@mui/icons-material";

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
import { Typography } from "@mui/material";

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const ColorButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "#4D7DB3",
    "&:hover": {
        backgroundColor: "#4D7DB3",
    },
    borderRadius: 0,
    padding: "20px 40px",
    fontFamily: "Nunito",
}));

const TranslateButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.8)",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    borderRadius: 0,
    padding: "10px 40px",
    fontFamily: "Nunito",
}));

const TranslateButtonActive = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.8)",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    borderRadius: 0,
    padding: "10px 40px",
    fontFamily: "Nunito",
    border: "6px solid #F25E0D",
}));

const Relacion = ({ relation }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`https://decm.arqueodata.com/api/v1/mapa/` + relation.idDS)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, []);

    function toggleDrawer() {
        setOpen(!open);
    }

    const [contMap, setContMap] = useState("geo");

    const [folioActive, setFolioActive] = useState(null);
    const [textActive, setTextActive] = useState(null);
    const [activeTranslate, setActiveTranslate] = useState(0);

    async function changeFolio(invoice, index) {
        setContMap("lienzo");
        setFolioActive(invoice);
        if (invoice.transcriptions && invoice.transcriptions.length > 0) {
            setTextActive(invoice.transcriptions[0].texto);
            setActiveTranslate(0);
        } else {
            setTextActive(null);
            setActiveTranslate(0);
        }
        setOpen(false);
        setIdActive(index);
    }

    async function changeText(text, index) {
        setTextActive(text);
        setActiveTranslate(index);
    }

    const [idActive, setIdActive] = useState(0);

    /** Leaflet **/
    const { BaseLayer, Overlay } = LayersControl;

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const styleMap = { width: "100%", height: "600px" };

    function getCoords(coord) {
        return L.latLng(coord.long, coord.lat);
    }

    const refContainer = useRef(null);
    const refImg = useRef(null);
    const [width, setWidth] = useState(0);
    const [ready, setReady] = useState(true);

    const setImageSize = () => {
        const img = new Image();
        img.src =
            relation.maps && relation.maps.length > 0
                ? "/storage/relaciones/" + relation.maps[idActive].imagen
                : "";

        img.onload = () => {
            let height = img.height;
            let width = img.width;
            let newWidth = width * 600;
            newWidth = newWidth / height;
            let container = refContainer.current?.offsetWidth;
            newWidth = newWidth / 2;
            container = container / 2;
            setWidth(container - newWidth);
            setReady(false);
            setReady(true);
        };
    };

    return (
        <>
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
                                {relation.alt_nombre}
                            </p>
                        </InertiaLink>
                    </Container>
                </Grid>
            </Grid>
            <Container maxWidth={"xl"}>
                <div
                    className={
                        contMap === "lienzo"
                            ? "map-container grid-lienzo"
                            : "map-container"
                    }
                >
                    {contMap === "geo" && data !== null && (
                        <div>
                            <MapContainer
                                style={styleMap}
                                center={L.latLng(
                                    data.infoMapa.centro.lat,
                                    data.infoMapa.centro.long
                                )}
                                // zoom={data.infoMapa.zoom.inicial}
                                // minZoom={data.infoMapa.zoom.min}
                                // maxZoom={data.infoMapa.zoom.max}
                                zoom={(data && data.infoMapa && data.infoMapa.zoom && data.infoMapa.zoom.inicial && (data.infoMapa.zoom.inicial < data.infoMapa.zoom.max) && (data.infoMapa.zoom.inicial > data.infoMapa.zoom.min)) ? data.infoMapa.zoom.inicial : 5}
                                minZoom={(data && data.infoMapa && data.infoMapa.zoom && data.infoMapa.zoom.max && data.infoMapa.zoom.min && (data.infoMapa.zoom.min < data.infoMapa.zoom.max)) ? data.infoMapa.zoom.min : (data?.infoMapa?.zoom?.inicial ?? 5)}
                                maxZoom={(data && data.infoMapa && data.infoMapa.zoom && data.infoMapa.zoom.max && data.infoMapa.zoom.min && (data.infoMapa.zoom.max > data.infoMapa.zoom.min)) ? data.infoMapa.zoom.max : 12}
                            >
                                <LayersControl position="topleft" collapsed={false}>
                                    {(data?.infoMapa?.mapasBase && Object.values(data.infoMapa.mapasBase).length) ?
                                        Object.values(data.infoMapa.mapasBase).map(
                                            (item, i) => {
                                                return (
                                                    <BaseLayer key={i + "baseLayerrEL"} name={item.nombre} checked={i === 0}>
                                                        <TileLayer
                                                            attribution={
                                                                item.atribution
                                                            }
                                                            url={item.link}
                                                        />
                                                    </BaseLayer>
                                                );
                                            }
                                        )
                                    :
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
                                    }

                                    {Object.values(data.capas).map(
                                        (item, i) => {
                                            return (
                                                <Overlay
                                                    checked
                                                    name={item.nombre}
                                                    key={i + "overlayRel"}
                                                >
                                                    <LayerGroup
                                                        key={item.nombre}
                                                    >
                                                        {Object.values(
                                                            item.elementos
                                                        ).map((el, ind) => {
                                                            if (
                                                                el.tipo ===
                                                                "punto"
                                                            ) {
                                                                return (
                                                                    <CircleMarker
                                                                        key={ind = "circleMakerRel"}
                                                                        center={getCoords(
                                                                            el.coordenadas
                                                                        )}
                                                                        radius={
                                                                            4
                                                                        }
                                                                        color={
                                                                            el
                                                                                .simbolo
                                                                                .color
                                                                        }
                                                                    >
                                                                        <Popup>
                                                                            {
                                                                                el.popup
                                                                            }
                                                                        </Popup>
                                                                        <Tooltip>
                                                                            {
                                                                                el.nombre
                                                                            }
                                                                        </Tooltip>
                                                                    </CircleMarker>
                                                                );
                                                            }

                                                            if (
                                                                el.tipo ===
                                                                    "geojson" &&
                                                                ind !== 4
                                                            ) {
                                                                try {
                                                                    return (
                                                                        <GeoJSON
                                                                            key={
                                                                                ind
                                                                            }
                                                                            data={
                                                                                el.coordenadas
                                                                            }
                                                                        />
                                                                    );
                                                                } catch (error) {
                                                                    // console.log(
                                                                    //     "Tronó el GeoJSON"
                                                                    // );
                                                                }
                                                            }
                                                        })}
                                                    </LayerGroup>
                                                </Overlay>
                                            );
                                        }
                                    )}
                                    <ScaleControl
                                        position="bottomright"
                                        metric={true}
                                        imperial={true}
                                    />
                                </LayersControl>
                            </MapContainer>
                        </div>
                    )}
                    {contMap === "picto" && (
                        <div className="mapaPicto" ref={refContainer}>
                            {ready && (
                                <TransformWrapper
                                    centerZoomedOut
                                    initialPositionX={width}
                                >
                                    <TransformComponent
                                        wrapperStyle={{
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            src={
                                                relation.maps &&
                                                relation.maps.length > 0
                                                    ? "/storage/relaciones/" +
                                                      relation.maps[idActive]
                                                          .imagen
                                                    : ""
                                            }
                                            alt=""
                                            style={{
                                                height: "600px",
                                                width: "100%",
                                            }}
                                            id="imagenprov"
                                            ref={refImg}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            )}
                        </div>
                    )}
                    {contMap === "lienzo" && (
                        <div>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={7}>
                                    <TransformWrapper>
                                        <TransformComponent
                                            wrapperStyle={{ width: "100%" }}
                                        >
                                            <img
                                                src={
                                                    "/storage/relaciones/" +
                                                    folioActive?.imagen
                                                }
                                                alt=""
                                                style={{ height: "600px" }}
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    className="textContainer-alt"
                                    style={{ flexWrap: "wrap" }}
                                >
                                    <div
                                        className={"lienzo-title"}
                                        style={{ width: "100%" }}
                                    >
                                        Folio: {folioActive.folio}
                                        <br />
                                        Nombre: {folioActive.nombre}
                                        <br />
                                        Descripcion: {folioActive.descripcion}
                                    </div>
                                    <div
                                        className={"lienzo-text"}
                                        style={{ width: "100%" }}
                                    >
                                        <Typography
                                            style={{whiteSpace: 'pre-line'}}
                                        >
                                            {textActive
                                                ? textActive
                                                : "Sin Transcripción"}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>
                <div className="container-controls">
                    <Grid container alignContent={"center"}>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={3}
                                    style={{ display: "flex", gap: 15 }}
                                >
                                    <div className="round-button-container">
                                        <div
                                            className={
                                                contMap === "geo" &&
                                                idActive == 0
                                                    ? "round-button active"
                                                    : "round-button"
                                            }
                                            onClick={() => {
                                                setContMap("geo");
                                                setIdActive(0);
                                            }}
                                        ></div>
                                        <div className="round-button-text">
                                            Mapa geográfico
                                        </div>
                                    </div>
                                    {relation.maps && relation.maps.length > 0 && (
                                        <div className="round-button-container">
                                            <div
                                                className={
                                                    contMap === "picto" &&
                                                    idActive === 0
                                                        ? "round-button active"
                                                        : "round-button"
                                                }
                                                onClick={() => {
                                                    setContMap("picto");
                                                    setIdActive(0);
                                                    setImageSize();
                                                }}
                                            ></div>
                                            <div className="round-button-text">
                                                Mapa pictográfico 1
                                            </div>
                                        </div>
                                    )}
                                </Grid>
                                <Grid xs={9}>
                                    <div className="swiper-container">
                                        <Swiper
                                            spaceBetween={15}
                                            freeMode={false}
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            slidesPerView={5}
                                            navigation={true}
                                            modules={[Navigation, FreeMode]}
                                            className="leo-swiper"
                                        >
                                            {relation &&
                                                relation.invoices.map(
                                                    (invoice, index) => (
                                                        <SwiperSlide
                                                            key={index}
                                                            className="mini-photo-container"
                                                            onClick={() =>
                                                                changeFolio(
                                                                    invoice,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                className={
                                                                    contMap ==
                                                                        "lienzo" &&
                                                                    idActive ==
                                                                        index
                                                                        ? "oski-customGallery-miniPhoto active"
                                                                        : "oski-customGallery-miniPhoto"
                                                                }
                                                                src={
                                                                    "/storage/relaciones/" +
                                                                    invoice.imagen
                                                                }
                                                                style={{
                                                                    width: "66px",
                                                                    height: "100px",
                                                                }}
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                )}
                                        </Swiper>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {contMap == "lienzo" && (
                                <div className="translate-container">
                                    {folioActive &&
                                        folioActive.transcriptions &&
                                        folioActive.transcriptions.length > 0 &&
                                        folioActive.transcriptions.map(
                                            (transcription, index) =>
                                                activeTranslate == index ? (
                                                    <TranslateButtonActive
                                                        key={index + "TransButton"}
                                                        variant="contained"
                                                        size={"large"}
                                                        onClick={() =>
                                                            changeText(
                                                                transcription.texto,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {transcription.nombre}
                                                    </TranslateButtonActive>
                                                ) : (
                                                    <TranslateButton
                                                        key={index}
                                                        variant="contained"
                                                        size={"large"}
                                                        onClick={() =>
                                                            changeText(
                                                                transcription.texto,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {transcription.nombre}
                                                    </TranslateButton>
                                                )
                                        )}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className="container-controls">
                    {relation.maps &&
                        relation.maps.length > 0 &&
                        relation.maps.map((map, index) => {
                            if (index === 0) return;

                            return (
                                <div key={index + "div"} className="round-button-container">
                                    <div
                                        className={
                                            contMap == "picto" &&
                                            idActive === index
                                                ? "round-button active"
                                                : "round-button"
                                        }
                                        onClick={() => {
                                            setContMap("picto");
                                            setIdActive(index);
                                            setImageSize();
                                        }}
                                    ></div>
                                    <div className="round-button-text">
                                        Mapa pictográfico {index + 1}
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div style={{ marginTop: 50, width: "100%", marginBottom: 70 }}>
                    <div
                        style={{
                            width: "90%",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <Grid container justifyContent={"space-between"}>
                            <Grid item sm={8} md={9} xs={12}>
                                <div className="info-text-relacion">
                                    {relation.alt_nombre}
                                    <br />
                                    Reproducción por cortesía de la Benson Latin
                                    America Collection. The General Libraries,
                                    The University of Texas Austin
                                    (JGI-XXIV-12).
                                </div>
                            </Grid>
                            <Grid item sm={4} md={3} xs={12}>
                                {/* reemplazar por el uuid de la relacion por fa */}
                                <Grid
                                    container
                                    justifyContent={"right"}
                                    sx={{ mt: { xs: 3, sm: 0 } }}
                                >
                                    <InertiaLink
                                        href={route(
                                            "sources.index",
                                            relation.uuid
                                        )}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <ColorButton
                                            variant="contained"
                                            size={"large"}
                                        >
                                            Ver Fuentes
                                        </ColorButton>
                                    </InertiaLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
            {/* Boton estilo footer */}
            <div className="footer-all-folios" style={{ position: "static" }}>
                <Container maxWidth={"xl"}>
                    <div
                        className="folios-button"
                        style={{ cursor: "pointer" }}
                        onClick={toggleDrawer}
                    >
                        <KeyboardArrowUpIcon style={{ marginRight: 10 }} /> Ver
                        todos los folios
                    </div>
                </Container>
            </div>
            <Drawer
                anchor={"bottom"}
                open={open}
                onClose={toggleDrawer}
            >
                <div className="drawer-content">
                    <Container
                        maxWidth={"xl"}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <div style={{ width: "90%" }}>
                            <Grid container spacing={8}>
                                {relation &&
                                    relation.invoices.map((invoice, index) => (
                                        <Grid item>
                                            <div
                                                key={index + "grid"}
                                                className={
                                                    contMap == "lienzo" &&
                                                    idActive == index
                                                        ? "folio-mini-container active"
                                                        : "folio-mini-container"
                                                }
                                            >
                                                <img
                                                    style={{
                                                        width: 100,
                                                        height: 139,
                                                        objectFit: "cover",
                                                    }}
                                                    src={
                                                        "/storage/relaciones/" +
                                                        invoice.imagen
                                                    }
                                                    onClick={() =>
                                                        changeFolio(
                                                            invoice,
                                                            index
                                                        )
                                                    }
                                                />
                                                <div>Folio 1</div>
                                            </div>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    </Container>
                </div>
                <div className="footer-all-folios">
                    <Container maxWidth={"xl"}>
                        <div
                            className="folios-button"
                            style={{ cursor: "pointer" }}
                            onClick={toggleDrawer}
                        >
                            <KeyboardArrowDownIcon
                                style={{ marginRight: 10 }}
                            />{" "}
                            Ver todos los folios
                        </div>
                    </Container>
                </div>
            </Drawer>
        </>
    );
};

Relacion.layout = (page) => (
    <Layout
        children={page}
        title="Relaciones Geográficas"
        pageTitle="Relaciones Geográficas"
    />
);

export default Relacion;
