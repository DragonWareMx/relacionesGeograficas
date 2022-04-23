import Layout from '../../layouts/Layout'
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import '/css/creditos.css'
import '/css/common.css'


const Fuentes = ({fuentes}) => {

    return (

        <>
        <Container maxWidth={'xl'} style={{paddingTop:'40px', paddingBottom:'50px'}}>
            <Grid container  justifyContent="space-between">
                <Grid item xs={12}>
                    <p className="big-text">Fuentes</p>
                    {fuentes && fuentes.length>0 && fuentes.map((fuente,index)=>(
                        <p key={index}>
                            {fuente.ficha}
                        </p>
                    ))}
                </Grid>
            </Grid>
        </Container>
        </>
    )
}


Fuentes.layout = page => <Layout children={page} title="Fuentes" pageTitle="Fuentes" />

export default Fuentes