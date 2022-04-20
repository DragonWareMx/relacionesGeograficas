import Layout from '../../layouts/Layout'
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '/css/common.css'
import { InertiaLink } from '@inertiajs/inertia-react';


const Relacion = ({ }) => {

    return (

        <>
        <Grid container>
            <Grid item xs={12} style={{backgroundColor:'#193661'}}>
            <Container maxWidth={'xl'}>
                <InertiaLink href="/" style={{display:'flex', alignItems:'center', textDecoration:'none', color:'white', width:'max-content'}}>
                    <ArrowBackIosIcon />
                    <p style={{fontSize:'20px'}}>Zapotitlan</p>
                </InertiaLink>
            </Container>
            </Grid>
        </Grid>
        </>
    )
}


Relacion.layout = page => <Layout children={page} title="Relaciones Geográficas" pageTitle="Relaciones Geográficas" />

export default Relacion