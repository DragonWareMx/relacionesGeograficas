import Layout from '../../layouts/Layout'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { InertiaLink } from '@inertiajs/inertia-react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './style.css'

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

// const Item = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     // ...theme.typography.body2,
//     padding: theme.spacing(1),
//     // textAlign: 'center',
//     // color: theme.palette.text.secondary,
//   }));


const Home = ({ }) => {

    return (

        <>
        <div className="row" style={{backgroundColor:'#193661'}}>
            <Container maxWidth="md">
                <div className='carousel-container'>
                    <OwlCarousel
                        className='owl-carousel owl-theme'
                        loop
                        autoplay 
                        autoplayTimeout={5000} 
                        autoplayHoverPause
                        margin={10}
                        items={1}
                    >
                        <div className='item carousel-div'>
                            <img src='/img/assets/carrusel1.png' className='carousel-div' />
                            <div className='carousel-title'>Meztitlán</div>
                        </div>
                        <div className='item carousel-div'>
                            <img src='/img/assets/carrusel2.jpg' className='carousel-div'/>
                            <div className='carousel-title'>Pátzcuaro</div>
                        </div>
                        <div className='item carousel-div'>
                            <img src='/img/assets/carrusel1.png' className='carousel-div'/>
                            <div className='carousel-title'>Tacámbaro</div>
                        </div>
                    </OwlCarousel>
                </div>
            </Container>
        </div>
        <Container maxWidth={'xl'} style={{minHeight: 'calc(100vh - 349px)', paddingTop:'60px', paddingBottom:'50px'}}>
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
                <Paper className="btn-op">MAPA</Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2} style={{paddingTop:'0px'}}>
                <Paper className="btn-op">ALFABETICO</Paper>
            </Grid>
        </Grid>
        </>
    )
}

Home.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Home
