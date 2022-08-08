import Layout from '../../layouts/Layout'
import React, { useState, useEffect } from 'react';
import {Container,Typography, Grid} from '@mui/material';
import '/css/common.css'
import '../../../css/admin.css'
import { InertiaLink } from "@inertiajs/inertia-react";


const Relations = ({relation}) => {

    return (
        <>
            <Container style={{marginTop:'36px'}}>
                <Typography variant='h5' color='primary'>Relación </Typography>
                
            </Container>
        </>
    )
}


Relations.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Relations