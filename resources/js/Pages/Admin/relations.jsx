import Layout from '../../layouts/Layout'
import React, { useState, useEffect } from 'react';
import {Container,Typography, Grid, Button} from '@mui/material';
import '/css/common.css'
import '../../../css/admin.css'
import { InertiaLink, usePage } from "@inertiajs/inertia-react";


const Relations = ({relations}) => {
    console.log(usePage().props, 'PROPS')
    return (
        <>
            <Container style={{marginTop:'36px'}}>
                <Typography variant='h5' color='primary'>Todas las Relaciones</Typography>
                <Grid container spacing={2} mt={5} style={{maxHeight:600, overflowY:'scroll'}}>
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
                                        {relation.alt_nombre}
                                    </Typography>
                                </Grid>
                            </ InertiaLink>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent={'right'}>
                    <InertiaLink href={route("admin.create")} style={{textDecoration:'none'}}>
                        <Button color='primary' variant='contained'>
                            Agregar relación
                        </Button>
                    </InertiaLink>
                </Grid>
            </Container>
        </>
    )
}


Relations.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Relations