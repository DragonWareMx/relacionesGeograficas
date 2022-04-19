import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@mui/material/Grid';

export default function Footer() {
    return (
        
        <div style={{backgroundColor:'#304a71'}}>
            <Container maxWidth={'xl'}>
                <Grid container alignItems="center" justifyContent="center" style={{padding:'25px'}}>
                    <Grid item xs={12} sm={12} md={7} style={{display:'flex',justifyContent:'space-around', flexWrap:'wrap'}}>

                    
                        <img src="/img/assets/Cultura.PNG" style={{marginBottom:'15px'}} />
                        <img src="/img/assets/Conacyt.PNG" style={{marginBottom:'15px'}} />
                        <InertiaLink href="#!" style={{marginBottom:'25px'}}>
                            <img src="/img/assets/Creditos.PNG" />
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                        <a href="https://dragonware.com.mx" target="_blank" style={{textDecoration:'none', color:'#919EAB', fontSize:'13px'}}>
                            Desarrollado por DragonWare
                            <img src="/img/assets/dragonBlanco1.png" style={{width:'19px', height:'13px', marginLeft:'10px'}} />
                        </a>
                    </Grid>
                </Grid>
            </Container>
            
        </div>
    )
}