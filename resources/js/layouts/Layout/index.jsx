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
    padding-top:30px;
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
                    <Container maxWidth={'xl'} style={{minHeight: 'calc(100vh - 449px)', marginTop:'75px'}}>
                        {children}
                    </Container>
                    <Footer />
                </GridMain>
            </Grid>
        </React.Fragment>
    )
}
