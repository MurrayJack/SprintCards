import { Layout } from "../components/Layout";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import SprintCardOptions from "../components/SprintCardOptions";
import { CardsConnection } from "../components/CardsConnection";
import { CardsFooter } from "../components/CardsFooter";
import { CardSelection } from "../components/CardSelection";

const Home = () => {
    const [connected, setConnected] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [current, setCurrent] = useState();
    const [name, setName] = useState("");
    const [revealed, setRevealed] = useState(false);

    const socket = io();

    useEffect(() => {
        if (connected) {
            socket.emit("send_connection", { name });
        }
    }, [connected]);

    useEffect(() => {
        socket.on("reply_connection", (data) => {
            debugger;
            setAnswers(data);
        });

        socket.on("reply answers", (data) => {
            setAnswers(data);
        });

        socket.on("reply clear", (data) => {
            setCurrent("");
            setAnswers(data);
            setRevealed(false);
        });

        socket.on("reply reveal", (data) => {
            setRevealed(true);
        });

        //     // The Admin has reset all the users
        socket.on("force_disconnect", () => {
            setConnected(false);
            setAnswers();
            setCurrent("");
        });

        return () => socket.disconnect(name);
    }, []);

    const handleCurrentClick = (newCurrent) => {
        socket.emit("send result", { sp: newCurrent, name });
        setCurrent(newCurrent);
    };

    const handleClear = () => {
        socket.emit("send clear");
    };

    const handleReveal = () => {
        socket.emit("send reveal");
    };

    const handleConnect = (loginName) => {
        if (loginName) {
            setConnected(true);
            setName(loginName);
        }
    };

    return (
        <>
            <Layout>
                <CardsConnection onConnect={handleConnect} connected={connected} />

                <main>
                    <SprintCardOptions current={current} onclick={handleCurrentClick} />

                    {connected ? <CardSelection revealed={revealed} answers={answers} current={current} /> : <div></div>}

                    <CardsFooter onHandleReveal={handleReveal} onHandleClear={handleClear} />
                </main>
            </Layout>

            <style jsx>{`
                main {
                    display: grid;
                    grid-template-rows: 1fr 1fr 100px;
                    height: 100vh;
                }
            `}</style>
        </>
    );
};

export default Home;
