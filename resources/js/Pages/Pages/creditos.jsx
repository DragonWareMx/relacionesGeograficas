import Layout from "../../layouts/Layout";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "/css/creditos.css";
import "/css/common.css";
import { Head } from "@inertiajs/inertia-react";

const Creditos = ({ credits }) => {
    React.useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    }, []);

    return (
        <div className={"body-creditos"}>
            <Head>
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Relaciones Geográficas de la Nueva España - Créditos"
                />
                <meta
                    name="twitter:description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />

                <meta name="og:type" content="article" />
                <meta
                    name="og:url"
                    content="https://relacionesgeograficas.inah.gob.mx"
                />
                <meta
                    name="og:title"
                    content="Relaciones Geográficas de la Nueva España - Créditos"
                />
                <meta
                    name="og:description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />
                <meta
                    name="description"
                    content="Este proyecto describe la metodología y los primeros resultados del proyecto Explorando el México Colonial Temprano: Un análisis computacional a gran escala de fuentes históricas del siglo XVI."
                />
                <meta
                    name="og:image"
                    content="https://relacionesgeograficas.inah.gob.mx/img/assets/asset1.png"
                />
            </Head>
            <Container
                maxWidth={"xl"}
                style={{ paddingTop: "40px", paddingBottom: "50px" }}
            >
                <Grid container justifyContent="space-between">
                    <Grid item xs={12} sm={6} className="pd-ri-50">
                        <p className="big-text">Créditos</p>
                        <p
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: credits?.izq }}
                        ></p>
                        {/* <>
                            <p>
                                Alejandra Frausto Guerrero
                                <br />
                                Secretaria de Cultura
                            </p>
                            <p>
                                Marina Nuñez
                                <br />
                                Subsecretaria de Desarrollo Cultural
                            </p>
                            <p>
                                Omar Monroy
                                <br />
                                Titular de Unidad de Administración y Finanzas
                            </p>
                            <p>
                                Esther Hernández Torres
                                <br />
                                Directora General de Vinculación Cultural
                            </p>
                            <p>
                                Antonio Martínez
                                <br />
                                Enlace de Comunicación Social y Vocero
                            </p>
                            <p>
                                Silvano Aureoles Conejo
                                <br />
                                Gobernador de Michoacán
                            </p>
                            <p>
                                Sandra Aguilera Anaya
                                <br />
                                Secretaria de Cultura
                            </p>
                            <p>
                                Francisco Ramírez Flores
                                <br />
                                Secretario Técnico
                            </p>
                            <p>
                                Lázaro Bucio González
                                <br />
                                Delegado Administrativo
                            </p>
                            <p>
                                José Roberto Morales Ochoa
                                <br />
                                Dirección de Producción Artística y Desarrollo
                                Cultural
                            </p>
                            <p>
                                Marco Antonio Villegas García
                                <br />
                                Dirección de Patrimonio, Protección y
                                Conservación de Monumentos y Sitios Históricos
                            </p>
                            <p>
                                Manuel Alejandro Sosa González
                                <br />
                                Director Centro Cultural Clav.ero
                            </p>
                            <p>
                                Laura Elena Fraga Villicaña
                                <br />
                                Jefe del Centro de Documentación e Investigación
                                de las Artes
                            </p>
                        </> */}
                    </Grid>
                    <Grid item xs={12} sm={6} className="pd-le-50">
                        <p className="big-text">Agradecimientos</p>
                        <p
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: credits?.der }}
                        ></p>
                        {/* <>
                            <p>
                                Biblioteca de las Artes, Centro Nacional de las
                                Artes Instituto del Artesano Michoacano
                                <br />
                                Centro Cultural Clav.ero
                                <br />
                                Departamento de Conservación y Restauración de
                                Obras de Arte
                                <br />
                                –SECUM–
                                <br />
                                Departamento Editorial de la Universidad
                                Autónoma de Aguascalientes
                                <br />
                                Escuela Normal Urbana Federal “Profr. J. Jesús
                                Romero Flores” Fundación Cultural Alfredo Zalce
                                <br />
                                Museo Agrarista de Michoacán, Tzurumutaro,
                                Michoacán Museo de Arte Contemporáneo Alfredo
                                Zalce
                                <br />
                                Museo Nacional de Antropología e Historia
                                Periódico La Voz de Michoacán
                                <br />
                                Poder Judicial del Estado de Michoacán
                                Presidencia Municipal de Opopeo, Michoacán
                                <br />
                                Presidencia Municipal de Santa Ana Maya,
                                Michoacán Universidad Michoacana de San Nicolás
                                de Hidalgo
                            </p>
                            <p>
                                Agustín Cárdenas Castro Alfredo Arreguín Mendoza
                                Azucena Solórzano Ávila Eduardo León López
                                Familia Escalera Coria Familia Torres Canals
                                Felipe Castañeda Jaramillo
                                <br />
                                Felipe Cuauhtémoc Castañeda Vargas Francisco
                                García de la Torre
                                <br />
                                Francisco Rodríguez Oñate Gerónimo Mateo
                                Madrigal Juan García Chávez
                                <br />
                                Luis Palomares Frías
                                <br />
                                Marco Antonio López Prado
                                <br />
                                Mar a Auxilio Cárdenas Rodríguez Martha Esparza
                                Ramírez
                                <br />
                                Martin A. Foley Greenan Martín Feliciano Béjar
                                <br />
                            </p>
                        </> */}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Creditos.layout = (page) => (
    <Layout children={page} title="Créditos" pageTitle="Créditos" />
);

export default Creditos;
