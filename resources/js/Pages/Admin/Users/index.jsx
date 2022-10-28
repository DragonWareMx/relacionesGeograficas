import LayoutAdmin from "../../../layouts/LayoutAdmin";
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, TextField } from "@mui/material";
import "/css/common.css";
import "../../../../css/admin.css";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Slide from "@mui/material/Slide";
import { Inertia } from "@inertiajs/inertia";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "nombre", label: "Nombre", minWidth: 100 },
    {
        id: "correo",
        label: "Correo electrónico",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "symbol",
        label: "Administrador",
        minWidth: 100,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
    },
];

function createData(id, nombre, correo, admin) {
    let symbol = admin ? "✔" : "❌";
    return { id, nombre, correo, symbol };
}

const Users = ({ users }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        let prov = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            prov.push(
                createData(user.id, user.name, user.email, user.is_admin)
            );
        }
        setRows(prov);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <Container style={{ marginTop: "36px" }}>
                <Grid container justifyContent={"space-between"}>
                    <Typography variant="h5" color="primary">
                        Usuarios
                    </Typography>
                    <InertiaLink
                        href={route("users.create")}
                        style={{ textDecoration: "none" }}
                    >
                        <Button color="primary" variant="contained">
                            Agregar usuario
                        </Button>
                    </InertiaLink>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    mt={5}
                    style={{ maxHeight: 600, overflowY: "scroll" }}
                >
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell
                                            key={"button.10"}
                                            align={"center"}
                                            style={{
                                                minWidth: 170,
                                            }}
                                        >
                                            {"Acción"}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.code}
                                                >
                                                    {columns.map((column) => {
                                                        const value =
                                                            row[column.id];
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={
                                                                    column.align
                                                                }
                                                            >
                                                                {column.format &&
                                                                typeof value ===
                                                                    "number"
                                                                    ? column.format(
                                                                          value
                                                                      )
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell
                                                        key={123123}
                                                        align={"center"}
                                                    >
                                                        <InertiaLink
                                                            href={route(
                                                                "users.show",
                                                                row.id
                                                            )}
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <Button
                                                                color="primary"
                                                                variant="outlined"
                                                            >
                                                                Ver
                                                            </Button>
                                                        </InertiaLink>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={"Filas por página:"}
                        />
                    </Paper>
                </Grid>
            </Container>
        </>
    );
};

Users.layout = (page) => (
    <LayoutAdmin
        children={page}
        title="Administrar Usuarios"
        pageTitle="Relaciones Geográficas"
    />
);

export default Users;
