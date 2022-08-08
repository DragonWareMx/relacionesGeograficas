import Layout from '../../layouts/Layout'
import React, { useState, useEffect } from 'react';
import {Container,Typography, Grid} from '@mui/material';
import '/css/common.css'
import '../../../css/admin.css'
import { InertiaLink } from "@inertiajs/inertia-react";


const Relations = ({relations}) => {

    return (
        <>
            <Container style={{marginTop:'36px'}}>
                <Typography variant='h5' color='primary'>Todas las Relaciones</Typography>
                <Grid container spacing={2} mt={5}>
                    {relations && relations.length > 0 && relations.map((relation, index) => (
                        <Grid item xs={2} key={index}>
                            <InertiaLink href={"/admin/relations/"+relation.id} style={{textDecoration:'none',color:'black'}}>
                                <Grid container 
                                    justifyContent='center' 
                                    style={{cursor:'pointer'}}
                                >
                                    <img
                                        style={{
                                            width:80,
                                            height:80,
                                            objectFit:'cover',
                                            borderRadius:'50%'
                                        }} 
                                        src={'/storage/relaciones/'+relation.miniatura}
                                    />
                                    <Typography align='center' style={{width:'100%'}}>
                                        {relation.nombre}
                                    </Typography>
                                </Grid>
                            </ InertiaLink>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}


Relations.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Relations