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

const ColorButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "#4D7DB3",
    "&:hover": {
        backgroundColor: "#4D7DB3",
    },
    borderRadius: 0,
    padding: "20px 40px",
    fontFamily: "Nunito",
}));

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#D9D9D9",
            borderRadius: "10px",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#304A71",
        },
        "&:hover fieldset": {
            borderColor: "#D9D9D9",
        },
    },
    "& label.Mui-focused": {
        color: "#304A71",
    },
    "& label.Mui": {
        color: "#D9D9D9",
        fontSize: "14px",
    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ["NOMBRE", "MAPAS", "FOLIOS"];
const Create = (api) => {
    //Control steps
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [skipped, setSkipped] = React.useState(new Set());

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

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
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
        // fuentes:'',
        // mapa_geografico: '',
        mapImages: [],
        folios: [],
        nombre: "",
        alt_nombre: "",
        no_folio: "",
        descripcion: "",
        imageFolio: [],
        error: false,
    });

    const [transcription, setTranscription] = useState({
        name: "",
        text: "",
    });

    const [transcriptions, setTranscriptions] = useState([]);

    function addTranscription() {
        // if(transcription.name === ''){
        //     setErrorMessagge('Ingresa nombre de la transcripción');
        //     setOpen(true);
        //     return false;
        // }
        // if(transcription.text === ''){
        //     setErrorMessagge('Ingresa texto de la transcripción');
        //     setOpen(true);
        //     return false;
        // }
        let trans = {
            name: transcription.name || "",
            text: transcription.text || "",
        };
        setTranscriptions([...transcriptions, trans]);
        setTranscription((values) => ({
            name: "",
            text: "",
        }));
    }

    function addFolio() {
        if (values.nombre === "") {
            setErrorMessagge("Agrega un nombre al folio");
            setOpen(true);
            return false;
        }
        if (values.no_folio === "") {
            setErrorMessagge("Agrega un número al folio");
            setOpen(true);
            return false;
        }
        if (values.imageFolio.length == 0) {
            setErrorMessagge("Agrega una imagen del folio");
            setOpen(true);
            return false;
        }
        var folios = values.folios.slice();
        let folio = {
            no_folio: values.no_folio,
            nombre: values.nombre,
            descripcion: values.descripcion || "",
            imageFolio: values.imageFolio,
            transcriptions: transcriptions,
        };
        folios.push(folio);
        setValues((values) => ({
            ...values,
            folios: folios,
            imageFolio: [],
            descripcion: "",
            no_folio: "",
            nombre: "",
        }));
        setTranscriptions([]);
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const [relation, setRelation] = React.useState("");

    const handleChangeSelect = (event) => {
        console.log(event.target.value);
        setRelation(event.target.value);
    };

    function handleTranscription(e) {
        const key = e.target.id;
        const value = e.target.value;
        setTranscription((values) => ({
            ...values,
            [key]: value,
        }));
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

    function removeTranscription(index) {
        var arr = transcriptions.slice();
        setTranscriptions((values) => arr.filter((o, i) => i !== index));
    }

    function removeFolio(index) {
        var arr = values.folios.slice();
        setValues((values) => ({
            ...values,
            folios: arr.filter((o, i) => i !== index),
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
        if (!values.mapImages || values.mapImages.length == 0) {
            setErrorMessagge(
                "Debes ingresar al menos una imagen del mapa geográfico"
            );
            errors.mapImages = "Ingresa una imagen del mapa geográfico";
            values.error = true;
            setActiveStep(1);
            setOpen(true);
            return false;
        } else {
            errors.mapImages = null;
            values.error = false;
        }
        if (!values.folios || values.folios.length == 0) {
            setErrorMessagge("Debes ingresar al menos folio");
            errors.folios = "Ingresa una imagen del mapa geográfico";
            values.error = true;
            setActiveStep(2);
            setOpen(true);
            return false;
        } else {
            errors.folios = null;
            values.error = false;
        }
        return true;
    }

    function handleSubmit(e) {
        //Validando que todo esté llenito
        if (!checkInputs()) return false;
        e.preventDefault();
        let finalRelation = JSON.parse(relation);
        console.log(values.alt_nombre);
        let data = {
            ...values,
            nombre: finalRelation.cNombre,
            idDS: finalRelation.idDS,
        };
        if (!values.alt_nombre || values.alt_nombre === "")
            data.alt_nombre = finalRelation.cNombre;
        Inertia.post(route("admin.store"), data, {
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
            <InertiaLink
                href={route("admin.index")}
                className="backpage-header"
            >
                <ArrowBackIosIcon />
                <div>AGREGAR RELACIÓN</div>
            </InertiaLink>
            <Container style={{ marginTop: "36px" }}>
                <div className="stepper-card">
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton
                                        color="inherit"
                                        onClick={handleStep(index)}
                                    >
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {completed[activeStep] && (
                        <Typography
                            variant="caption"
                            sx={{ display: "inline-block" }}
                        >
                            Paso {activeStep + 1} completado
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        {activeStep == 0 && (
                            <>
                                <FormControl
                                    fullWidth
                                    style={{
                                        marginTop: "40px",
                                        marginBottom: "25px",
                                    }}
                                >
                                    <InputLabel id="relation-names">
                                        Nombre
                                    </InputLabel>
                                    <Select
                                        labelId="relation-names"
                                        id="nombre"
                                        value={relation || ""}
                                        defaultValue=""
                                        label="Nombre"
                                        onChange={handleChangeSelect}
                                        error={
                                            errors.nombre &&
                                            values.error == true &&
                                            true
                                        }
                                        helperText={
                                            values.error == true &&
                                            errors.nombre
                                        }
                                    >
                                        {data &&
                                            data.length > 0 &&
                                            data.map((rel, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={JSON.stringify({
                                                        idDS: rel.idDS,
                                                        cNombre: rel.cNombre,
                                                    })}
                                                >
                                                    {rel.idDS +
                                                        " " +
                                                        rel.cNombre}
                                                </MenuItem>
                                            ))}
                                    </Select>
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
                                        values.error == true &&
                                        errors.alt_nombre
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
                                        onChange={() =>
                                            loadImage("imageBanner")
                                        }
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
                                                                  values
                                                                      .imageMin[0]
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
                                {/* <CssTextField
                                id='fuentes'
                                multiline
                                label='Fuentes'
                                rows={4}
                                fullWidth
                                value={values.fuentes}
                                onChange={handleChange} 
                                error={errors.fuentes && values.error == true && true}
                                helperText={values.error == true && errors.fuentes}
                                style={{marginTop:'25px'}}
                            /> */}
                            </>
                        )}
                        {activeStep == 1 && (
                            <>
                                {/* <CssTextField
                                id='mapa_geografico' 
                                label='Mapa geográfico' 
                                required
                                fullWidth
                                value={values.mapa_geografico}
                                onChange={handleChange} 
                                error={errors.mapa_geografico && values.error == true && true}
                                helperText={values.error == true && errors.mapa_geografico}
                                style={{marginTop:'40px',marginBottom:'25px'}}
                            /> */}
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
                                            onChange={() =>
                                                addImages("mapImages")
                                            }
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
                                                                marginTop:
                                                                    "5px",
                                                                marginLeft:
                                                                    "5px",
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
                        )}
                        {activeStep == 2 && (
                            <>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography>Folios</Typography>
                                </Grid>

                                <Paper
                                    style={{
                                        paddingLeft: "30px",
                                        paddingRight: "30px",
                                        paddingBottom: "30px",
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <TextField
                                                id="no_folio"
                                                label="Número de folio"
                                                required
                                                fullWidth
                                                value={values.no_folio}
                                                onChange={handleChange}
                                                error={
                                                    errors.errors &&
                                                    values.no_folio
                                                }
                                                helperText={
                                                    values.error === true &&
                                                    errors.no_folio
                                                }
                                                style={{
                                                    marginTop: "40px",
                                                    marginBottom: "0px",
                                                }}
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                id="nombre"
                                                label="Nombre"
                                                required
                                                fullWidth
                                                value={values.nombre}
                                                onChange={handleChange}
                                                error={
                                                    errors.nombre &&
                                                    values.nombre
                                                }
                                                helperText={
                                                    values.error === true &&
                                                    errors.nombre
                                                }
                                                style={{
                                                    marginTop: "40px",
                                                    marginBottom: "0px",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="descripcion"
                                                label="Descripción"
                                                fullWidth
                                                value={values.descripcion}
                                                onChange={handleChange}
                                                error={
                                                    errors.descripcion &&
                                                    values.descripcion
                                                }
                                                helperText={
                                                    values.error === true &&
                                                    errors.descripcion
                                                }
                                                style={{
                                                    marginTop: "30px",
                                                    marginBottom: "25px",
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            item
                                            spacing={2}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                alignItems="flex-start"
                                                justifyContent="flex-start"
                                                item
                                                xs="auto"
                                            >
                                                <input
                                                    accept="image/*"
                                                    id="imageFolio"
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={() =>
                                                        loadImage("imageFolio")
                                                    }
                                                />
                                                <label htmlFor="imageFolio">
                                                    <div
                                                        id="imageFolioContainer"
                                                        className="maps-skelleton"
                                                        style={
                                                            values.imageFolio
                                                                .length > 0
                                                                ? {
                                                                      backgroundImage:
                                                                          "url(" +
                                                                          URL.createObjectURL(
                                                                              values
                                                                                  .imageFolio[0]
                                                                          ) +
                                                                          ")",
                                                                      border: "none",
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {values.imageFolio
                                                            .length == 0 && (
                                                            <>
                                                                <FileUploadIcon />
                                                                <div>
                                                                    Agregar
                                                                    imagen
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </label>
                                            </Grid>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="flex-start"
                                                justifyContent="flex-end"
                                                item
                                                xs
                                            >
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    item
                                                >
                                                    <Typography>
                                                        Transcripciones
                                                    </Typography>
                                                </Grid>
                                                <TextField
                                                    id="name"
                                                    label="Autor"
                                                    required
                                                    value={transcription.name}
                                                    onChange={
                                                        handleTranscription
                                                    }
                                                    error={
                                                        errors.name &&
                                                        transcription.name
                                                    }
                                                    helperText={
                                                        transcription.error ===
                                                            true && errors.name
                                                    }
                                                    style={{
                                                        marginTop: "15px",
                                                    }}
                                                    fullWidth
                                                />
                                                <TextField
                                                    id="text"
                                                    label="Texto"
                                                    required
                                                    value={transcription.text}
                                                    onChange={
                                                        handleTranscription
                                                    }
                                                    error={
                                                        errors.text &&
                                                        transcription.text
                                                    }
                                                    helperText={
                                                        transcription.error ===
                                                            true && errors.text
                                                    }
                                                    style={{
                                                        marginTop: "40px",
                                                        marginBottom: "25px",
                                                    }}
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        addTranscription()
                                                    }
                                                >
                                                    Agregar transcripción
                                                </Button>
                                                {transcriptions &&
                                                    transcriptions.length > 0 &&
                                                    transcriptions.map(
                                                        (preview, index) => (
                                                            <Grid
                                                                key={index}
                                                                container
                                                                style={{
                                                                    marginTop:
                                                                        "17px",
                                                                }}
                                                            >
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="center"
                                                                >
                                                                    <div className="trans-title">
                                                                        {index +
                                                                            1}
                                                                        .{" "}
                                                                        {
                                                                            preview.name
                                                                        }
                                                                    </div>
                                                                    <RemoveCircleOutlineIcon
                                                                        style={{
                                                                            color: "#304A71",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                            removeTranscription(
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <div className="trans-text">
                                                                    {
                                                                        preview.text
                                                                    }
                                                                </div>
                                                                <div className="separator"></div>
                                                            </Grid>
                                                        )
                                                    )}
                                                <Grid container>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            addFolio()
                                                        }
                                                    >
                                                        Agregar folio
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Grid container>
                                    {values.folios &&
                                        values.folios.length > 0 &&
                                        values.folios.map((folio, index) => (
                                            <Grid
                                                container
                                                key={index}
                                                style={{ marginTop: "27px" }}
                                            >
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    style={{
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <div>
                                                        Folio {folio.no_folio}
                                                    </div>
                                                    <RemoveCircleOutlineIcon
                                                        style={{
                                                            color: "#304A71",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            removeFolio(index)
                                                        }
                                                    />
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <img
                                                            src={URL.createObjectURL(
                                                                folio
                                                                    .imageFolio[0]
                                                            )}
                                                            className="folio-preview"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>
                                                        <Typography>
                                                            Nombre
                                                        </Typography>
                                                        <div
                                                            className="trans-text"
                                                            style={{
                                                                marginBottom:
                                                                    "15px",
                                                            }}
                                                        >
                                                            {folio.nombre}
                                                        </div>
                                                        <Typography>
                                                            Descripción
                                                        </Typography>
                                                        <div
                                                            className="trans-text"
                                                            style={{
                                                                marginBottom:
                                                                    "15px",
                                                            }}
                                                        >
                                                            {folio.descripcion}
                                                        </div>
                                                        <Typography>
                                                            Transcripciones
                                                        </Typography>
                                                        <Grid container>
                                                            {folio.transcriptions &&
                                                                folio
                                                                    .transcriptions
                                                                    .length >
                                                                    0 &&
                                                                folio.transcriptions.map(
                                                                    (
                                                                        preview,
                                                                        index
                                                                    ) => (
                                                                        <Grid
                                                                            key={
                                                                                index
                                                                            }
                                                                            container
                                                                            style={{
                                                                                marginTop:
                                                                                    "17px",
                                                                            }}
                                                                        >
                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                justifyContent="space-between"
                                                                                alignItems="center"
                                                                            >
                                                                                <div className="trans-title">
                                                                                    {index +
                                                                                        1}
                                                                                    .{" "}
                                                                                    {
                                                                                        preview.name
                                                                                    }
                                                                                </div>
                                                                            </Grid>
                                                                            <div className="trans-text">
                                                                                {
                                                                                    preview.text
                                                                                }
                                                                            </div>
                                                                            <div className="separator"></div>
                                                                        </Grid>
                                                                    )
                                                                )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ))}
                                </Grid>
                            </>
                        )}
                        {/* por que usas clases :´v */}
                        <div className="buttons-container">
                            <Button
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Anterior
                            </Button>
                            {activeStep != 2 && (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    {completedSteps() === totalSteps() - 1
                                        ? "Finalizar"
                                        : "Siguiente"}
                                </Button>
                            )}
                            {/* -------------------------------------------- TEST -------------------------------------------- */}
                            {activeStep == 2 && (
                                <Button
                                    variant="outlined"
                                    disabled={activeStep !== 2}
                                    onClick={handleSubmit}
                                    type="button"
                                >
                                    Finalizar
                                </Button>
                            )}
                            {/* -------------------------------------------- TEST -------------------------------------------- */}
                        </div>
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
