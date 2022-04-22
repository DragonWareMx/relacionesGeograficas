import Layout from '../../layouts/Layout'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/common.css'
import '/css/carousel.css'

function showAlfa(){
    document.getElementById('mapa').style.display = "none";
    document.getElementById('alfabetico').style.display = "block";
}
function showMapa(){
    document.getElementById('mapa').style.display = "block";
    document.getElementById('alfabetico').style.display = "none";
}

const Home = ({ relaciones }) => {

    return (

        <>
        <div className="row" style={{backgroundColor:'#193661'}}>
            <Container maxWidth="md">
                   
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
        {/* APARTADO DE MAPA GOOGLE */}
        <iframe id="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15265770.013208373!2d-102.4105487232916!3d20.912535627434032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2zTcOpeGljbw!5e0!3m2!1ses-419!2smx!4v1650413701265!5m2!1ses-419!2smx" width="100%" height="1000" style={{border:'none'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        {/* APARTADO DE TODAS LAS RELACIONES */}
        <Container id="alfabetico" maxWidth={'xl'} style={{paddingTop:'60px', paddingBottom:'30px', display:'none'}}>
            <Grid container alignItems="stretch">
                {/* {{Str::limit($book->authors[0]->nombre,62)}} limite de 62 caracteres */}
                
                <Grid item xs={4} sm={3} md={2}  style={{display:'flex', justifyContent:'center',flexWrap:'wrap', padding:'0px', marginBottom:'35px'}}>
                    <InertiaLink href="/relaciones-geograficas" style={{textDecoration:'none', color:'black'}}>
                        <Avatar alt="Zapotitlan" src="/storage/iconosRelaciones/zapotitlan.png" sx={{ width: 90, height: 90 }} />
                        <p className="circle-name">Zapotitlan</p>
                    </InertiaLink>
                </Grid>
                
                <Grid item xs={4} sm={3} md={2}  style={{display:'flex', justifyContent:'center',flexWrap:'wrap', padding:'0px', marginBottom:'35px'}}>
                        <Avatar alt="Zapotitlan" src="/storage/iconosRelaciones/zapotitlan.png" sx={{ width: 90, height: 90 }} />
                        <p className="circle-name">Zapotitlan</p>
                </Grid>
                

            </Grid>
        </Container>
        </>
    )
}

Home.layout = page => <Layout children={page} title="Relaciones Geográficas" pageTitle="Relaciones Geográficas" />

export default Home
