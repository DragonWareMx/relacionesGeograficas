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
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{boxShadow:'none'}}>
                <Toolbar style={{backgroundColor:'#383a3a'}}>
                    <Container maxWidth={'xl'} style={{display:'flex',flexWrap:'wrap',padding:'10px 0px 10px 0px'}} alignItems="center">
                        <Avatar alt="RG" src="/img/assets/img.png" id="no-mg-1540-l" style={{marginRight:'8px',marginLeft:'24px'}} />
                        <Typography
                            component="div"
                            sx={{ flexGrow: 1, display: { sm: 'block' } }}
                            style={{fontFamily:'Noto Sans'}}
                        >
                            Relaciones Geográficas
                            <div style={{fontSize:'14px', fontWeight:'300'}}>de la Nueva España (1577 - 1585)</div>
                        </Typography>
                        <Search id="search-bar">
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Container>
                </Toolbar>
            </AppBar>
      </Box>
    )
}