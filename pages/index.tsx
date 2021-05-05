import React from "react"
import { App } from "../components/app"
import { ConnectionProvider } from "../context/ConnectionContext"

const Home = () => {
    return (
        <ConnectionProvider>
            <App />            
        </ConnectionProvider>
    )
}

export default Home
