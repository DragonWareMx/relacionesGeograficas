import React, { useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { InertiaLink } from "@inertiajs/inertia-react";
import Log from "laravel-mix/src/Log";
import { Inertia } from "@inertiajs/inertia";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

export default function Header() {
    const [didMount, setDidMount] = useState(false)
    const [values, setValues] = useState({
        search: "",
    })
    
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.get('/#alfabetico2', values)
    }

    useEffect(() => {
        if (!didMount) {
            return;
        }
    
        const delayDebounceFn = setTimeout(() => {
            Inertia.get(
                '/#alfabetico2',
                {
                    search: values?.search?.length ? values.search : undefined
                },
                {
                    only: ["relaciones"],
                    replace: true
                }
            )
        }, 500);
      
        return () => clearTimeout(delayDebounceFn);
    }, [values.search])

    useEffect(() => {
        setDidMount(true)
    }, [])

    return (

        <Box sx={{ flexGrow: 1 }}>
            
            <AppBar position='static' style={{boxShadow:'none'}}>
                <Toolbar style={{backgroundColor:'#383a3a'}}>
                    <Container maxWidth={'xl'} style={{display:'flex',flexWrap:'wrap',padding:'10px 0px 10px 0px', justifyContent:'space-between'}} alignItems="center" >
                        <a href="/" style={{textDecoration:'none',display:'flex',flexWrap:'wrap', color:'white'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Avatar alt="RG" src="/img/assets/img.png" id="no-mg-1540-l" style={{marginRight:'8px',marginLeft:'24px'}} />
                            <Typography
                                component="div"
                                sx={{ flexGrow: 1, display: { sm: 'block' } }}
                                style={{fontFamily:'Noto Sans'}}
                            >
                                Relaciones Geográficas
                                de la Nueva España (1577 - 1585)
                            </Typography>
                        </div>
                        </a>
                        
                        <form onSubmit={handleSubmit} noValidate>
                            <Search id="search-bar">
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Buscar…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    id="search"
                                    value={values.search}
                                    onChange={handleChange}
                                />
                            </Search>
                        </form>
                    </Container>
                </Toolbar>
            </AppBar>
            
      </Box>
    )
}