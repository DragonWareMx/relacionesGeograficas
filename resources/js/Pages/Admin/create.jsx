import Layout from '../../layouts/Layout'
import React, { useState } from 'react';
import {Container, Stepper, Step, StepLabel, TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import '/css/common.css'
import '../../../css/admin.css'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import '../../../css/relation.css'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';


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
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //form data
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        nombre:'',
        imageBanner:[],
        imageMin:[],
        fuentes:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
            //Handle div styles to show the image
            container.style.backgroundImage = 'url('+URL.createObjectURL(input.files[0])+')';
            container.style.border = 'none';
            for(let i=0;i<container.children.length;i++){
                container.children[i].style.display='none';
                container.children[i].style.display='none';
            };
        }
    }

    return (
        <>
            <InertiaLink href="/" className='backpage-header' >
                <ArrowBackIosIcon />
                <div>AGREGAR RELACIÓN</div>
            </InertiaLink>
            <Container style={{marginTop:'36px'}}>
                <div className='stepper-card'>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep == 0 &&
                        <>
                            <CssTextField
                                id='nombre' 
                                label='Nombre' 
                                required
                                fullWidth
                                value={values.nombre}
                                onChange={handleChange('nombre')} 
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
                                    <div id='imageBannerContainer' className='banner-skelleton'>
                                        <FileUploadIcon />
                                        <div>Imagen Banner</div>
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
                                    <div id='imageMinContainer' className='imageMin-skelleton'>
                                        <FileUploadIcon />
                                        <div>Miniatura</div>
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
                                onChange={handleChange('fuentes')} 
                                error={errors.fuentes && values.error == true && true}
                                helperText={values.error == true && errors.fuentes}
                                style={{marginTop:'25px'}}
                            />
                        </>
                    }
                    <div className='buttons-container'>
                        <Button variant='outlined' disabled={activeStep == 0 ? 'true' : 'false'}>Anterior</Button>
                        {activeStep!=2 ?
                            <Button variant='contained'>Siguiente</Button>
                            :
                            <Button variant='contained'>Finalizar</Button>
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}


Create.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Create