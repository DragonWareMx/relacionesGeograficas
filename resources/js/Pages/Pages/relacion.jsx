import Layout from '../../layouts/Layout'
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '/css/common.css'
import { InertiaLink } from '@inertiajs/inertia-react';
import '../../../css/relation.css'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';

//iconos
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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

const Relacion = ({ }) => {

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
            <div>
                <KeyboardArrowUpIcon /> Ver todos los folios
            </div>
        </>
    )
}


Relacion.layout = page => <Layout children={page} title="Relaciones Geográficas" pageTitle="Relaciones Geográficas" />

export default Relacion