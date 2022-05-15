import Layout from '../../layouts/Layout'
import React, { useState } from 'react';
import {Container, Stepper, Step, StepLabel, TextField, Typography, StepButton, IconButton, Paper} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import '/css/common.css'
import '../../../css/admin.css'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import '../../../css/relation.css'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: '#4D7DB3',
    '&:hover': {
        backgroundColor: '#4D7DB3',
    },
    borderRadius: 0,
    padding: '20px 40px',
    fontFamily: 'Nunito'
}));

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#D9D9D9',
            borderRadius: '10px'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#304A71',
        },
        '&:hover fieldset': {
            borderColor: '#D9D9D9',
        },
    },
    '& label.Mui-focused': {
        color: '#304A71',
    },
    '& label.Mui': {
        color: '#D9D9D9',
        fontSize:'14px'
    },
  });

const steps = ['NOMBRE', 'MAPAS', 'FOLIOS']
const Create = () => {
    //Control steps
    const [activeStep, setActiveStep] = React.useState(2);
    const [completed, setCompleted] = React.useState({});
    const [skipped, setSkipped] = React.useState(new Set());

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

    //form data
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        nombre:'',
        imageBanner:[],
        imageMin:[],
        fuentes:'',
        mapa_geografico: '',
        mapImages: [],
        folios:[],
        descripcion:'',
        imageFolio:[],
    });

    const [transcription, setTranscription] = useState({
        name:'',
        text:'',
    });

    const [transcriptions, setTranscriptions] = useState([]);

    function addTranscription(){
        let trans={
            name:transcription.name,
            text:transcription.text
        };
        setTranscriptions([
            ...transcriptions,
            trans
        ]);
        setTranscription((values) => ({
            name:'',
            text:'',
        }));
    }

    function addFolio(){
        var folios = values.folios.slice();
        let folio={
            descripcion:values.descripcion,
            imageFolio:values.imageFolio,
            transcriptions:transcriptions,
        }
        folios.push(folio);
        setValues((values) => ({
            ...values,
            folios: folios,
            imageFolio:[],
            descripcion:'',
        }));
        setTranscriptions([]);
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleTranscription(e) {
        const key = e.target.id;
        const value = e.target.value
        setTranscription(values => ({
            ...values,
            [key]: value,
        }))
    }

    function loadImage(id){
        var input = document.getElementById(id);
        var container=document.getElementById(id+'Container');
        if (input.files) {
            let arr=[];
            arr.push(input.files[0]);
            setValues((values) => ({
                ...values,
                [id]: arr,
            }));
        }
    }

    function addImages(id){
        var input = document.getElementById(id);
        if (input.files) {
            var arr = values[id].slice();

            for(var i=0;i<input.files.length;i++){
                arr.push(
                    input.files[i]
                );
            }
            setValues((values) => ({
                ...values,
                [id]: arr,
            }));
        }
    }

    function removeImg(id,index){
        var arr=values[id].slice();
        setValues((values) => ({
            ...values,
            [id]:arr.filter((o, i) => i !== index)
        }));
    }

    return (
        <>
            <InertiaLink href="/" className='backpage-header' >
                <ArrowBackIosIcon />
                <div>AGREGAR RELACIÓN</div>
            </InertiaLink>
            <Container style={{marginTop:'36px'}}>
                <div className='stepper-card'>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {/* {
                        allStepsCompleted() || (
                            <>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                Step {activeStep + 1} already completed
                            </Typography>
                            ) : (
                            <Button onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Complete Step'}
                            </Button>
                            ))}
                            </>
                        )
                    } */}
                    {completed[activeStep] &&
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Paso {activeStep + 1} completado
                        </Typography>
                        
                    }
                    {activeStep == 0 &&
                        <>
                            <CssTextField
                                id='nombre' 
                                label='Nombre' 
                                required
                                fullWidth
                                value={values.nombre}
                                onChange={handleChange} 
                                error={errors.nombre && values.error == true && true}
                                helperText={values.error == true && errors.nombre}
                                style={{marginTop:'40px',marginBottom:'25px'}}
                            />
                            <div className='flex-container'>
                                {/* BANNER IMAGE */}
                                <input
                                    accept="image/*"
                                    id="imageBanner"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={()=>loadImage('imageBanner')}
                                />
                                <label htmlFor="imageBanner">
                                    <div id='imageBannerContainer' 
                                        className='banner-skelleton' 
                                        style={values.imageBanner.length>0 ? {backgroundImage:'url('+URL.createObjectURL(values.imageBanner[0])+')',border:'none'} : {}}
                                    >
                                        {values.imageBanner.length==0 && 
                                            <>
                                                <FileUploadIcon />
                                                <div>Imagen Banner</div>
                                            </>
                                        }
                                    </div>
                                </label>
                                {/* MIN IMAGE */}
                                <input
                                    accept="image/*"
                                    id="imageMin"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={()=>loadImage('imageMin')}
                                />
                                <label htmlFor="imageMin">
                                    <div id='imageMinContainer' 
                                        className='imageMin-skelleton' 
                                        style={values.imageMin.length>0 ? {backgroundImage:'url('+URL.createObjectURL(values.imageMin[0])+')',border:'none'} : {}}
                                    >
                                        {values.imageMin.length == 0 &&
                                            <>
                                                <FileUploadIcon />
                                                <div>Miniatura</div>
                                            </>
                                        }
                                    </div>
                                </label>
                            </div>
                            <CssTextField
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
                            />
                        </>
                    }
                    {activeStep == 1 &&
                        <>
                            <CssTextField
                                id='mapa_geografico' 
                                label='Mapa geográfico' 
                                required
                                fullWidth
                                value={values.mapa_geografico}
                                onChange={handleChange} 
                                error={errors.mapa_geografico && values.mapa_geografico == true && true}
                                helperText={values.error == true && errors.nombre}
                                style={{marginTop:'40px',marginBottom:'25px'}}
                            />
                            <div className='title'>Mapas pictográficos</div>
                            <div className='flex-container'>
                                {/* IMAGENES */}
                                <Grid container spacing={1}>
                                        {/* MAP IMAGES */}
                                        <input
                                            accept="image/*"
                                            id="mapImages"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={()=>addImages('mapImages')}
                                        />
                                        <label htmlFor="mapImages">
                                            <div id='mapImagesContainer' className='maps-skelleton'>
                                                <FileUploadIcon />
                                                <div>Agregar mapa</div>
                                            </div>
                                        </label>
                                        {values.mapImages && values.mapImages.length > 0 && values.mapImages.map((preview, index) => (
                                            <Grid key={index} item>
                                                <IconButton aria-label="delete" 
                                                    size="small"
                                                    style={{ position: 'absolute', zIndex: '999', 
                                                    marginTop:'5px',
                                                    marginLeft:'5px',
                                                    backgroundColor:'rgba(232,232,232,0.7)',
                                                    color: '#F4F4F4'}}
                                                    onClick={()=>removeImg('mapImages',index)}
                                                    >
                                                    <CloseIcon fontSize="inherit"/>
                                                </IconButton>
                                                <img src={URL.createObjectURL(preview)} className="maps-preview" />
                                            </Grid>
                                        ))}
                                    </Grid>
                            </div>
                        </>
                    }
                    {activeStep == 2 &&
                        <>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography>
                                    Folios
                                </Typography>
                            </Grid>

                            <Paper
                                style={{paddingLeft: "30px", paddingRight: "30px", paddingBottom: "30px"}}
                            >
                                <Grid
                                    container
                                >
                                    <TextField
                                        id='descripcion' 
                                        label='Descripción' 
                                        required
                                        fullWidth
                                        value={values.descripcion}
                                        onChange={handleChange} 
                                        error={errors.descripcion && values.descripcion}
                                        helperText={values.error === true && errors.nombre}
                                        style={{marginTop:'40px',marginBottom:'25px'}}
                                    />
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
                                                style={{ display: 'none' }}
                                                onChange={()=>loadImage('imageFolio')}
                                            />
                                            <label htmlFor="imageFolio">
                                                <div 
                                                    id='imageFolioContainer' 
                                                    className='maps-skelleton'
                                                    style={values.imageFolio.length>0 ? {backgroundImage:'url('+URL.createObjectURL(values.imageFolio[0])+')',border:'none'} : {}}
                                                >
                                                    {values.imageFolio.length==0 && 
                                                        <>
                                                        <FileUploadIcon />
                                                        <div>Agregar imagen</div>
                                                        </>
                                                    }
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
                                                id='name' 
                                                label='Nombre' 
                                                required
                                                value={transcription.name}
                                                onChange={handleTranscription} 
                                                error={errors.name && transcription.name}
                                                helperText={transcription.error === true && errors.name}
                                                style={{marginTop:'15px'}}
                                                fullWidth
                                            />
                                            <TextField
                                                id='text' 
                                                label='Texto' 
                                                required
                                                value={transcription.text}
                                                onChange={handleTranscription} 
                                                error={errors.text && transcription.text}
                                                helperText={transcription.error === true && errors.text}
                                                style={{marginTop:'40px',marginBottom:'25px'}}
                                                fullWidth
                                                rows={4}
                                                multiline
                                            />
                                            <Button
                                                variant='contained'
                                                onClick={()=>addTranscription()}
                                            >
                                                Agregar transcripción
                                            </Button>
                                            {transcriptions && transcriptions.length > 0 && transcriptions.map((preview, index) => (
                                                <Grid key={index} container>
                                                    <div className='flex-container'>
                                                        <div>{index+1}. {preview.name}</div>
                                                        <CloseIcon />
                                                    </div>
                                                    <div>{preview.text}</div>
                                                    <div className='separator'></div>
                                                </Grid>
                                            ))}
                                            {transcriptions && transcriptions.length > 0 &&
                                                <Button
                                                    variant='contained'
                                                    onClick={()=>addFolio()}
                                                >
                                                    Agregar folio
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </>
                    }
                    {/* por que usas clases :´v */}
                    <div className='buttons-container'>
                        <Button
                            variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                                Anterior
                        </Button>
                        {/* {activeStep!=2 ?
                            <Button variant='contained'>Siguiente</Button>
                            :
                            <Button variant='contained'>Finalizar</Button>
                        } */}

                        {/* <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button> */}
                        {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                        </Button> */}
                        {/* {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} already completed
                        </Typography>
                        ) : ( */}
                        <Button
                            variant='contained'
                            onClick={handleNext}
                        >
                            {completedSteps() === totalSteps() - 1
                            ? 'Finalizar'
                            : 'Siguiente'}
                        </Button>
                        {/* ))} */}
                    </div>
                </div>
            </Container>
        </>
    )
}


Create.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Create