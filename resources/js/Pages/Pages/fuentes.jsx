import Layout from '../../layouts/Layout'
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import '/css/creditos.css'
import '/css/common.css'


const Fuentes = ({ }) => {

    return (

        <>
        <Container maxWidth={'xl'} style={{paddingTop:'40px', paddingBottom:'50px'}}>
            <Grid container  justifyContent="space-between">
                <Grid item xs={12} sm={6} className="pd-ri-50">
                    <p className="big-text">Fuentes</p>
                    <p>
                        Alejandra Frausto Guerrero
                        <br />
                        Secretaria de Cultura
                    </p>
                    
                </Grid>
                <Grid item xs={12} sm={6} className="pd-le-50">
                    <p className="big-text">Fuentes 2.0</p>
                    <p>
                        Biblioteca de las Artes, Centro Nacional de las Artes Instituto del Artesano Michoacano<br />
                        Centro Cultural Clav.ero<br />
                        Departamento de Conservación y Restauración de Obras de Arte<br />
                        –SECUM–<br />
                        Departamento Editorial de la Universidad Autónoma de Aguascalientes<br />
                        Escuela Normal Urbana Federal “Profr. J. Jesús Romero Flores” Fundación Cultural Alfredo Zalce<br />
                        Museo Agrarista de Michoacán, Tzurumutaro, Michoacán Museo de Arte Contemporáneo Alfredo Zalce<br />
                        Museo Nacional de Antropología e Historia Periódico La Voz de Michoacán<br />
                        Poder Judicial del Estado de Michoacán Presidencia Municipal de Opopeo, Michoacán<br />
                        Presidencia Municipal de Santa Ana Maya, Michoacán Universidad Michoacana de San Nicolás de Hidalgo
                    </p>
                </Grid>
            </Grid>
        </Container>
        </>
    )
}


Fuentes.layout = page => <Layout children={page} title="Fuentes" pageTitle="Fuentes" />

export default Fuentes