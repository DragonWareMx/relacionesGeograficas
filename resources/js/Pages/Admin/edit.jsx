import LayoutAdmin from "../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    Button,
    TextField,
    MenuItem,
    IconButton,
    Modal,
    Box,
    Paper,
    Snackbar,
    Autocomplete,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import "/css/common.css";
import "../../../css/admin.css";
import { usePage } from "@inertiajs/inertia-react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "../../../css/relation.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Edit } from "@mui/icons-material";
import { Inertia } from "@inertiajs/inertia";
import MuiAlert from "@mui/material/Alert";

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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Relations = ({ oldRelation, api, next, autors }) => {
    useEffect(() => {
        axios
            .get(api.url + `relaciones`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, []);

    //form data
    const { errors, status } = usePage().props;

    const [values, setValues] = useState({
        imageBanner: [],
        alt_nombre: oldRelation.alt_nombre,
        imageMin: [],
        // fuentes:oldRelation.fuentes || '',
        mapImages: [],

        error: false,
    });
    const [relation, setRelation] = useState({
        label: oldRelation.idDS + " " + oldRelation.nombre,
        idDS: oldRelation.idDS,
        cNombre: oldRelation.nombre,
    });
    const [data, setData] = useState([]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
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

    function handleSubmit(e) {
        e.preventDefault();
        let data = {
            ...values,
            nombre: relation.cNombre,
            idDS: relation.idDS,
            deletedPictos,
        };

        Inertia.post(route("admin.update", oldRelation.id), data, {
            onSuccess: () => {
                setOpenSnack(true);
            },
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
        // folio.update
    }

    const [deletedPictos, setDeletedPictos] = useState([]);
    const [oldPictos, setOldPictos] = useState(oldRelation.maps);

    function toDelete(id, index) {
        let array = deletedPictos;
        setDeletedPictos([...array, id]);
        let anotherArray = oldPictos;
        setOldPictos(anotherArray.filter((o, i) => i !== index));
    }

    const [open, setOpen] = useState(false);
    const [openTranscription, setOpenTranscription] = useState(false);
    const [folioValues, setFolioValues] = useState({
        id: "",
        no_folio: "",
        nombre: "",
        descripcion: "",
        image: "",
        transcriptions: [],

        error: false,
    });
    const [transcriptionValues, setTranscriptionValues] = useState({
        nombre: "",
        texto: "",
    });

    function selectedFolio(folio) {
        setFolioValues(() => ({
            id: folio.id,
            no_folio: folio.folio,
            nombre: folio.nombre,
            descripcion: folio.descripcion || "",
            image: null,
            oldImage: folio.min ?? folio.imagen,
            transcriptions: folio.transcriptions,
        }));
        setRadioValue(folio.type);
        setOpen(true);
    }

    function handleChangeFolio(e) {
        const key = e.target.id;
        const value = e.target.value;
        setFolioValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleChangeTranscription(e) {
        const key = e.target.id;
        const value = e.target.value;
        setTranscriptionValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function addTranscription() {
        setTranscriptionValues({
            nombre: "",
            texto: "",
        });
        setTranscriptionIndex(null);
        setOpenTranscription(true);
    }

    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessagge, setErrorMessagge] = useState(false);

    function pushTranscription() {
        if (!autor) {
            setErrorMessagge("Selecciona o agrega un nuevo autor.");
            setOpenAlert(true);
            return false;
        }
        if (!transcriptionValues?.texto) {
            setErrorMessagge("El campo texto no puede quedar vacío");
            setOpenAlert(true);
            return false;
        }
        let transcriptions = folioValues.transcriptions;
        transcriptions = [
            ...transcriptions,
            { ...transcriptionValues, nombre: autor },
        ];
        setFolioValues((values) => ({
            ...values,
            transcriptions,
        }));
        setOpenTranscription(false);
    }

    const [transcriptionIndex, setTranscriptionIndex] = useState(null);

    function editTranscription(transcription, index) {
        setTranscriptionValues({
            nombre: transcription.nombre,
            texto: transcription.texto,
        });
        setAutor(transcription.nombre);
        setTranscriptionIndex(index);
        setOpenTranscription(true);
    }

    function patchTranscription() {
        if (!autor) {
            setErrorMessagge("Selecciona o agrega un nuevo autor.");
            setOpenAlert(true);
            return false;
        }
        if (!transcriptionValues?.texto) {
            setErrorMessagge("El campo texto no puede quedar vacío");
            setOpenAlert(true);
            return false;
        }
        let transcriptions = folioValues.transcriptions;
        console.log(transcriptions, autor);
        transcriptions[transcriptionIndex] = {
            nombre: autor,
            texto: transcriptionValues.texto,
        };
        setFolioValues((values) => ({
            ...values,
            transcriptions,
        }));
        setOpenTranscription(false);
    }

    function removeTranscription() {
        let transcriptions = folioValues.transcriptions;
        transcriptions = transcriptions.filter(
            (o, i) => i !== transcriptionIndex
        );
        setFolioValues((values) => ({
            ...values,
            transcriptions,
        }));
        setOpenTranscription(false);
    }

    function changeFolioImage() {
        var input = document.getElementById("folioImage");
        if (input.files) {
            let arr = [];
            arr.push(input.files[0]);
            setFolioValues((values) => ({
                ...values,
                image: arr,
            }));
        }
    }

    function handleSubmitFolio(e) {
        e.preventDefault();
        const data = { ...folioValues, type: radioValue };
        Inertia.post(route("folio.update", [oldRelation.id, data.id]), data, {
            onSuccess: () => {
                setOpenSnack(true);
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

    function submitDelete(e) {
        e.preventDefault();
        Inertia.delete(route("admin.delete", oldRelation.id), {
            onSuccess: () => {
                setOpen(false);
                setOpenSnack(true);
            },
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    function submitDeleteFolio(e) {
        e.preventDefault();
        Inertia.delete(
            route("folio.delete", [oldRelation.id, folioValues.id]),
            {
                onSuccess: () => {
                    setOpenDeleteFolio(false);
                    setOpen(false);
                    setOpenSnack(true);
                },
                onError: () => {
                    setValues((values) => ({
                        ...values,
                        error: true,
                    }));
                },
            }
        );
    }

    function addNewFolio() {
        setFolioValues({
            id: null,
            no_folio: next ?? "",
            nombre: "",
            descripcion: "",
            image: null,
            transcriptions: [],
        });
        setOpen(true);
    }

    function handleNewFolio(e) {
        e.preventDefault();
        const data = { ...folioValues, type: radioValue };
        Inertia.post(route("folio.store", oldRelation.id), data, {
            onSuccess: () => {
                setOpenSnack(true);
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

    const [openDelete, setOpenDelete] = useState(false);
    const [openDeleteFolio, setOpenDeleteFolio] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [radioValue, setRadioValue] = useState("V");
    const [autor, setAutor] = useState("");
    const [notAvailable, setNotAvailable] = React.useState("");
    const [disabledRel, setDisabledRel] = useState(true);

    function verify(newValue) {
        setRelation(newValue);
        axios
            .get(route("verify", [newValue.idDS]))
            .then((response) => {
                if (!response.data) {
                    setDisabledRel(false);
                    setNotAvailable(false);
                    // getInfo(newValue.idDS);
                } else {
                    if (oldRelation.idDS != newValue.idDS) {
                        setDisabledRel(true);
                        setNotAvailable(true);
                    } else {
                        setDisabledRel(false);
                        setNotAvailable(false);
                    }
                }
            })
            .catch((error) => {});
    }

    return (
        <>
            <Container style={{ marginTop: "36px" }}>
                <Grid container mt={2}>
                    <Card style={{ width: "100%", marginBottom: 50 }}>
                        <CardContent>
                            <Grid
                                container
                                justifyContent={"space-between"}
                                alignContent="center"
                            >
                                <Typography variant="h5" color="primary">
                                    {oldRelation?.nombre}
                                </Typography>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => setOpenDelete(true)}
                                >
                                    Eliminar
                                </Button>
                                <Modal
                                    open={openDelete}
                                    onClose={() => setOpenDelete(false)}
                                >
                                    <Card sx={style2}>
                                        <Typography color="error" variant="h6">
                                            ¿Seguro que deseas eliminar esta
                                            relación?
                                        </Typography>
                                        <Typography>
                                            Esta acción es irreversible, se
                                            perderán todos los folios y
                                            transcripciones de esta relación
                                        </Typography>
                                        <form onSubmit={submitDelete}>
                                            <Grid
                                                container
                                                justifyContent={"space-between"}
                                                style={{ marginTop: 10 }}
                                            >
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenDelete(false)
                                                    }
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
                            </Grid>
                            <form onSubmit={handleSubmit}>
                                <FormControl
                                    fullWidth
                                    style={{
                                        marginTop: "40px",
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
                                                          cNombre:
                                                              relation.cNombre,
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
                                                    autoComplete:
                                                        "new-password", // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                    {notAvailable && (
                                        <Grid
                                            container
                                            justifyContent={"right"}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="primary"
                                            >
                                                No disponible, elija otra
                                                relación
                                            </Typography>
                                        </Grid>
                                    )}
                                </FormControl>
                                <TextField
                                    id="alt_nombre"
                                    label="Cambiar nombre"
                                    required
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
                                                    : {
                                                          backgroundImage:
                                                              "url(/storage/relaciones/" +
                                                              oldRelation.banner +
                                                              ")",
                                                      }
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
                                                    : {
                                                          backgroundImage:
                                                              "url(/storage/relaciones/" +
                                                              oldRelation.miniatura +
                                                              ")",
                                                      }
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
                                    required
                                    fullWidth
                                    value={values.fuentes}
                                    onChange={handleChange} 
                                    error={errors.fuentes && values.error == true && true}
                                    helperText={values.error == true && errors.fuentes}
                                    style={{marginTop:'25px'}}
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
                                        {oldPictos &&
                                            oldPictos.length > 0 &&
                                            oldPictos.map((map, index) => (
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
                                                            toDelete(
                                                                map.id,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                    <img
                                                        src={
                                                            "/storage/relaciones/" +
                                                            map.imagen
                                                        }
                                                        className="maps-preview"
                                                    />
                                                </Grid>
                                            ))}
                                    </Grid>
                                </div>
                                <Grid container justifyContent="right">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={disabledRel}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </form>
                            <Grid
                                container
                                spacing={3}
                                mt={2}
                                style={{ maxHeight: 350, overflowY: "scroll" }}
                            >
                                {oldRelation.invoices &&
                                    oldRelation.invoices.length &&
                                    oldRelation.invoices.map(
                                        (invoice, index) => (
                                            <Grid
                                                item
                                                xs={1}
                                                style={{ cursor: "pointer" }}
                                                key={index}
                                                onClick={() =>
                                                    selectedFolio(invoice)
                                                }
                                            >
                                                <img
                                                    src={
                                                        "/storage/relaciones/" +
                                                        (invoice.min ??
                                                            invoice.imagen)
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <Grid
                                                    container
                                                    justifyContent="center"
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        align="center"
                                                    >
                                                        Folio no.{" "}
                                                        {invoice.folio}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    )}
                            </Grid>
                            <Grid container justifyContent={"right"}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={addNewFolio}
                                >
                                    Agregar folio
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Paper sx={{ ...style, overflowY: "scroll", height: 500 }}>
                        <Grid container justifyContent={"space-between"}>
                            <Typography variant="h6">
                                {folioValues.id === null
                                    ? "Agregar Folio"
                                    : "Editar Folio"}
                            </Typography>
                            <Button
                                type="button"
                                color="error"
                                variant="outlined"
                                onClick={() => setOpenDeleteFolio(true)}
                                style={
                                    folioValues.id === null
                                        ? { display: "none" }
                                        : { display: "block" }
                                }
                            >
                                Eliminar
                            </Button>
                            <Modal
                                open={openDeleteFolio}
                                onClose={() => setOpenDeleteFolio(false)}
                            >
                                <Card sx={style2}>
                                    <Typography color="error" variant="h6">
                                        ¿Seguro que deseas eliminar este folio?
                                    </Typography>
                                    <Typography>
                                        Esta acción es irreversible, se perderán
                                        todas las transcripciones de este folio
                                    </Typography>
                                    <form onSubmit={submitDeleteFolio}>
                                        <Grid
                                            container
                                            justifyContent={"space-between"}
                                            style={{ marginTop: 10 }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    setOpenDeleteFolio(false)
                                                }
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
                        </Grid>
                        <form
                            onSubmit={
                                folioValues.id === null
                                    ? handleNewFolio
                                    : handleSubmitFolio
                            }
                        >
                            <Grid container>
                                <TextField
                                    id="no_folio"
                                    label="Número de folio"
                                    required
                                    fullWidth
                                    value={folioValues.no_folio}
                                    onChange={handleChangeFolio}
                                    error={
                                        errors.errors && folioValues.no_folio
                                    }
                                    helperText={
                                        folioValues.error === true &&
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
                                {/* LOS RADIO */}
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={radioValue}
                                        name="type"
                                        row
                                    >
                                        <FormControlLabel
                                            value="V"
                                            control={<Radio />}
                                            label="Anverso"
                                            onClick={() => setRadioValue("V")}
                                        />
                                        <FormControlLabel
                                            value="R"
                                            control={<Radio />}
                                            label="Reverso"
                                            onClick={() => setRadioValue("R")}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    id="descripcion"
                                    label="Descripción"
                                    fullWidth
                                    value={folioValues.descripcion}
                                    onChange={handleChangeFolio}
                                    error={
                                        errors.descripcion &&
                                        folioValues.descripcion
                                    }
                                    helperText={
                                        folioValues.error === true &&
                                        errors.descripcion
                                    }
                                    style={{
                                        marginTop: "15px",
                                        marginBottom: "25px",
                                    }}
                                />
                                <Grid container>
                                    <input
                                        accept="image/*"
                                        id="folioImage"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={() => changeFolioImage()}
                                    />
                                    <label htmlFor="folioImage">
                                        <div
                                            id="folioImageContainer"
                                            className={
                                                !errors.image
                                                    ? "maps-skelleton"
                                                    : "maps-skelleton-error"
                                            }
                                            style={
                                                folioValues.image !== null &&
                                                folioValues.image.length > 0
                                                    ? {
                                                          backgroundImage:
                                                              "url(" +
                                                              URL.createObjectURL(
                                                                  folioValues
                                                                      .image[0]
                                                              ) +
                                                              ")",
                                                          border: "none",
                                                      }
                                                    : {
                                                          backgroundImage:
                                                              "url(/storage/relaciones/" +
                                                              folioValues.oldImage +
                                                              ")",
                                                      }
                                            }
                                        >
                                            <FileUploadIcon />
                                            <div>Cambiar imagen</div>
                                        </div>
                                    </label>
                                </Grid>
                                <Button
                                    type="button"
                                    variant="contained"
                                    style={{
                                        marginBottom: "15px",
                                        marginTop: 15,
                                    }}
                                    onClick={addTranscription}
                                >
                                    Agregar transcripción
                                </Button>
                                {folioValues.transcriptions &&
                                    folioValues.transcriptions.length > 0 &&
                                    folioValues.transcriptions.map(
                                        (transcription, index) => (
                                            <Grid container key={index}>
                                                <Grid
                                                    container
                                                    justifyContent={
                                                        "space-between"
                                                    }
                                                >
                                                    <Typography
                                                        variant="body"
                                                        color="primary"
                                                    >
                                                        {transcription.nombre}
                                                    </Typography>
                                                    <Edit
                                                        color="primary"
                                                        onClick={() =>
                                                            editTranscription(
                                                                transcription,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        whiteSpace: "pre-line",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {transcription.texto}
                                                </Typography>
                                                <div className="separator"></div>
                                            </Grid>
                                        )
                                    )}
                            </Grid>
                            <Grid
                                container
                                justifyContent={"space-between"}
                                style={{ marginTop: 10 }}
                            >
                                <Button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    style={{ color: "#A1A1A1" }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    mt={2}
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Modal>
                {/* TRANSCRIPTIONS MODAL */}
                <Modal
                    open={openTranscription}
                    onClose={() => setOpenTranscription(false)}
                    sx={{ overflowY: "scroll" }}
                >
                    <Paper sx={style}>
                        <Grid container justifyContent="space-between">
                            <Typography variant="h6">Transcripción</Typography>
                            {transcriptionIndex !== null && (
                                <Button
                                    type="button"
                                    onClick={removeTranscription}
                                    variant="outlined"
                                    color="error"
                                >
                                    Eliminar
                                </Button>
                            )}
                        </Grid>
                        <Grid container justifyContent={"right"} mt={0.5}>
                            {autor ? (
                                <Typography variant="body2" color="primary">
                                    Autor: {autor}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="primary">
                                    Da enter si estás agregando un nuevo autor
                                </Typography>
                            )}
                        </Grid>
                        <Autocomplete
                            id="nombre"
                            freeSolo
                            // options={top100Films.map((option) => option.title)}
                            options={autors.map((row, index) => row.nombre)}
                            value={autor}
                            onChange={(event, newValue) => {
                                setAutor(newValue);
                            }}
                            required
                            renderInput={(params) => (
                                <TextField {...params} label="Autor" />
                            )}
                        />
                        <TextField
                            id="texto"
                            label="Texto"
                            required
                            fullWidth
                            value={transcriptionValues.texto}
                            onChange={handleChangeTranscription}
                            error={errors.texto && transcriptionValues.error}
                            helperText={
                                transcriptionValues.error === true &&
                                errors.texto
                            }
                            style={{ marginTop: "40px", marginBottom: "0px" }}
                            rows={8}
                            multiline
                        />
                        <Grid
                            container
                            justifyContent="space-between"
                            style={{ marginTop: 10 }}
                            alignItems="center"
                        >
                            <Button
                                type="button"
                                onClick={() => setOpenTranscription(false)}
                                style={{ color: "#A1A1A1" }}
                            >
                                Cancelar
                            </Button>
                            {transcriptionIndex === null ? (
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={pushTranscription}
                                    style={{ marginTop: 15 }}
                                >
                                    Agregar transcripción
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={patchTranscription}
                                    style={{ marginTop: 15 }}
                                >
                                    Guardar
                                </Button>
                            )}
                        </Grid>
                    </Paper>
                </Modal>
            </Container>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errorMessagge && errorMessagge}
                </Alert>
            </Snackbar>
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
