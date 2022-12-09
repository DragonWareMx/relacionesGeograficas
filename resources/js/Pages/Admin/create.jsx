import LayoutAdmin from "../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import {
    Container,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Typography,
    StepButton,
    IconButton,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "/css/common.css";
import "../../../css/admin.css";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import "../../../css/relation.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Inertia } from "@inertiajs/inertia";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Create = (api) => {
    //Control steps
    const [activeStep, setActiveStep] = React.useState(0);

    //Control alerts
    const [open, setOpen] = React.useState(false);
    const [errorMessagge, setErrorMessagge] = React.useState("");
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(api.api.url + `relaciones`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, []);
    //form data
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        imageBanner: [],
        imageMin: [],
        mapImages: [],
        nombre: "",
        alt_nombre: "",
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

    const [relation, setRelation] = React.useState("");
    const [notAvailable, setNotAvailable] = React.useState("");
    const [description, setDescription] = useState(null);
    const [fuentes, setFuentes] = useState(null);
    const [limitFuentes, setLimitFuentes] = useState(true);

    function verify(newValue) {
        setRelation(newValue);
        axios
            .get(route("verify", [newValue.idDS]))
            .then((response) => {
                if (!response.data) {
                    setDisabledRel(false);
                    setNotAvailable(false);
                    getInfo(newValue.idDS);
                } else {
                    setDisabledRel(true);
                    setNotAvailable(true);
                }
            })
            .catch((error) => {});
    }

    function getInfo(idDS) {
        axios
            .get(api.api.url + "mapa/" + idDS)
            .then((response) => {
                setDescription(response.data?.infoRelacion?.descripcion);
                setFuentes(Object.values(response.data?.infoRelacion?.fuentes));
                setLimitFuentes(true);
            })
            .catch((error) => {});
    }

    function loadImage(id) {
        var input = document.getElementById(id);
        var container = document.getElementById(id + "Container");
        if (input.files) {
            let arr = [];
            arr.push(input.files[0]);
            setValues((values) => ({
                ...values,
                [id]: arr,
            }));
        }
    }

    function addImages(id) {
        var input = document.getElementById(id);
        if (input.files) {
            var arr = values[id].slice();

            for (var i = 0; i < input.files.length; i++) {
                arr.push(input.files[i]);
            }
            setValues((values) => ({
                ...values,
                [id]: arr,
            }));
        }
    }

    function removeImg(id, index) {
        var arr = values[id].slice();
        setValues((values) => ({
            ...values,
            [id]: arr.filter((o, i) => i !== index),
        }));
    }

    function checkInputs() {
        if (!relation) {
            setErrorMessagge("Debes seleccionar una relación");
            errors.nombre = "Selecciona una relación";
            values.error = true;
            setActiveStep(0);
            setOpen(true);
            return false;
        } else {
            errors.nombre = null;
            values.error = false;
        }
        if (!values.imageBanner || values.imageBanner.length == 0) {
            setErrorMessagge("Debes ingresar una imagen de banner");
            errors.imageBanner = "Ingresa una imagen";
            values.error = true;
            setActiveStep(0);
            setOpen(true);
            return false;
        } else {
            errors.imageBanner = null;
            values.error = false;
        }
        if (!values.imageMin || values.imageMin.length == 0) {
            setErrorMessagge("Debes ingresar una imagen miniatura");
            errors.imageMin = "Ingresa una imagen";
            values.error = true;
            setActiveStep(0);
            setOpen(true);
            return false;
        } else {
            errors.imageMin = null;
            values.error = false;
        }
        return true;
    }

    function handleSubmit(e) {
        //Validando que todo esté llenito
        if (!checkInputs()) return false;
        e.preventDefault();
        let data = {
            ...values,
            nombre: relation.cNombre,
            idDS: relation.idDS,
        };
        if (!values.alt_nombre || values.alt_nombre === "")
            data.alt_nombre = relation.cNombre;
        Inertia.post(route("admin.store"), data, {
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    const [disabledRel, setDisabledRel] = useState(true);

    return (
        <>
            <InertiaLink
                href={route("admin.index")}
                className="backpage-header"
            >
                <ArrowBackIosIcon />
                <div>AGREGAR RELACIÓN</div>
            </InertiaLink>
            <Container style={{ marginTop: "36px" }}>
                <div className="stepper-card">
                    <form onSubmit={handleSubmit}>
                        <>
                            <Typography variant="h6" color={"primary"}>
                                Agregar Nueva Relación
                            </Typography>
                            <FormControl
                                fullWidth
                                style={{
                                    marginTop: "20px",
                                    marginBottom: "25px",
                                }}
                            >
                                <Autocomplete
                                    labelId="relation-names"
                                    id="nombre"
                                    value={relation}
                                    onChange={(event, newValue) => {
                                        verify(newValue);
                                    }}
                                    options={
                                        data && data.length
                                            ? data.map((relation) => {
                                                  return {
                                                      label:
                                                          relation.idDS +
                                                          " " +
                                                          relation.cNombre,
                                                      idDS: relation.idDS,
                                                      cNombre: relation.cNombre,
                                                  };
                                              })
                                            : []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Nombre"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: "new-password", // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                                {notAvailable && (
                                    <Grid container justifyContent={"right"}>
                                        <Typography
                                            variant="subtitle2"
                                            color="primary"
                                        >
                                            No disponible, elija otra relación
                                        </Typography>
                                    </Grid>
                                )}
                            </FormControl>
                            <TextField
                                id="alt_nombre"
                                label="Cambiar Nombre"
                                fullWidth
                                value={values.alt_nombre}
                                onChange={handleChange}
                                error={
                                    errors.alt_nombre &&
                                    values.error == true &&
                                    true
                                }
                                helperText={
                                    values.error == true && errors.alt_nombre
                                }
                                style={{ marginBottom: "25px" }}
                            />
                            <div className="flex-container">
                                {/* BANNER IMAGE */}
                                <input
                                    accept="image/*"
                                    id="imageBanner"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={() => loadImage("imageBanner")}
                                />
                                <label htmlFor="imageBanner">
                                    <div
                                        id="imageBannerContainer"
                                        className={
                                            errors.imageBanner
                                                ? "banner-skelleton error"
                                                : "banner-skelleton"
                                        }
                                        style={
                                            values.imageBanner.length > 0
                                                ? {
                                                      backgroundImage:
                                                          "url(" +
                                                          URL.createObjectURL(
                                                              values
                                                                  .imageBanner[0]
                                                          ) +
                                                          ")",
                                                      border: "none",
                                                  }
                                                : {}
                                        }
                                    >
                                        {values.imageBanner.length == 0 && (
                                            <>
                                                <FileUploadIcon />
                                                <div>Imagen Banner</div>
                                            </>
                                        )}
                                    </div>
                                </label>
                                {/* MIN IMAGE */}
                                <input
                                    accept="image/*"
                                    id="imageMin"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={() => loadImage("imageMin")}
                                />
                                <label htmlFor="imageMin">
                                    <div
                                        id="imageMinContainer"
                                        className={
                                            errors.imageMin
                                                ? "imageMin-skelleton error"
                                                : "imageMin-skelleton"
                                        }
                                        style={
                                            values.imageMin.length > 0
                                                ? {
                                                      backgroundImage:
                                                          "url(" +
                                                          URL.createObjectURL(
                                                              values.imageMin[0]
                                                          ) +
                                                          ")",
                                                      border: "none",
                                                  }
                                                : {}
                                        }
                                    >
                                        {values.imageMin.length == 0 && (
                                            <>
                                                <FileUploadIcon />
                                                <div>Miniatura</div>
                                            </>
                                        )}
                                    </div>
                                </label>
                            </div>
                            <Grid container mt={1}>
                                {description && (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography>Descripción</Typography>
                                        </Grid>
                                        <Typography variant="subtitle2">
                                            {description}
                                        </Typography>
                                    </>
                                )}
                                {fuentes && (
                                    <Grid item xs={12}>
                                        <Typography>Fuentes</Typography>
                                    </Grid>
                                )}
                                {fuentes &&
                                    fuentes.map((fuente, index) => {
                                        return limitFuentes ? (
                                            index <= 1 && (
                                                <Grid item xs={12} key={index}>
                                                    <Typography variant="subtitle2">
                                                        <a
                                                            href={fuente.url}
                                                            target="__blank"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                color: "inherit",
                                                            }}
                                                        >
                                                            {fuente.cita}
                                                        </a>
                                                    </Typography>
                                                </Grid>
                                            )
                                        ) : (
                                            <Grid item xs={12} key={index}>
                                                <Typography variant="subtitle2">
                                                    <a
                                                        href={fuente.url}
                                                        target="__blank"
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "inherit",
                                                        }}
                                                    >
                                                        {fuente.cita}
                                                    </a>
                                                </Typography>
                                            </Grid>
                                        );
                                    })}
                                {fuentes &&
                                    fuentes.length > 2 &&
                                    limitFuentes && (
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                align="right"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    setLimitFuentes(false)
                                                }
                                            >
                                                Ver más
                                            </Typography>
                                        </Grid>
                                    )}
                                {fuentes &&
                                    fuentes.length > 2 &&
                                    !limitFuentes && (
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                align="right"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    setLimitFuentes(true)
                                                }
                                            >
                                                Ver menos
                                            </Typography>
                                        </Grid>
                                    )}
                            </Grid>
                            <div className="title">Mapas pictográficos</div>
                            <div className="flex-container">
                                {/* IMAGENES */}
                                <Grid container spacing={1}>
                                    {/* MAP IMAGES */}
                                    <input
                                        accept="image/*"
                                        id="mapImages"
                                        multiple
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={() => addImages("mapImages")}
                                    />
                                    <label htmlFor="mapImages">
                                        <div
                                            id="mapImagesContainer"
                                            className={
                                                errors.mapImages
                                                    ? "maps-skelleton error"
                                                    : "maps-skelleton"
                                            }
                                        >
                                            <FileUploadIcon />
                                            <div>Agregar mapas</div>
                                        </div>
                                    </label>
                                    {values.mapImages &&
                                        values.mapImages.length > 0 &&
                                        values.mapImages.map(
                                            (preview, index) => (
                                                <Grid key={index} item>
                                                    <IconButton
                                                        aria-label="delete"
                                                        size="small"
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            zIndex: "999",
                                                            marginTop: "5px",
                                                            marginLeft: "5px",
                                                            backgroundColor:
                                                                "rgba(232,232,232,0.7)",
                                                            color: "#F4F4F4",
                                                        }}
                                                        onClick={() =>
                                                            removeImg(
                                                                "mapImages",
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                    <img
                                                        src={URL.createObjectURL(
                                                            preview
                                                        )}
                                                        className="maps-preview"
                                                    />
                                                </Grid>
                                            )
                                        )}
                                </Grid>
                            </div>
                        </>
                        <Grid container justifyContent="right">
                            <Button
                                variant="outlined"
                                onClick={handleSubmit}
                                disabled={disabledRel}
                                type="button"
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errorMessagge && errorMessagge}
                </Alert>
            </Snackbar>
        </>
    );
};

Create.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Agregar Relación"
        pageTitle="Relaciones Geográficas"
    />
);

export default Create;
