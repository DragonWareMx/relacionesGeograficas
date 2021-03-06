import Layout from "../../layouts/Layout";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "/css/common.css";
import { InertiaLink } from "@inertiajs/inertia-react";
import "../../../css/relation.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { LinearProgress } from "@mui/material";

//iconos
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SwiperCore, { Navigation, Virtual, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { MapInteractionCSS } from "react-map-interaction";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Translate } from "@mui/icons-material";

/** Leaflet Imports **/
import L from "leaflet";
import {
    MapContainer,
    Marker,
    TileLayer,
    Circle,
    CircleMarker,
    Polyline,
    Polygon,
    Rectangle,
    Popup,
    Tooltip,
    GeoJSON,
    LayerGroup,
    LayersControl,
    ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

/** Axios Imports **/
import axios from "axios";

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

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

const TranslateButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.8)",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    borderRadius: 0,
    padding: "10px 40px",
    fontFamily: "Nunito",
}));

const TranslateButtonActive = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.8)",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.9)",
    },
    borderRadius: 0,
    padding: "10px 40px",
    fontFamily: "Nunito",
    border: "6px solid #F25E0D",
}));

const Relacion = ({ relation }) => {
    console.log(relation);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    // const [data, setData] = useState({
    //     infoMapa: {
    //         centro: {
    //             lat: "20.0853643565",
    //             long: "-98.76998",
    //         },
    //         limites: {
    //             visible: false,
    //             nE: {
    //                 lat: null,
    //                 long: null,
    //             },
    //             nO: {
    //                 lat: null,
    //                 long: null,
    //             },
    //             sE: {
    //                 lat: null,
    //                 long: null,
    //             },
    //             sO: {
    //                 lat: null,
    //                 long: null,
    //             },
    //         },
    //         zoom: {
    //             max: 12,
    //             min: 0,
    //             inicial: 4,
    //         },
    //         mapasBase: {
    //             0: {
    //                 nombre: "ESRI",
    //                 atribution: "ESRI",
    //                 link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    //             },
    //         },
    //     },
    // });

    useEffect(() => {
        axios
            .get(`https://decm.arqueodata.com/api/v1/mapa/94`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, []);

    function toggleDrawer() {
        setOpen(!open);
    }

    const [contMap, setContMap] = useState("geo");

    const folios = [
        "/img/provisional/Culhuacan1.jpg",
        "/img/provisional/Culhuacan2.jpg",
        "/img/provisional/Culhuacan3.jpg",
        "/img/provisional/Culhuacan4.jpg",
        "/img/provisional/Culhuacan5.jpg",
        "/img/provisional/Culhuacan6.jpg",
        "/img/provisional/Culhuacan7.jpg",
        "/img/provisional/Culhuacan8.jpg",
    ];

    const [folioActive, setFolioActive] = useState(0);

    const changeFolio = (index) => {
        setContMap("lienzo");
        setFolioActive(index);
        setOpen(false);
        setIdActive(index);
    };

    const [idActive, setIdActive] = useState(0);

    const [activeTranslate, setActiveTranslate] = useState("acuna");

    const textoFolios = [
        {
            acuna: "En el pueblo de Culhuacan desta Nueva Espa??a, jurisdicci??n del corregimiento de Mexicaltzingo y su partido, cuya encomienda es de DON FERNANDO DE O??ATE, hijo leg??timo de CRIST??BAL DE O??ATE,  en diecisiete d??as del mes de enero de mil y quinientos y ochenta a??os, el ilustre se??or GONZALO GALLEGOS, corregidor del, y por presencia de m??, el escribano y receptor de su Majestad yuso escrito, dijo que, por cuanto su Majestad, por una su Instrucci??n, tiene prove??do y mandado que todos los corregidores y alcaldes mayores desta Nueva Espa??a hagan averiguaci??n de la calidad, temple y descripci??n de la tierra, y otras cosas contenidas en la dicha Instrucci??n, para  cumplir lo que por ella se manda, como tal corregidor del dicho pueblo y su partido hizo las diligencias siguientes:",
            valadez:
                "In the town of Culhuacan in New Spain, jurisdiction of the township of Mexicaltzingo and its party, whose charge is DON FERNANDO DE O??ATE, legitimate son of CRIST??BAL DE O??ATE, on the seventeenth day of the month of January, one thousand and five hundred and eighty years old, the illustrious Mr. GONZALO GALLEGOS, mayor of, and in the presence of me, the notary and receiver of His Majesty and I use the writing, said that, since His Majesty, through his Instruction, has provided and ordered that all the mayors and mayors of this New Spain make an investigation of the quality, temper and description of the land, and other things contained in the said Instruction, to comply with what is ordered by it, as such corregidor of the said town and its party did the following steps:",
            garza: "Na cidade de Culhuacan na Nova Espanha, jurisdi????o da comuna de Mexicaltzingo e sua parte, cujo cargo ?? DON FERNANDO DE O??ATE, filho leg??timo de CRIST??BAL DE O??ATE, no dia dezessete do m??s de janeiro de mil e quinhentos e oitenta anos, o ilustre Sr. GONZALO GALLEGOS, prefeito de, e na minha presen??a, not??rio e s??ndico de Sua Majestade e eu uso a escrita, disse que, j?? que Sua Majestade, por sua Instru????o, providenciou e ordenou que todos os prefeitos e prefeitos desta Nova Espanha fazem uma investiga????o da qualidade, temperamento e descri????o da terra, e outras coisas contidas na referida Instru????o, para cumprir o que ?? ordenado por ela, como corregedor da referida cidade e seus partido fez os seguintes passos:",
        },
        {
            acuna: "Y luego, incontinente, el dicho se??or corregidor dijo que, para hacer las dichas diligencias y declaraciones de los naturales del dicho pueblo de Culhuacan, conven??a hacer parecer ante s?? al gobernador, alcaldes, regidores y principales del, y que, para el dicho efecto, los hab??a mandado venir y estaban presentes, para hacer con ellos la diligencia que conviniese, mediante DIEGO DE PAZ, teniente del dicho partido e int??rprete de la lengua mexicana que hablan los dichos indios; y, para ello, le nombr?? por tal int??rprete ante los cuales, y de FRAY JUAN N????EZ, prior del monasterio del SE??OR SANTO AGUST??N del dicho pueblo, que presente estaba y entend??a la lengua mexicana. Y se juntaron para este efecto y declaraci??n de la dicha Instrucci??n, y dijeron y declararon lo siguiente:",
            valadez:
                "And then, incontinently, the said corregidor said that, in order to carry out the said proceedings and declarations of the natives of the said town of Culhuacan, it was convenient to make the governor, mayors, aldermen and principals appear before him, and that, for said effect , had ordered them to come and they were present, to do with them the appropriate diligence, through DIEGO DE PAZ, lieutenant of the said party and interpreter of the Mexican language spoken by the said Indians; and, for this, he appointed him by such interpreter before whom, and of FRAY JUAN N????EZ, prior of the monastery of SE??OR SANTO AGUST??N of said town, who was present and understood the Mexican language. And they met for this purpose and declaration of said Instruction, and said and declared the following:",
            garza: "E ent??o, incontinente, o dito corregedor disse que, para realizar os ditos atos e declara????es dos nativos da dita cidade de Culhuacan, era conveniente fazer comparecer perante ele o governador, prefeitos, vereadores e diretores, e que , para o efeito, ordenou-lhes que viessem e estiveram presentes, para fazer com eles as devidas dilig??ncias, por interm??dio de DIEGO DE PAZ, tenente da referida parte e int??rprete da l??ngua mexicana falada pelos referidos ??ndios; e, para isso, o nomeou por tal int??rprete perante o qual, e de FRAY JUAN N????EZ, prior do mosteiro de SE??OR SANTO AGUST??N dessa cidade, que estava presente e entendia a l??ngua mexicana. E eles se reuniram para este fim e declara????o da referida Instru????o, e disseram e declararam o seguinte:",
        },
        {
            acuna: "Al primero cap??tulo, dijo el dicho padre prior que este dicho pueblo de Culhuacan, que tiene a su cargo y donde administra los santos sacramentos, tiene dos nombres: el uno, profano y gent??lico, de que los naturales d??l usaban en tiempo de su gentilidad, y al presente lo usan, que es Culhuacan.  Y dijo que el nombre antiguo, en nuestro lenguaje, es ???una punta de cerro corvado???. \n  Al segundo cap??tulo, dijeron los dichos se??or corregidor y padre prior que la conquista y conquistador del dicho pueblo y su comarca fue el mismo que gan?? y conquist?? a la ciudad de M??xico, de la cual dista dos leguas el dicho pueblo.\n Al tercero cap??tulo, dijeron que el dicho pueblo es algo fr??o y de el mismo temple que M??xico, y est?? fundado en la Laguna todo ??l, y pasa por medio una acequia principal que va a la ciudad de M??xico, y por ella andan los naturales en sus canoas de madera.  Y, de ordinario, hay mucha agua en la dicha Laguna y acequia, y en especial en tiempo de aguas, y, a esta causa, es h??medo. Y todo el a??o corren en ??l los vientos, y en especial, desde enero en adelante, es m??s ordinario ventar el norte en ??l.",
            valadez:
                "In the first chapter, I said that the priest prior said that this villager of Culhuacan, who was in charge and where he administered the holy sacraments, had two names: the one, profane and gentile, of which the naturales of the usaban in time of su gentilidad, y al presente lo usan, que es Culhuacan. And he says that the old name, in our language, is ???una point of cerro corvado???. \n In the second chapter, he said the se??or corregidor and the priest prior who conquered the city and the conqueror of the said pueblo and its region was the same as the one who won and conquered the city of Mexico, from where the city is distant from the leagues.\n In the third chapter, I said that the pueblo is something cold and the mismo temple that Mexico, and is founded in the entire Lagoon, and passes through a main waterway that goes to the city of Mexico, and through it and an los naturales in their wooden canoes. Ordinarily, there is a lot of water in the basin, Laguna and acequia, and especially in the waters, and, for this reason, it is wet. And every year it runs in the winds, and in particular, since it's been in adelante, it's the most ordinary wind in the north.",
            garza: "Al primero cap??tulo, dijo el dicho padre prior que este dicho pueblo de Culhuacan, que tiene a su cargo y donde administra los santos sacramentos, tiene dos nombres: el uno, profano y gent??lico, de que los naturales d??l usaban en tiempo de su gentilidad, y al presente lo usan, que es Culhuacan. Y dijo que el nombre antiguo, en nuestro lenguaje, ?? ???una punta de cerro corvado???. \n No segundo cap??tulo, dijeron los dichos se??or corregidor y padre prior que la conquista y conquistador del dicho pueblo y su comarca fue el mismo que gan?? y conquist?? a la ciudad de Mexico, de la cual dista dos leguas el dicho pueblo.\n Al tercero cap??tulo, dijeron que el dicho pueblo es algo fr??o y de el mismo temple que M??xico, y est?? fundado em la Laguna todo ??l, y pasa por medio una acequia principal que va a la ciudad de M??xico, y por ella andan los naturales em sus canoas de madera. Y, de ordinario, hay mucha agua en la dicha Laguna y acequia, y en especial en tiempo de aguas, y, a esta causa, es h??medo. Y todo el a??o corren en ??l los vientos, y en especial, desde enero en adelante, es m??s ordinario ventar el norte en ??l.",
        },
        {
            acuna: "Al cuarto cap??tulo, dijeron que el dicho pueblo es tierra llana y fresco, de muchas fuentes y manantiales de agua, ans?? en tierra como en la laguna; y toda la dicha agua se convierte en la dicha Laguna, porque luego entra en ella. Y es tierra abundosa de ma??z y de pastos cuando hay pocas aguas, a causa de la dicha Laguna y fuentes; porque se suelen anegar, como de presente est??n anegadas, muchas tierras de los dichos naturales, en que siembran. Cr??anse en ??l arboledas de sauces y ca??averales, y carrizos que se dan en la Laguna.",
            valadez:
                "In the fourth chapter, they said that said town is flat and cool land, with many fountains and springs of water, both on land and in the lagoon; and all the said water becomes the said Lagoon, because then it enters it. And it is an abundant land of corn and pastures when there is little water, because of the said Lagoon and springs; because they are usually flooded, as they are now flooded, many lands of the natural sayings, in which they sow. Groves of willows and reeds grow in it, and reeds that grow in the Lagoon.",
            garza: "No cap??tulo quarto, diziam que a referida vila ?? de terra plana e fresca, com muitas fontes e nascentes de ??gua, tanto em terra como na lagoa; e toda a dita ??gua torna-se a dita Lagoa, porque ent??o entra nela. E ?? uma terra abundante de milho e pastagens quando h?? pouca ??gua, por causa da dita Lagoa e nascentes; porque geralmente s??o inundadas, como agora est??o inundadas, muitas terras dos ditos naturais, em que semeiam. Nele crescem salgueiros e juncos, e juncos que crescem na Lagoa.",
        },
        {
            acuna: "Al quinto cap??tulo, dijeron que este dicho pueblo de Culhuacan tiene novecientos tributarios enteros, sin contar los muchachos: que, cada tributario entero, son dos personas, y, una, hace medio. Y, en tiempos pasados, y despu??s de conquistados, eran muy muchos m??s, y con enfermedades que han tenido, y en especial de pestilencias, que ellos llaman COCOLIZTE, se han muerto. Es pueblo fundado y poblado en orden, con sus calles y plazas. Su lengua, trato y manera de vivir de los dichos naturales d??l, es como los de M??xico, porque son todos mexicanos. Y, en general, se ocupan todos en llevar, en sus canoas, yerbas y piedra a vender a M??xico.",
            valadez:
                "In the fifth chapter, they said that this said town of Culhuacan has nine hundred entire tributaries, not counting the boys: that each entire tributary is two people, and one makes up half. And, in past times, and after they were conquered, there were many more, and with diseases that they have had, and especially pestilences, which they call COCOLIZTE, they have died. It is a town founded and populated in order, with its streets and squares. His language, treatment and way of living of the natural sayings of him, is like those of Mexico, because they are all Mexicans. And, in general, they all take care of carrying, in their canoes, herbs and stone to sell to Mexico.",
            garza: "No quinto cap??tulo, eles disseram que esta cidade de Culhuacan tem novecentos afluentes inteiros, sem contar os meninos: que cada afluente inteiro ?? duas pessoas, e uma ?? a metade. E, em tempos passados, e depois de conquistados, foram muitos mais, e com as doen??as que tiveram, e principalmente as pestil??ncias, que chamam de COCOLIZTE, morreram. ?? uma cidade fundada e povoada em ordem, com suas ruas e pra??as. Sua linguagem, tratamento e modo de viver dos ditos naturais dele, ?? como os do M??xico, porque s??o todos mexicanos. E, em geral, todos se encarregam de carregar, em suas canoas, ervas e pedras para vender ao M??xico.",
        },
        {
            acuna: "Al sexto cap??tulo, dijeron que el dicho pueblo est?? en la altura y elevaci??n que la ciudad de M??xico, y que, el d??a de SAN BERNAB?? a medio d??a, est?? el sol en el medio cenit. Al octavo cap??tulo, dijeron que el dicho pueblo est?? a dos leguas de la ciudad de M??xico, y a un cuarto de legua de los pueblos de Iztapalapa, Mexicaltzingo y Ocholobusco, poco m??s o menos; y a dos leguas del pueblo de Suchimilco, y a otras dos del pueblo de Cuitlahuaca. Y las leguas son comunes, y, toda, tierra llana, de buenos caminos y derechos. Con todos los cuales dichos pueblos parte t??rminos.",
            valadez:
                "In the sixth chapter, they said that said town is at the height and elevation of Mexico City, and that, on the day of SAN BERNAB?? at noon, the sun is at mid-zenith. In the eighth chapter, they said that the said town is two leagues from the city of Mexico, and a quarter of a league from the towns of Iztapalapa, Mexicaltzingo and Ocholobusco, a little more or less; and two leagues from the town of Suchimilco, and another two from the town of Cuitlahuaca. And the leagues are common, and, all, flat land, with good roads and rights. With all of whom said peoples part terms.",
            garza: "No sexto cap??tulo, diziam que a dita cidade est?? ?? altura e eleva????o da Cidade do M??xico, e que, no dia de SAN BERNAB?? ao meio-dia, o sol est?? no meio do z??nite. No oitavo cap??tulo, diziam que a dita cidade fica a duas l??guas da cidade do M??xico, e um quarto de l??gua das cidades de Iztapalapa, Mexicaltzingo e Ocholobusco, um pouco mais ou menos; e duas l??guas da cidade de Suchimilco, e outras duas da cidade de Cuitlahuaca. E as l??guas s??o comuns, e, todas, planas, com boas estradas e direitos. Com todos os quais disse que os povos se separam.",
        },
        {
            acuna: "A los quince cap??tulos, dijeron que los naturales del dicho pueblo de Culhuacan ten??an guerra, por mandado de MONTEZUMA, con los de Huexotzingo y Tlaxcala y otras partes, que eran contrarios del dicho MONTEZUMA. Y tra??an, en aquel tiempo, puestos unos pa??etes por la cintura y, todo lo dem??s, en cueros, sin otra cosa. Y sus armas eran arcos, flechas, y macanas y rodelas. Andan, ahora, vestidos con camisas, zarag??elles y mantas blancas largas, todo de lienzo de la tierra, y en este h??bito andan, y, en general, traen todos zapatos y sombreros. Su comida ordinaria es ma??z, y yerbas que llaman QUILITES, y pescadillos de la Laguna; su especia es chile y tomates, y comen muchas veces carne. Las enfermedades que tienen son ordinarias, excepto cuando hay alguna pestilencia, como de presente, que mueren muchos de pujamiento de sangre.",
            valadez:
                "After fifteen chapters, they said that the natives of the said town of Culhuacan were at war, by order of MONTEZUMA, with those of Huexotzingo and Tlaxcala and other parts, who were contrary to said MONTEZUMA. And they wore, at that time, some scarves around their waists and everything else, in leathers, without anything else. And their weapons were bows, arrows, clubs and shields. They now walk dressed in shirts, zarag??elles, and long white blankets, all made of cloth from the land, and they walk in this habit, and, in general, they all wear shoes and hats. Their ordinary food is corn, and herbs that they call QUILITES, and little fish from the Lagoon; their spice is chili and tomatoes, and they often eat meat. The illnesses they have are ordinary, except when there is some pestilence, as in the present, when many die of bloodshed.",
            garza: "Depois de quinze cap??tulos, eles disseram que os nativos da dita cidade de Culhuacan estavam em guerra, por ordem de MONTEZUMA, com os de Huexotzingo e Tlaxcala e outras partes, que eram contr??rios a dita MONTEZUMA. E eles usavam, naquela ??poca, alguns len??os na cintura e tudo mais, em couro, sem mais nada. E suas armas eram arcos, flechas, porretes e escudos. Eles agora andam vestidos com camisas, zarag??elles e longas mantas brancas, todas feitas de panos da terra, e andam com esse h??bito e, em geral, todos usam sapatos e chap??us. Sua comida comum ?? milho e ervas que eles chamam de QUILITES, e peixinhos da Lagoa; seu tempero ?? pimenta e tomate, e muitas vezes comem carne. As doen??as que eles t??m s??o comuns, exceto quando h?? alguma pestil??ncia, como no presente, quando muitos morrem de derramamento de sangue.",
        },
        {
            acuna: "A los veinte cap??tulos, dijeron que, en el monasterio del dicho pueblo, hay una fuente que hace un estanque grande, y, junto al dicho pueblo, otra fuente que llaman ???del Estrella???, el agua de la cual se lleva a M??xico, porque es de la mejor que hay en todo este reino. Hay en el dicho pueblo un molino y bat??n en que se hace papel, y procede de una fuente en donde est?? asentado. Hay, tambi??n, otras fuentes y manantiales, como est?? dicho. A los veinte y tres cap??tulos, dijeron que hay en el dicho pueblo algunas huertezuelas, en que hay ??rboles frutales de Espa??a, que dan fruto de membrillo, manzana, durazno y albaricoques, y otros ??rboles.",
            valadez:
                "After twenty chapters, they said that, in the monastery of the said town, there is a fountain that makes a large pond, and, next to the said town, another fountain that they call ???del Estrella???, the water from which is taken to Mexico, because it is the best there is in this whole kingdom. There is in the said town a mill and fulling mill in which paper is made, and it comes from a source where it is settled. There are also other fountains and springs, as has been said. At twenty-three chapters, they said that there are some orchards in the said town, in which there are fruit trees from Spain, which bear quince, apple, peach and apricot fruit, and other trees.",
            garza: "Depois de vinte cap??tulos, diziam que, no mosteiro da dita vila, h?? uma fonte que faz um grande lago, e, junto ?? dita vila, outra fonte que chamam ???del Estrella???, cuja ??gua ?? retirada. para o M??xico, porque ?? o melhor que existe em todo este reino. Existe na referida vila um moinho e um moinho onde se fabrica o papel, e este prov??m de uma fonte onde se instala. Existem tamb??m outras fontes e nascentes, como j?? foi dito. Em vinte e tr??s cap??tulos, disseram que h?? alguns pomares na referida cidade, nos quais h?? ??rvores frut??feras da Espanha, que d??o frutos de marmelo, macieira, p??ssego e damasco, e outras ??rvores.",
        },
    ];

    /** Leaflet **/
    const { BaseLayer, Overlay } = LayersControl;

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const styleMap = { width: "100%", height: "600px" };

    function getCoords(coord) {
        return L.latLng(coord.long, coord.lat);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} style={{ backgroundColor: "#193661" }}>
                    <Container maxWidth={"xl"}>
                        <InertiaLink
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "white",
                                width: "max-content",
                            }}
                        >
                            <ArrowBackIosIcon />
                            <p style={{ fontSize: "20px" }}>
                                {relation.nombre}
                            </p>
                        </InertiaLink>
                    </Container>
                </Grid>
            </Grid>
            <Container maxWidth={"xl"}>
                <div
                    className={
                        contMap === "lienzo"
                            ? "map-container grid-lienzo"
                            : "map-container"
                    }
                >
                    {contMap === "geo" && data ? (
                        <div>
                            <MapContainer
                                style={styleMap}
                                center={L.latLng(
                                    data.infoMapa.centro.lat,
                                    data.infoMapa.centro.long
                                )}
                                zoom={data.infoMapa.zoom.inicial}
                                minZoom={data.infoMapa.zoom.min}
                                maxZoom={data.infoMapa.zoom.max}
                            >
                                <LayersControl position="topleft">
                                    <BaseLayer checked name="ESRI Satellite">
                                        <TileLayer
                                            attribution={
                                                '&copy; <a href="http://osm.org/copyright">ESRI Satellite</a> contributors'
                                            }
                                            url={
                                                "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga"
                                            }
                                        />
                                    </BaseLayer>
                                    {Object.values(data.infoMapa.mapasBase).map(
                                        (item, i) => {
                                            return (
                                                <BaseLayer name={item.nombre}>
                                                    <TileLayer
                                                        attribution={
                                                            item.atribution
                                                        }
                                                        url={item.link}
                                                    />
                                                </BaseLayer>
                                            );
                                        }
                                    )}

                                    {Object.values(data.capas).map(
                                        (item, i) => {
                                            return (
                                                <Overlay
                                                    checked
                                                    name={item.nombre}
                                                >
                                                    <LayerGroup
                                                        key={item.nombre}
                                                    >
                                                        {Object.values(
                                                            item.elementos
                                                        ).map((el, ind) => {
                                                            if (
                                                                el.tipo ===
                                                                "punto"
                                                            ) {
                                                                return (
                                                                    <CircleMarker
                                                                        center={getCoords(
                                                                            el.coordenadas
                                                                        )}
                                                                        radius={
                                                                            4
                                                                        }
                                                                        color={
                                                                            el
                                                                                .simbolo
                                                                                .color
                                                                        }
                                                                    >
                                                                        <Popup>
                                                                            {
                                                                                el.popup
                                                                            }
                                                                        </Popup>
                                                                        <Tooltip>
                                                                            {
                                                                                el.nombre
                                                                            }
                                                                        </Tooltip>
                                                                    </CircleMarker>
                                                                );
                                                            }

                                                            if (
                                                                el.tipo ===
                                                                    "geojson" &&
                                                                ind !== 4
                                                            ) {
                                                                try {
                                                                    return (
                                                                        <GeoJSON
                                                                            key={
                                                                                ind
                                                                            }
                                                                            data={
                                                                                el.coordenadas
                                                                            }
                                                                        />
                                                                    );
                                                                } catch (error) {
                                                                    // console.log(
                                                                    //     "Tron?? el GeoJSON"
                                                                    // );
                                                                }
                                                            }
                                                        })}
                                                    </LayerGroup>
                                                </Overlay>
                                            );
                                        }
                                    )}
                                    <ScaleControl
                                        position="bottomright"
                                        metric={true}
                                        imperial={true}
                                    />
                                </LayersControl>
                            </MapContainer>
                        </div>
                    ) : (
                        <LinearProgress />
                    )}
                    {contMap === "picto" && (
                        <div className="mapaPicto">
                            {/* <TransformWrapper>
                                <TransformComponent>
                                    <img
                                        src={
                                            relation.maps &&
                                            relation.maps.length > 0
                                                ? "/storage/relaciones/" +
                                                  relation.maps[idActive].imagen
                                                : ""
                                        }
                                        alt=""
                                        style={{
                                            height: "600px",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        id='imagenprov'
                                    />
                                </TransformComponent>
                            </TransformWrapper> */}
                            <iframe
                                src={'/storage/relaciones/Culhuacan_mapa.jpg'}
                                style={{width:'100%',height:'100%'}}
                            >
                            </iframe>
                        </div>
                    )}
                    {contMap === "lienzo" && (
                        <div>
                            <Grid container spacing={5}>
                                <Grid
                                    item
                                    xs={6}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img
                                                src={folios[folioActive]}
                                                alt=""
                                                style={{ height: "600px" }}
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <div className={"lienzo-text"}>
                                        {
                                            textoFolios[folioActive][
                                                activeTranslate
                                            ]
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>
                <div className="container-controls">
                    <div className="round-button-container">
                        <div
                            className={
                                contMap === "geo" && idActive == 0
                                    ? "round-button active"
                                    : "round-button"
                            }
                            onClick={() => {
                                setContMap("geo");
                                setIdActive(0);
                            }}
                        ></div>
                        <div className="round-button-text">Mapa geogr??fico</div>
                    </div>
                    {relation.maps && relation.maps.length > 0 && (
                        <div className="round-button-container">
                            <div
                                className={
                                    contMap === "picto" && idActive === 0
                                        ? "round-button active"
                                        : "round-button"
                                }
                                onClick={() => {
                                    setContMap("picto");
                                    setIdActive(0);
                                }}
                            ></div>
                            <div className="round-button-text">
                                Mapa pictogr??fico 1
                            </div>
                        </div>
                    )}
                    <div className="swiper-container">
                        <Swiper
                            spaceBetween={15}
                            freeMode={false}
                            effect={"coverflow"}
                            grabCursor={true}
                            slidesPerView={5}
                            navigation={true}
                            modules={[Navigation, FreeMode]}
                            className="leo-swiper"
                        >
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(0)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 0
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini1.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(1)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 1
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini2.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(2)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 2
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini3.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(3)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 3
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini4.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(4)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 4
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini5.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(5)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 5
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini6.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(6)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 6
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini7.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className="mini-photo-container"
                                onClick={() => changeFolio(7)}
                            >
                                <img
                                    className={
                                        contMap == "lienzo" && idActive == 7
                                            ? "oski-customGallery-miniPhoto active"
                                            : "oski-customGallery-miniPhoto"
                                    }
                                    src={"/img/provisional/Cul_mini8.jpg"}
                                    style={{width:'66px',height:'100px'}}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    {contMap == "lienzo" && (
                        <div className="translate-container">
                            {activeTranslate == "acuna" ? (
                                <TranslateButtonActive
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("acuna");
                                    }}
                                >
                                    Acu??a
                                </TranslateButtonActive>
                            ) : (
                                <TranslateButton
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("acuna");
                                    }}
                                >
                                    Acu??a
                                </TranslateButton>
                            )}

                            {activeTranslate == "valadez" ? (
                                <TranslateButtonActive
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("valadez");
                                    }}
                                >
                                    Valadez
                                </TranslateButtonActive>
                            ) : (
                                <TranslateButton
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("valadez");
                                    }}
                                >
                                    Valadez
                                </TranslateButton>
                            )}
                            {activeTranslate == "garza" ? (
                                <TranslateButtonActive
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("garza");
                                    }}
                                >
                                    De la Garza
                                </TranslateButtonActive>
                            ) : (
                                <TranslateButton
                                    variant="contained"
                                    size={"large"}
                                    onClick={() => {
                                        setActiveTranslate("garza");
                                    }}
                                >
                                    De la Garza
                                </TranslateButton>
                            )}
                        </div>
                    )}
                </div>
                <div className="container-controls">
                    {relation.maps &&
                        relation.maps.length > 0 &&
                        relation.maps.map((map, index) => {
                            if (index === 0) return;

                            return (
                                <div className="round-button-container">
                                    <div
                                        className={
                                            contMap == "picto" &&
                                            idActive === index
                                                ? "round-button active"
                                                : "round-button"
                                        }
                                        onClick={() => {
                                            setContMap("picto");
                                            setIdActive(index);
                                        }}
                                    ></div>
                                    <div className="round-button-text">
                                        Mapa pictogr??fico {index + 1}
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div style={{ marginTop: 50, width: "100%", marginBottom: 70 }}>
                    <Grid container>
                        <Grid item xs={9}>
                            <div className="info-text-relacion">
                                Relaci??n de la Alcald??a Mayor de Metzititl??n y
                                su Jurisdicci??n
                                <br />
                                Reproducci??n por cortes??a de la Benson Latin
                                America Collection. The General Libraries, The
                                University of Texas Austin (JGI-XXIV-12).
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {/* reemplazar por el uuid de la relacion por fa */}
                            <InertiaLink
                                href={route("sources.index", relation.uuid)}
                                style={{ textDecoration: "none" }}
                            >
                                <ColorButton variant="contained" size={"large"}>
                                    Ver Fuentes
                                </ColorButton>
                            </InertiaLink>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            {/* Boton estilo footer */}
            <div className="footer-all-folios" style={{ position: "static" }}>
                <Container maxWidth={"xl"}>
                    <div
                        className="folios-button"
                        style={{ cursor: "pointer" }}
                        onClick={toggleDrawer}
                    >
                        <KeyboardArrowUpIcon style={{ marginRight: 10 }} /> Ver
                        todos los folios
                    </div>
                </Container>
            </div>
            <Drawer
                anchor={"bottom"}
                open={open}
                //onClose={toggleDrawer}
            >
                <div className="drawer-content">
                    <Container maxWidth={"xl"}>
                        <Grid container spacing={8}>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 0
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini1.jpg"}
                                        onClick={() => changeFolio(0)}
                                    />
                                    <div>Folio 1</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 1
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini2.jpg"}
                                        onClick={() => changeFolio(1)}
                                    />
                                    <div>Folio 2</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 2
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini3.jpg"}
                                        onClick={() => changeFolio(2)}
                                    />
                                    <div>Folio 3</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 3
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini4.jpg"}
                                        onClick={() => changeFolio(3)}
                                    />
                                    <div>Folio 4</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 4
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini5.jpg"}
                                        onClick={() => changeFolio(4)}
                                    />
                                    <div>Folio 5</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 5
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini6.jpg"}
                                        onClick={() => changeFolio(5)}
                                    />
                                    <div>Folio 6</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 6
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini7.jpg"}
                                        onClick={() => changeFolio(6)}
                                    />
                                    <div>Folio 7</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={
                                        contMap == "lienzo" && idActive == 7
                                            ? "folio-mini-container active"
                                            : "folio-mini-container"
                                    }
                                >
                                    <img
                                        className=""
                                        src={"/img/provisional/Cul_mini8.jpg"}
                                        onClick={() => changeFolio(7)}
                                    />
                                    <div>Folio 8</div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <div className="footer-all-folios">
                    <Container maxWidth={"xl"}>
                        <div
                            className="folios-button"
                            style={{ cursor: "pointer" }}
                            onClick={toggleDrawer}
                        >
                            <KeyboardArrowDownIcon
                                style={{ marginRight: 10 }}
                            />{" "}
                            Ver todos los folios
                        </div>
                    </Container>
                </div>
            </Drawer>
        </>
    );
};

Relacion.layout = (page) => (
    <Layout
        children={page}
        title="Relaciones Geogr??ficas"
        pageTitle="Relaciones Geogr??ficas"
    />
);

export default Relacion;
