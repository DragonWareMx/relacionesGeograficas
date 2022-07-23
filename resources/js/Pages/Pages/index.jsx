import Layout from '../../layouts/Layout'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/common.css';
import '/css/carousel.css';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

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

function showAlfa(){
    document.getElementById('mapa').style.display = "none";
    document.getElementById('alfabetico').style.display = "block";
}
function showMapa(){
    document.getElementById('mapa').style.display = "block";
    document.getElementById('alfabetico').style.display = "none";
}
function limitChar(nombre){
    return nombre.substring(0,61);
}

const Home = ({ relaciones }) => {
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
                    nombre: "ESRI",
                    atribution: "ESRI",
                    link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
                },
            },
        },
        capas: null
    });

    useEffect(() => {
        axios
            .get(`https://decm.arqueodata.com/api/v1/relaciones`)
            .then((response) => {
                let new_data = data;
                new_data.capas = response.data;
                setData({...data, new_data})
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
        <div className="row" style={{backgroundColor:'#193661'}}>
            <Container maxWidth="md">
                <Swiper
                    navigation={true}
                    pagination={{dynamicBullets:true,clickable:true}}
                    mousewheel={false}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="oski-swiper"
                    loop={true}
                >
                    <SwiperSlide>
                        <div className='oski-carousel-element'>
                            <img src='img/assets/carrusel1.png' className='oski-carousel-img'/>
                            <div className='oski-carousel-title'>Meztitlán</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='oski-carousel-element'>
                            <img src='img/assets/carrusel2.png' className='oski-carousel-img'/>
                            <div className='oski-carousel-title'>Pátzcuaro</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='oski-carousel-element'>
                            <img src='img/assets/carrusel3.png' className='oski-carousel-img'/>
                            <div className='oski-carousel-title'>Tacámbaro</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </Container>
        </div>
        <Container maxWidth={'xl'} style={{paddingTop:'60px', paddingBottom:'50px'}}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6} className="pd-ri-50">
                    <Grid>Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes 
                        históricas del siglo XVI. Como el título sugiere, el objetivo es desarrollar métodos y herramientas computacionales que faciliten la extracción de datos histórico-geográficos 
                        de manera automática para responder preguntas acerca de la sociedad novohispana.
                    La investigación utiliza como fuente principal el conjunto de documentos conocido como Relaciones Geográficas de la Nueva España, específicamente los reportes redactados entre 
                    1577 y 1585 en varias provincias de México y Guatemala por orden del rey Felipe II. Estos informes describen cómo eran la organización territorial y el modo de vida de los 
                    habitantes de Nueva España seis décadas después de consumada la conquista de México-Tenochtitlan.
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center'}} className="pd-le-50">
                    <img src="/img/assets/asset1.png" style={{marginTop:'20px'}} />
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" direction="row-reverse" style={{marginTop:'30px'}}>
                <Grid item xs={12} sm={6} className="pd-le-50">
                    <Grid>Las Relaciones se componen de textos y mapas en cuya elaboración participaron informantes indígenas y oficiales españoles. Debido a la riqueza y variedad del contenido, el 
                        corpus constituye una de las fuentes más importantes para analizar la historia, la geografía, las jurisdicciones administrativas,  la  cultura,  la religión, la economía, la 
                        interacción social y los procesos de transculturación que afectaron a las comunidades nativas y a los colonizadores.
                    Otra aportación del proyecto es la compilación de un directorio de nombres geográficos del siglo XVI, el cual provee las coordenadas geográficas de cerca de 4000 topónimos, 
                    acompañadas de otros rubros de información temática extraída de los documentos (lo que en inglés se denomina gazetteer). Una tercera contribución es la conversión del corpus 
                    de las Relaciones Geográficas del medio analógico a un formato legible por computadora. Esta versión digital estará disponible en distintas plataformas gracias a la tecnología 
                    de datos vinculados (i.e. linked data) para que pueda ser reutilizada por otros equipos de investigación.
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center'}} className="pd-ri-50">
                    <img src="/img/assets/asset2.png" style={{width:'35%',marginTop:'20px'}} />
                </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justifyContent="space-between" direction="row-reverse" style={{marginTop:'30px'}}>
                <InertiaLink href="#!"><img style={{width:'250px'}} src="/img/assets/btn1.PNG" /></InertiaLink>
            </Grid>
        </Container>
        <Grid container justifyContent="center" spacing={2} alignItems="center" style={{backgroundColor:'#475e80', padding:'10px'}}>
            <Grid item xs={6} sm={4} md={2} style={{paddingTop:'0px'}}>
                <Paper className="btn-op" onClick={showMapa}>MAPA</Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2} style={{paddingTop:'0px'}}>
                <Paper className="btn-op" onClick={showAlfa}>ALFABÉTICO</Paper>
            </Grid>
        </Grid>
        {/* APARTADO DE MAPA LEAFLET */}
        {/* <iframe id="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15265770.013208373!2d-102.4105487232916!3d20.912535627434032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2zTcOpeGljbw!5e0!3m2!1ses-419!2smx!4v1650413701265!5m2!1ses-419!2smx" width="100%" height="1000" style={{border:'none'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
        
        <MapContainer
            id="mapa"
            style={styleMap}
            center={
                L.latLng(data.infoMapa.centro.lat, data.infoMapa.centro.long)
            }
            zoom={data.infoMapa.zoom.inicial}
            minZoom={data.infoMapa.zoom.min}
            maxZoom={data.infoMapa.zoom.max}
        >
            <LayersControl position='topleft' collapsed={false}>
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
                <LayerGroup>
                    {
                        data.capas !== null ? data.capas.map((item, i) => {
                            return(
                                <CircleMarker key={item.idDS} center={L.latLng(item.Y, item.X)} radius={5} color={"white"}>
                                    <Tooltip>
                                        {item.cNombre}
                                    </Tooltip>
                                </CircleMarker>
                            )
                        }) : ''
                    }
                </LayerGroup>

                <ScaleControl
                    position="bottomright"
                    metric={true}
                    imperial={true}
                />
            </LayersControl>
        </MapContainer>

        {/* APARTADO DE TODAS LAS RELACIONES */}
        <Container id="alfabetico" maxWidth={'xl'} style={{paddingTop:'60px', paddingBottom:'30px', display:'none'}}>
            <Grid container alignItems="stretch">
                {(relaciones && relaciones.length > 0) ?
                relaciones.map((rel,index)=>(
                    <Grid item xs={4} sm={3} md={2} key={index} style={{display:'flex', justifyContent:'center',flexWrap:'wrap', padding:'0px', marginBottom:'35px'}}>
                        {/* Agregar el uuid de la relacion */}
                        <InertiaLink href={route('relations.index', rel.uuid)} style={{textDecoration:'none', color:'black', display:'flex', justifyContent:'center',flexWrap:'wrap'}}>
                            <Avatar alt={rel.nombre} src={'/storage/relaciones/' + rel.miniatura} sx={{ width: 90, height: 90 }} />
                            <p className="circle-name">{limitChar(rel.nombre)}</p>
                        </InertiaLink>
                    </Grid>
                ))
            :
            <Grid>
                No se encontraron resultados, intentalo más tarde.
            </Grid>
            }
            </Grid>
        </Container>
        </>
    )
}

Home.layout = page => <Layout children={page} title="Relaciones Geográficas" pageTitle="Relaciones Geográficas" />

export default Home
