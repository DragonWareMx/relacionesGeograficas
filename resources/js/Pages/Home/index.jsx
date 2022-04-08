import Layout from '../../layouts/Layout'

const Home = ({ }) => {

    return (

        <div className="row">
            Hola
        </div>
    )
}

Home.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Home
