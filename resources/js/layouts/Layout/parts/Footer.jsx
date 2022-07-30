import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@mui/material/Grid';
import { Inertia } from '@inertiajs/inertia';
import { Button } from "@mui/material";

export default function Footer() {
    return (
        
        <div style={{backgroundColor:'#304a71'}}>
            <Container maxWidth={'xl'}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={7}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src="/img/assets/Cultura.PNG" />
                        <img src="/img/assets/Conacyt.PNG" />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{mt: 1, mb: 1}}
                    >
                        <InertiaLink href="/creditos">
                            <Button
                                size="large"
                                sx={{color: "white", textDecoration: "underline", ":hover": { textDecoration: "underline" }}}
                            >
                                Créditos
                            </Button>
                        </InertiaLink>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{mb:2}}
                    >
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