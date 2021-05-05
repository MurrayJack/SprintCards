import { Layout } from "../components/Layout";
import io from "socket.io-client";

const Server = () => {
    const socket = io();

    const handleResetUsers = () => {
        socket.emit("clear_users");
    };

    return (
        <>
            <Layout>
                <main>
                    <h1>Server Functions</h1>

                    <button onClick={handleResetUsers}>Reset Users</button>
                </main>
            </Layout>

            <style jsx>{`
                main {
                    padding: var(--gaps-xlarge);
                    text-align: center;
                    display: grid;
                    grid-gap: var(--gaps-xlarge);
                }
            `}</style>
        </>
    );
};

export default Server;
