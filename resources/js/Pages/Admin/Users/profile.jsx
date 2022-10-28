import LayoutAdmin from "../../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Button,
    TextField,
    Modal,
    Card,
} from "@mui/material";
import "/css/common.css";
import "../../../../css/admin.css";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Slide from "@mui/material/Slide";
import { Inertia } from "@inertiajs/inertia";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const Profile = ({ user }) => {
    const [values, setValues] = useState({
        nombre: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        actual_password: "",
        error: false,
    });

    const { errors, status } = usePage().props;
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    function handleSubmit(e) {
        e.preventDefault();
        let data = { ...values };
        Inertia.post(route("users.profile.update"), data, {
            onSuccess: () => {},
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    return (
        <>
            <Container style={{ marginTop: "36px" }}>
                <Grid container justifyContent={"space-between"}>
                    <Typography variant="h5" color="primary">
                        Editar Perfil
                    </Typography>
                </Grid>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} mt={5}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="nombre"
                                label="Nombre"
                                fullWidth
                                value={values.nombre}
                                onChange={handleChange}
                                required
                                error={
                                    errors.nombre &&
                                    values.error == true &&
                                    true
                                }
                                helperText={
                                    values.error == true && errors.nombre
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Correo Electrónico"
                                fullWidth
                                required
                                value={values.email}
                                onChange={handleChange}
                                error={
                                    errors.email && values.error == true && true
                                }
                                helperText={
                                    values.error == true && errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="password"
                                label="Nueva Contraseña (opcional)"
                                fullWidth
                                value={values.password}
                                onChange={handleChange}
                                error={
                                    errors.password &&
                                    values.error == true &&
                                    true
                                }
                                helperText={
                                    values.error == true && errors.password
                                }
                                type="password"
                            />
                        </Grid>
                        {values.password !== "" && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="password_confirmation"
                                        label="Confirmar Nueva Contraseña"
                                        fullWidth
                                        required
                                        value={values.password_confirmation}
                                        onChange={handleChange}
                                        error={
                                            errors.password_confirmation &&
                                            values.error == true &&
                                            true
                                        }
                                        helperText={
                                            values.error == true &&
                                            errors.password_confirmation
                                        }
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="actual_password"
                                        label="Contraseña Actual"
                                        fullWidth
                                        required
                                        value={values.actual_password}
                                        onChange={handleChange}
                                        error={
                                            errors.actual_password &&
                                            values.error == true &&
                                            true
                                        }
                                        helperText={
                                            values.error == true &&
                                            errors.actual_password
                                        }
                                        type="password"
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid container justifyContent={"right"} sx={{ mt: 3 }}>
                            <InertiaLink
                                href={route("admin.index")}
                                style={{ textDecoration: "none" }}
                            >
                                <Button color="primary" variant="outlined">
                                    Volver
                                </Button>
                            </InertiaLink>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ ml: 3 }}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

Profile.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Editar Usuario"
        pageTitle="Relaciones Geográficas"
    />
);

export default Profile;
