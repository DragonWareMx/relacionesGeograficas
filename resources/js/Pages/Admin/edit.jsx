import Layout from '../../layouts/Layout'
import React, { useState, useEffect } from 'react';
import {Container,Typography, Grid, Card, 
    CardContent, FormControl, InputLabel, 
    Select, Button, TextField, MenuItem,
    IconButton,
    Modal,
    Box,
    Paper,
} from '@mui/material';
import '/css/common.css'
import '../../../css/admin.css'
import { usePage } from '@inertiajs/inertia-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import '../../../css/relation.css'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Edit } from '@mui/icons-material';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


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


    const [open, setOpen] = useState(false);
    const [openTranscription, setOpenTranscription] = useState(false);
    const [folioValues, setFolioValues] = useState({
        id:'',
        no_folio: '',
        nombre:'',
        descripcion:'',
        image: '',
        transcriptions: [],

        error: false
    });
    const [transcriptionValues, setTranscriptionValues] = useState({
        nombre: '',
        texto:'',
    });

    function selectedFolio(folio){
        setFolioValues(() => ({
            id:folio.id,
            no_folio: folio.folio,
            nombre: folio.nombre,
            descripcion: folio.descripcion,
            image: null,
            oldImage:folio.imagen,
            transcriptions: folio.transcriptions
        }));
        setOpen(true);
    }

    function handleChangeFolio(e) {
        const key = e.target.id;
        const value = e.target.value
        setFolioValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleChangeTranscription(e) {
        const key = e.target.id;
        const value = e.target.value
        setTranscriptionValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function addTranscription(){
        setTranscriptionValues({
            nombre:'',
            texto:''
        });
        setTranscriptionIndex(null);
        setOpenTranscription(true);
    }

    function pushTranscription(){
        let transcriptions = folioValues.transcriptions;
        transcriptions=[...transcriptions,
            transcriptionValues
        ];
        setFolioValues(values => ({
            ...values,
            transcriptions,
        }));
        setOpenTranscription(false);
    }

    const [transcriptionIndex, setTranscriptionIndex] = useState(null);

    function editTranscription(transcription, index){
        setTranscriptionValues({
            nombre:transcription.nombre,
            texto:transcription.texto
        });
        setTranscriptionIndex(index);
        setOpenTranscription(true);
    }

    function patchTranscription(){
        let transcriptions = folioValues.transcriptions;
        transcriptions[transcriptionIndex] = {nombre:transcriptionValues.nombre,texto:transcriptionValues.texto};        
        setFolioValues(values => ({
            ...values,
            transcriptions,
        }));
        setOpenTranscription(false);
    }

    function removeTranscription(){
        let transcriptions = folioValues.transcriptions;
        transcriptions = transcriptions.filter((o, i) => i !== transcriptionIndex);
        setFolioValues(values => ({
            ...values,
            transcriptions
        }));
        setOpenTranscription(false);
    }

    function changeFolioImage(){
        var input = document.getElementById('folioImage');
        if (input.files) {
            let arr=[];
            arr.push(input.files[0]);
            setFolioValues((values) => ({
                ...values,
                image: arr,
            }));
        }
    }

    function handleSubmitFolio(e){
        e.preventDefault();
        const data=folioValues;
        console.log("👻 🥲 👻 🥲 👻 🥲 👻 🥲  ~ file: edit.jsx ~ line 296 ~ handleSubmitFolio ~ data", data);
        Inertia.post(route('folio.update'), data, {
            onSuccess: () => {

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
                            <Grid container spacing={3} mt={2} style={{maxHeight:350,overflowY:'scroll'}}>
                                {oldRelation.invoices && oldRelation.invoices.length && oldRelation.invoices.map((invoice, index)=>(
                                    <Grid item 
                                        xs={1} 
                                        style={{cursor:'pointer'}}
                                        key={index}
                                        onClick={()=>selectedFolio(invoice)}
                                    >
                                        <img 
                                            src={'/storage/relaciones/'+invoice.imagen}
                                            style={{width:'100%', objectFit:'cover'}}
                                        />
                                        <Grid container justifyContent='center'>
                                            <Typography variant='body2' align='center'>
                                                Folio no. {invoice.folio}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Modal
                    open={open}
                    onClose={()=>setOpen(false)}
                >
                    <Paper sx={style}>
                        <Typography variant="h6">
                            Editar folio
                        </Typography>
                        <form onSubmit={handleSubmitFolio}>
                            <Grid container>
                                <TextField 
                                    id='no_folio'
                                    label='Número de folio'
                                    required
                                    fullWidth
                                    value={folioValues.no_folio}
                                    onChange={handleChangeFolio}
                                    error={errors.errors && folioValues.no_folio}
                                    helperText={folioValues.error === true && errors.no_folio}
                                    style={{marginTop:'40px',marginBottom:'0px'}}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id='nombre' 
                                    label='Nombre' 
                                    required
                                    fullWidth
                                    value={folioValues.nombre}
                                    onChange={handleChangeFolio} 
                                    error={errors.nombre && folioValues.nombre}
                                    helperText={folioValues.error === true && errors.nombre}
                                    style={{marginTop:'40px',marginBottom:'0px'}}
                                />
                                <TextField
                                    id='descripcion' 
                                    label='Descripción' 
                                    required
                                    fullWidth
                                    value={folioValues.descripcion}
                                    onChange={handleChangeFolio} 
                                    error={errors.descripcion && folioValues.descripcion}
                                    helperText={folioValues.error === true && errors.descripcion}
                                    style={{marginTop:'30px',marginBottom:'25px'}}
                                />
                                <Grid container>
                                    <input
                                        accept="image/*"
                                        id="folioImage"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={()=>changeFolioImage()}
                                    />
                                    <label htmlFor="folioImage">
                                        <div 
                                            id='folioImageContainer' 
                                            className={'maps-skelleton'}
                                            style={ folioValues.image !== null && folioValues.image.length>0 
                                                ? {backgroundImage:'url('+URL.createObjectURL(folioValues.image[0])+')',border:'none'} 
                                                : {backgroundImage: 'url(/storage/relaciones/'+folioValues.oldImage+')'}}
                                        >
                                            <FileUploadIcon 
                                        />
                                            <div>Cambiar imagen</div>
                                        </div>
                                    </label>
                                </Grid>
                                <Button 
                                    type='button' 
                                    variant='contained' 
                                    style={{marginBottom:'15px', marginTop:15}}
                                    onClick={addTranscription}
                                >
                                    Agregar transcripción
                                </Button>
                                {folioValues.transcriptions && folioValues.transcriptions.length > 0 
                                    && folioValues.transcriptions.map((transcription, index)=>(
                                    <Grid container key={index}>
                                        <Grid container justifyContent={'space-between'}>
                                            <Typography variant='body' color='primary'>{transcription.nombre}</Typography>
                                            <Edit color='primary' onClick={()=>editTranscription(transcription, index)}/>
                                        </Grid>
                                        <Typography variant='body2' 
                                            style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}
                                        >
                                            {transcription.texto}
                                        </Typography>
                                        <div className='separator'></div>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid container justifyContent={'right'}>
                                <Button type='submit' variant='contained' mt={2}>
                                    Guardar
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Modal>
                {/* TRANSCRIPTIONS MODAL */}
                <Modal
                    open={openTranscription}
                    onClose={()=>setOpenTranscription(false)}
                >
                    <Paper sx={style}>
                        <Grid container justifyContent='space-between'>
                            <Typography variant="h6">
                                Transcripción
                            </Typography>
                            <Button 
                                type='button' 
                                onClick={removeTranscription}
                                variant='outlined'
                                color='error'
                            >
                                Eliminar
                            </Button>
                        </Grid>
                        <TextField
                            id='nombre' 
                            label='Nombre' 
                            required
                            fullWidth
                            value={transcriptionValues.nombre}
                            onChange={handleChangeTranscription} 
                            error={errors.nombre && transcriptionValues.error}
                            helperText={transcriptionValues.error === true && errors.nombre}
                            style={{marginTop:'40px',marginBottom:'0px'}}
                        />
                        <TextField
                            id='texto' 
                            label='Texto' 
                            required
                            fullWidth
                            value={transcriptionValues.texto}
                            onChange={handleChangeTranscription} 
                            error={errors.texto && transcriptionValues.error}
                            helperText={transcriptionValues.error === true && errors.texto}
                            style={{marginTop:'40px',marginBottom:'0px'}}
                            rows={8}
                            multiline
                        />
                        {transcriptionIndex === null ?
                            <Button 
                                variant='contained' 
                                type='button' 
                                onClick={pushTranscription} 
                                style={{marginTop:15}}
                            >
                                Agregar transcripción
                            </Button>
                            :
                            <Button 
                                variant='contained' 
                                type='button' 
                                onClick={patchTranscription} 
                                style={{marginTop:15}}
                            >
                                Guardar
                            </Button>
                        }
                    </Paper>
                </Modal>
            </Container>
        </>
    )
}


Relations.layout = page => <Layout children={page} title="Agregar Relación" pageTitle="Relaciones Geográficas" />

export default Relations