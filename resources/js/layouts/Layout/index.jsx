import React, { useEffect } from 'react';
import Header from './parts/Header';
import Footer from './parts/Footer';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import '/css/common.css'


const Grid = styled.div`
    display: grid;
    margin:0px;
    grid: "header header" min-content
                          "nav main" 1fr / min-content 1fr;
    min-height: 100vh;
`;

const GridHeader = styled.div`
    grid-area: header;
`;

const GridMain = styled.div`
    grid-area: main;
    position: relative;
`;


export default function Layout({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <React.Fragment>
            <Grid>
                <GridHeader>
                    <Header />
                </GridHeader>
                <GridMain>
                    {/* Container en cada página, ya que algunas necesitan el 100% de lo ancho */}
                    <div style={{minHeight: 'calc(100vh - 349px)', paddingTop:'0px'}}>
                            {children}
                    </div>
                    {/* <Container maxWidth={'xl'} style={{minHeight: 'calc(100vh - 349px)', paddingTop:'0px'}}>
                        {children}
                    </Container> */}
                    <Footer />
                </GridMain>
            </Grid>
        </React.Fragment>
    )
}
