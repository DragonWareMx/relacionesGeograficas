import Layout from '../../layouts/Layout'
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '/css/common.css'
import { InertiaLink } from '@inertiajs/inertia-react';
import '../../../css/relation.css'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

//iconos
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import SwiperCore, { Navigation, Virtual, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Translate } from '@mui/icons-material';

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: '#4D7DB3',
    '&:hover': {
        backgroundColor: '#4D7DB3',
    },
    borderRadius: 0,
    padding: '20px 40px',
    fontFamily: 'Nunito'
}));

const TranslateButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.8)',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    borderRadius: 0,
    padding: '10px 40px',
    fontFamily: 'Nunito'
}));

const Relacion = ({ }) => {

    const slideTo = () => {

    };

    const [open, setOpen] = useState(false)

    function toggleDrawer() {
        setOpen(!open)
    }

    return (

        <>
            <Grid container>
                <Grid item xs={12} style={{ backgroundColor: '#193661' }}>
                    <Container maxWidth={'xl'}>
                        <InertiaLink href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', width: 'max-content' }}>
                            <ArrowBackIosIcon />
                            <p style={{ fontSize: '20px' }}>Zapotitlan</p>
                        </InertiaLink>
                    </Container>
                </Grid>
            </Grid>
            <Container maxWidth={'xl'}>
                <div className="map-container">

                </div>
                <div class="container-controls">
                    <div class="round-button-container">
                        <div className="round-button active"></div>
                        <div className="round-button-text">Mapa geográfico</div>
                    </div>
                    <div class="round-button-container">
                        <div className="round-button"></div>
                        <div className="round-button-text">Mapa pictográfico 1</div>
                    </div>
                    <div className="swiper-container">
                        <Swiper
                            spaceBetween={4}
                            freeMode={false}
                            effect={"coverflow"}
                            grabCursor={true}
                            slidesPerView={'auto'}
                            navigation={true}
                            modules={[Navigation, FreeMode]}
                            className="leo-swiper">
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini1.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini2.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini3.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini4.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini5.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini6.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini7.jpg'}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => slideTo()}
                            >
                                <img
                                    className="oski-customGallery-miniPhoto"
                                    src={'/img/provisional/Cul_mini8.jpg'}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="translate-container">
                        <TranslateButton variant="contained" size={"large"} >
                            Acuña
                        </TranslateButton>
                        <TranslateButton variant="contained" size={"large"} >
                            Valadez
                        </TranslateButton>
                        <TranslateButton variant="contained" size={"large"} >
                            De la Garza
                        </TranslateButton>
                    </div>
                </div>
                <div class="container-controls">
                    <div class="round-button-container">
                        <div className="round-button"></div>
                        <div className="round-button-text">Mapa pictográfico 2</div>
                    </div>
                    <div class="round-button-container">
                        <div className="round-button"></div>
                        <div className="round-button-text">Mapa pictográfico 3</div>
                    </div>
                    <div class="round-button-container">
                        <div className="round-button"></div>
                        <div className="round-button-text">Mapa pictográfico 4</div>
                    </div>
                    <div class="round-button-container">
                        <div className="round-button"></div>
                        <div className="round-button-text">Mapa pictográfico 5</div>
                    </div>
                </div>

                <div style={{ marginTop: 50, width: '100%', marginBottom: 70 }}>
                    <Grid container alignItems="center">
                        <Grid item xs={9} >
                            <div className='info-text-relacion'>
                                Relación de la Alcaldía Mayor de Metzititlán y su Jurisdicción
                                <br />
                                Reproducción por cortesía de la Benson Latin America Collection. The General Libraries, The University of Texas Austin (JGI-XXIV-12).
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* reemplazar por el uuid de la relacion por fa */}
                            <InertiaLink href={route('sources.index','1')} style={{textDecoration:'none'}}>
                            <ColorButton variant="contained" size={"large"} >
                                Ver Fuentes
                            </ColorButton>
                            </InertiaLink>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            {/* Boton estilo footer */}
            <div className='footer-all-folios' style={{ position: "static" }}>
                <Container maxWidth={'xl'}>
                    <div className="folios-button" style={{ cursor: 'pointer' }} onClick={toggleDrawer}>
                        <KeyboardArrowUpIcon style={{ marginRight: 10 }} /> Ver todos los folios
                    </div>
                </Container>
            </div>
            <Drawer
                anchor={'bottom'}
                open={open}
            //onClose={toggleDrawer}
            >
                <div className="drawer-content">
                    <Container maxWidth={"xl"}>
                        <Grid container spacing={8}>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini1.jpg'} />
                                    <div>Folio 1</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini2.jpg'} />
                                    <div>Folio 2</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini3.jpg'} />
                                    <div>Folio 3</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini4.jpg'} />
                                    <div>Folio 4</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini5.jpg'} />
                                    <div>Folio 5</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini6.jpg'} />
                                    <div>Folio 6</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini7.jpg'} />
                                    <div>Folio 7</div>
                                </div>
                            </Grid>
                            <Grid item >
                                <div className='folio-mini-container'>
                                    <img className="" src={'/img/provisional/Cul_mini8.jpg'} />
                                    <div>Folio 8</div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <div className='footer-all-folios'>
                    <Container maxWidth={'xl'}>
                        <div className="folios-button" style={{ cursor: 'pointer' }} onClick={toggleDrawer}>
                            <KeyboardArrowDownIcon style={{ marginRight: 10 }} /> Ver todos los folios
                        </div>
                    </Container>
                </div>
            </Drawer>
        </>
    )
}


Relacion.layout = page => <Layout children={page} title="Relaciones Geográficas" pageTitle="Relaciones Geográficas" />

export default Relacion