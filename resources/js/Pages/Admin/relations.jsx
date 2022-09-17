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

const Relations = ({ relations, api }) => {
    const [open, setOpen] = React.useState(false);

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
                <Grid container justifyContent={"space-between"} mt={5}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Cambiar API
                    </Button>

                    <InertiaLink
                        href={route("admin.create")}
                        style={{ textDecoration: "none" }}
                    >
                        <Button color="primary" variant="contained">
                            Agregar relación
                        </Button>
                    </InertiaLink>
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
