import React, { useEffect } from "react";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import Container from "@mui/material/Container";
import styled from "styled-components";
import "/css/common.css";
import { usePage } from "@inertiajs/inertia-react";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const Grid = styled.div`
    display: grid;
    margin: 0px;
    grid:
        "header header" min-content
        "nav main" 1fr / min-content 1fr;
    min-height: 100vh;
`;

const GridHeader = styled.div`
    grid-area: header;
    position: fixed;
    width: 100%;
    z-index: 1001;
`;

const GridMain = styled.div`
    grid-area: main;
    position: relative;
    padding-top: 64px;
`;

export default function Layout({ title, pageTitle, children, ...rest }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("info");
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType("success");
            setOpenSnack(true);
        }
        if (flash.error) {
            setMessage(flash.error);
            setType("error");
            setOpenSnack(true);
        }
    }, [flash]);

    return (
        <React.Fragment>
            <Grid>
                <Snackbar
                    open={openSnack}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnack(false)}
                >
                    <Alert
                        onClose={() => setOpenSnack(false)}
                        severity={type}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
                <GridHeader>
                    <Header />
                </GridHeader>
                <GridMain>
                    {/* Container en cada página, ya que algunas necesitan el 100% de lo ancho */}
                    <div
                        style={{
                            minHeight: "calc(100vh - 349px)",
                            paddingTop: "0px",
                        }}
                    >
                        {children}
                    </div>
                    {/* <Container maxWidth={'xl'} style={{minHeight: 'calc(100vh - 349px)', paddingTop:'0px'}}>
                        {children}
                    </Container> */}
                    <Footer />
                </GridMain>
            </Grid>
        </React.Fragment>
    );
}
