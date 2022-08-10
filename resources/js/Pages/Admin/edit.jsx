import Layout from '../../layouts/Layout'
import React, { useState, useEffect } from 'react';
import {Container,Typography, Grid, Card, 
    CardContent, FormControl, InputLabel, 
    Select, Button, TextField, MenuItem,
    IconButton,
} from '@mui/material';
import '/css/common.css'
import '../../../css/admin.css'
import { usePage } from '@inertiajs/inertia-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Inertia } from '@inertiajs/inertia';

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


const Relations = ({oldRelation}) => {

    useEffect(() => {
        axios
            .get(`https://decm.arqueodata.com/api/v1/relaciones`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, []);


    //form data
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        imageBanner: [],
        imageMin:[],
        fuentes:oldRelation.fuentes || '',
        mapImages: [],

        error: false
    });
    const [relation, setRelation] = useState(JSON.stringify({idDS: oldRelation.idDS,cNombre: oldRelation.nombre}));
    const [data, setData] = useState([]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleChangeSelect = (event) => {
        setRelation(event.target.value);
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


    function handleSubmit(e) {
        e.preventDefault();
        let finalRelation=JSON.parse(relation);
        let data={...values,nombre:finalRelation.cNombre, idDS:finalRelation.idDS, deletedPictos}
        console.log(data);

        Inertia.post(route('admin.update', oldRelation.id), data, {
            onSuccess: () => {

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
    
    function toDelete(id, index){
        let array = deletedPictos;
        setDeletedPictos([...array,id])
        let anotherArray = oldPictos;
        setOldPictos(
            anotherArray.filter((o, i) => i !== index)
        )   
    }

    return (
        <>
            <Container style={{marginTop:'36px'}}>
                <Typography variant='h5' color='primary'>{oldRelation?.nombre}</Typography>
                <Grid container mt={2}>
                    <Card style={{width:'100%', marginBottom:50}}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth style={{marginTop:'40px',marginBottom:'25px'}}>
                                    <InputLabel id="relation-names">Nombre</InputLabel>
                                    <Select
                                        labelId="relation-names"
                                        id="nombre"
                                        value={relation || ''}
                                        label="Nombre"
                                        onChange={handleChangeSelect}
                                        error={errors.nombre && values.error == true && true}
                                        helperText={values.error == true && errors.nombre}
                                    >
                                        {data && data.length > 0 && data.map((rel, index) => (
                                            <MenuItem 
                                                key={index} 
                                                value={JSON.stringify({idDS: rel.idDS,cNombre: rel.cNombre})}
                                            >
                                                {rel.idDS+' '+rel.cNombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                            className={errors.imageBanner ? 'banner-skelleton error' : 'banner-skelleton'} 
                                            style={values.imageBanner.length>0 ? 
                                                {backgroundImage:'url('+URL.createObjectURL(values.imageBanner[0])+')',border:'none'} 
                                                : {backgroundImage: 'url(/storage/relaciones/'+oldRelation.banner+')'}}
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
                                            className={errors.imageMin ? 'imageMin-skelleton error' : 'imageMin-skelleton'} 
                                            style={values.imageMin.length>0 ? {backgroundImage:'url('+URL.createObjectURL(values.imageMin[0])+')',border:'none'} 
                                                : {backgroundImage: 'url(/storage/relaciones/'+oldRelation.miniatura+')'}}
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
                                            <div 
                                                id='mapImagesContainer' 
                                                className={errors.mapImages ? 'maps-skelleton error' : 'maps-skelleton'}>
                                                <FileUploadIcon 
                                            />
                                                <div>Agregar mapas</div>
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
                                        {oldPictos && oldPictos.length > 0 && oldPictos.map((map, index) =>(
                                            <Grid key={index} item>
                                                <IconButton aria-label="delete" 
                                                    size="small"
                                                    style={{ position: 'absolute', zIndex: '999', 
                                                    marginTop:'5px',
                                                    marginLeft:'5px',
                                                    backgroundColor:'rgba(232,232,232,0.7)',
                                                    color: '#F4F4F4'}}
                                                    onClick={()=>toDelete(map.id, index)}
                                                >
                                                    <CloseIcon fontSize="inherit"/>
                                                </IconButton>
                                                <img src={'/storage/relaciones/'+map.imagen} className="maps-preview" />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                                <Grid container justifyContent='right'>
                                    <ColorButton type='submit'>Guardar</ColorButton>            
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </>
    )
}


Relations.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Relations