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

const Show = ({ user }) => {
    const [values, setValues] = useState({
        nombre: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        error: false,
    });
    console.log(user);

    const { errors, status } = usePage().props;

    function handleSubmit(e) {
        e.preventDefault();
        let data = { ...values, is_admin: checked };
        console.log(data);
        Inertia.post(route("users.update", user.id), data, {
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

    const [checked, setChecked] = useState(user.is_admin);

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };

    const [openDelete, setOpenDelete] = useState(false);

    function submitDelete(e) {
        e.preventDefault();
        Inertia.delete(route("users.delete", user.id), {
            onSuccess: () => {
                setOpenDelete(false);
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
                <Grid container justifyContent={"space-between"}>
                    <Typography variant="h5" color="primary">
                        Editar Usuario
                    </Typography>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => setOpenDelete(true)}
                    >
                        Eliminar
                    </Button>
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
                        )}
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

                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                    <Card sx={style2}>
                        <Typography color="error" variant="h6">
                            ¿Seguro que deseas eliminar a este usuario?
                        </Typography>
                        <Typography>
                            Esta acción es irreversible, el usuario ya no tendrá
                            acceso al panel administrador.
                        </Typography>
                        <form onSubmit={submitDelete}>
                            <Grid
                                container
                                justifyContent={"space-between"}
                                style={{ marginTop: 10 }}
                            >
                                <Button
                                    type="button"
                                    onClick={() => setOpenDelete(false)}
                                    style={{ color: "#A1A1A1" }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    color="error"
                                    variant="outlined"
                                >
                                    Eliminar
                                </Button>
                            </Grid>
                        </form>
                    </Card>
                </Modal>
            </Container>
        </>
    );
};

Show.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Editar Usuario"
        pageTitle="Relaciones Geográficas"
    />
);

export default Show;
