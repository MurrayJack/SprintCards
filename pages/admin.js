import { Layout } from "../components/Layout";
import io from 'socket.io-client'

const Server = () => {

    const socket = io();

    const handleResetUsers = () => {
        socket.emit('clear_users')
    }


    return <>
        <Layout>


            <h1>Server Functions</h1>

            <button onClick={handleResetUsers}>Reset Users</button>
        </Layout>
    </>

}


export default Server;