import LayoutAdmin from "../../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, TextField } from "@mui/material";
import "/css/common.css";
import "../../../../css/admin.css";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Slide from "@mui/material/Slide";
import { Inertia } from "@inertiajs/inertia";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Create = ({ users }) => {
    const [values, setValues] = useState({
        nombre: "",
        email: "",
        password: "",
        password_confirmation: "",
        error: false,
    });

    const { errors, status } = usePage().props;

    function handleSubmit(e) {
        e.preventDefault();
        let data = { ...values, is_admin: checked };
        console.log(data);
        Inertia.post(route("users.store"), data, {
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

    const [checked, setChecked] = useState(false);

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <Container style={{ marginTop: "36px" }}>
                <Grid container justifyContent={"space-between"}>
                    <Typography variant="h5" color="primary">
                        Crear Usuario
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
                                label="Contraseña"
                                fullWidth
                                required
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="password_confirmation"
                                label="Confirmar Contraseña"
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
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChangeCheck}
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                        />
                                    }
                                    label="Administrador"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid container justifyContent={"right"} sx={{ mt: 3 }}>
                            <InertiaLink
                                href={route("users.index")}
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

Create.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Crear Usuario"
        pageTitle="Relaciones Geográficas"
    />
);

export default Create;
