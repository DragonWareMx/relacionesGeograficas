import Layout from '../../layouts/Layout'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

const Home = ({ }) => {

    return (

        <div className="row">
            <Div>oski putoski 안녕</Div>
            <Stack direction="row" spacing={2}>
                <Avatar>H</Avatar>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </Stack>
        </div>
    )
}

Home.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Home
