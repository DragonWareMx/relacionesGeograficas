import LayoutAdmin from "../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, TextField } from "@mui/material";
import "/css/common.css";
import "../../../css/admin.css";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Inertia } from "@inertiajs/inertia";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Relations = ({ relations, api, mainText, pdf, credits }) => {
    const [open, setOpen] = React.useState(false);
    const { auth } = usePage().props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { errors, status } = usePage().props;

    const [values, setValues] = useState({
        url: api?.url || "",
        error: false,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("api.update"), values, {
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    const [openMainText, setOpenMainText] = useState(false);

    const [mainTextValues, setMainTextValues] = useState({
        izq: mainText?.izq ?? "",
        der: mainText?.der ?? "",
        error: false,
    });

    function handleChangeMainText(e) {
        const key = e.target.id;
        const value = e.target.value;
        setMainTextValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmitMainText(e) {
        e.preventDefault();
        Inertia.post(route("mainText.update"), mainTextValues, {
            onSuccess: () => {
                setOpenMainText(false);
            },
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    function loadFile(id) {
        var input = document.getElementById(id);
        if (input.files) {
            setFile(input.files[0]);
        }
    }

    const [openPdf, setOpenPdf] = useState(false);
    const [file, setFile] = useState(null);

    function handleSubmitPdf(e) {
        e.preventDefault();
        Inertia.post(
            route("pdf.update"),
            { file },
            {
                onSuccess: () => {
                    setOpenPdf(false);
                },
                onError: () => {},
            }
        );
    }

    const [openCredits, setOpenCredits] = useState(false);

    const [creditsValues, setCreditsValues] = useState({
        credits_izq: credits?.izq ?? "",
        credits_der: credits?.der ?? "",
        error: false,
    });

    console.log("credits", credits);
    function handleChangeCredits(e) {
        const key = e.target.id;
        const value = e.target.value;
        setCreditsValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmitCredits(e) {
        e.preventDefault();
        Inertia.post(route("credits.update"), creditsValues, {
            onSuccess: () => {
                setOpenCredits(false);
            },
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    return (
        <>
            <Container style={{ marginTop: "36px" }}>
                <Typography variant="h5" color="primary">
                    Todas las Relaciones
                </Typography>
                <Grid
                    container
                    spacing={2}
                    mt={5}
                    style={{ maxHeight: 600, overflowY: "scroll" }}
                >
                    {relations &&
                        relations.length > 0 &&
                        relations.map((relation, index) => (
                            <Grid item xs={2} key={index}>
                                <InertiaLink
                                    href={"/admin/relations/" + relation.id}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    <Grid
                                        container
                                        justifyContent="center"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img
                                            style={{
                                                width: 80,
                                                height: 80,
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                "/storage/relaciones/" +
                                                relation.miniatura
                                            }
                                        />
                                        <Typography
                                            align="center"
                                            style={{ width: "100%" }}
                                        >
                                            {relation.alt_nombre}
                                        </Typography>
                                    </Grid>
                                </InertiaLink>
                            </Grid>
                        ))}
                </Grid>
                <Grid container justifyContent={"left"} mt={5} spacing={5}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenMainText(true)}
                        >
                            Texto página principal
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenPdf(true)}
                        >
                            PDF página principal
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenCredits(true)}
                        >
                            Créditos
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Cambiar API
                        </Button>
                    </Grid>

                    <Grid item>
                        <InertiaLink
                            href={route("admin.create")}
                            style={{ textDecoration: "none" }}
                        >
                            <Button color="primary" variant="contained">
                                Agregar relación
                            </Button>
                        </InertiaLink>
                    </Grid>

                    {auth.user && auth.user.is_admin === 1 && (
                        <Grid item>
                            <InertiaLink
                                href={route("users.index")}
                                style={{ textDecoration: "none" }}
                            >
                                <Button color="primary" variant="outlined">
                                    Administrar usuarios
                                </Button>
                            </InertiaLink>
                        </Grid>
                    )}

                    <Grid item>
                        <InertiaLink
                            href={route("users.profile")}
                            style={{ textDecoration: "none" }}
                        >
                            <Button color="primary" variant="outlined">
                                Editar mi usuario
                            </Button>
                        </InertiaLink>
                    </Grid>
                </Grid>
                {/* // DIALOG */}
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={"md"}
                    fullWidth
                >
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Cambiar url del API</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="url"
                                label="URL"
                                fullWidth
                                value={values.url}
                                onChange={handleChange}
                                error={
                                    errors.url && values.error == true && true
                                }
                                helperText={values.error == true && errors.url}
                                style={{ margin: "25px 0px" }}
                            />
                        </DialogContent>
                        <Grid
                            container
                            justifyContent={"space-around"}
                            style={{ marginBottom: 25 }}
                        >
                            <Button
                                onClick={handleClose}
                                type="button"
                                variant="text"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                Cambiar
                            </Button>
                        </Grid>
                    </form>
                </Dialog>
                {/* // DIALOG PÄGINA PRINCIPAL */}
                <Dialog
                    open={openMainText}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenMainText(false)}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={"md"}
                    fullWidth
                >
                    <form onSubmit={handleSubmitMainText}>
                        <DialogTitle>
                            Cambiar texto de página principal
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                id="izq"
                                label="Parte izquierda"
                                fullWidth
                                value={mainTextValues.izq}
                                onChange={handleChangeMainText}
                                error={
                                    errors.izq &&
                                    mainTextValues.error == true &&
                                    true
                                }
                                helperText={
                                    mainTextValues.error == true && errors.izq
                                }
                                style={{ margin: "25px 0px" }}
                                multiline
                                rows={4}
                            />
                            <TextField
                                id="der"
                                label="Parte derecha"
                                fullWidth
                                value={mainTextValues.der}
                                onChange={handleChangeMainText}
                                error={
                                    errors.der &&
                                    mainTextValues.error == true &&
                                    true
                                }
                                helperText={
                                    mainTextValues.error == true && errors.der
                                }
                                style={{ margin: "25px 0px" }}
                                multiline
                                rows={4}
                            />
                        </DialogContent>
                        <Grid
                            container
                            justifyContent={"space-around"}
                            style={{ marginBottom: 25 }}
                        >
                            <Button
                                onClick={() => setOpenMainText(false)}
                                type="button"
                                variant="text"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                Cambiar
                            </Button>
                        </Grid>
                    </form>
                </Dialog>
                {/* // DIALOG PDF */}
                <Dialog
                    open={openPdf}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenPdf(false)}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={"md"}
                    fullWidth
                >
                    <form onSubmit={handleSubmitPdf}>
                        <DialogTitle>
                            Cambiar archivo PDF de página principal
                        </DialogTitle>
                        <DialogContent>
                            {pdf ? (
                                <Typography>
                                    Archivo actual: {pdf?.pdf}
                                </Typography>
                            ) : (
                                <Typography>Sin archivo</Typography>
                            )}
                            <Grid container>
                                <input
                                    accept="application/pdf"
                                    id="pdfFile"
                                    type="file"
                                    // style={{ display: "none" }}
                                    onChange={() => loadFile("pdfFile")}
                                    required
                                />
                            </Grid>
                        </DialogContent>
                        <Grid
                            container
                            justifyContent={"space-around"}
                            style={{ marginBottom: 25 }}
                        >
                            <Button
                                onClick={() => setOpenPdf(false)}
                                type="button"
                                variant="text"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                Cambiar
                            </Button>
                        </Grid>
                    </form>
                </Dialog>
                {/* // DIALOG CRÉDITOS PRINCIPAL */}
                <Dialog
                    open={openCredits}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenCredits(false)}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={"md"}
                    fullWidth
                >
                    <form onSubmit={handleSubmitCredits}>
                        <DialogTitle>Cambiar créditos</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="credits_izq"
                                label="Créditos izquierda"
                                fullWidth
                                value={creditsValues.credits_izq}
                                onChange={handleChangeCredits}
                                error={
                                    errors.credits_izq &&
                                    creditsValues.error == true &&
                                    true
                                }
                                helperText={
                                    creditsValues.error == true &&
                                    errors.credits_izq
                                }
                                style={{ margin: "25px 0px" }}
                                multiline
                                rows={4}
                            />
                            <TextField
                                id="credits_der"
                                label="Créditos derecha"
                                fullWidth
                                value={creditsValues.credits_der}
                                onChange={handleChangeCredits}
                                error={
                                    errors.credits_der &&
                                    creditsValues.error == true &&
                                    true
                                }
                                helperText={
                                    creditsValues.error == true &&
                                    errors.credits_der
                                }
                                style={{ margin: "25px 0px" }}
                                multiline
                                rows={4}
                            />
                        </DialogContent>
                        <Grid
                            container
                            justifyContent={"space-around"}
                            style={{ marginBottom: 25 }}
                        >
                            <Button
                                onClick={() => setOpenCredits(false)}
                                type="button"
                                variant="text"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                Cambiar
                            </Button>
                        </Grid>
                    </form>
                </Dialog>
            </Container>
        </>
    );
};

Relations.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Agregar Relación"
        pageTitle="Relaciones Geográficas"
    />
);

export default Relations;
