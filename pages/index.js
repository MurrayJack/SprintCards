import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import SprintCard from "./components/SprintCard"
import SprintCardOptions from "./components/SprintCardOptions"
import cards from "./cards";

const Home = () => {
    const [connected, setConnected] = useState(false);
    const [others, setOthers] = useState([])
    const [current, setCurrent] = useState();
    const [name, setName] = useState("");
    const socket = io();

    useEffect(() => {
        const name = window.localStorage.getItem("name");
        if (name) {
            setName(name)
            setConnected(true)
        }

        socket.on("reply answers", data => {
            setOthers(data)
        })

        socket.on("reply clear", data => {
            setCurrent("")
            setOthers({})
        })

        return () => socket.disconnect()
    }, [])

    const handleCurrentClick = (newCurrent) => {
        socket.emit('send result', { sp: newCurrent, name })
        setCurrent(newCurrent)
    }

    const handleClear = () => {
        socket.emit('send clear')
    }

    const handleNameChange = e => {
        window.localStorage.setItem("name", e.target.value)
        setName(e.target.value)
    }

    const handleConnect = () => {
        if (name) {
            setConnected(true)
        }
    }

    const buildResults = () => {
        const items = [];
        for (var property in others) {
            if (others.hasOwnProperty(property)) {
                // Do things here
                const icon = cards.filter(e => e.caption === others[property])[0].icon

                items.push(
                    <li>
                        <SprintCard name={property} icon={icon} onClick={handleCurrentClick} caption={others[property]} />
                    </li>
                )
            }
        }
        return items
    }

    return (
        <>
            <main>
                <header>
                    <label>Name:</label>
                    <input autoFocus value={name} onChange={handleNameChange} placeholder="name" />
                    <button onClick={handleConnect}>Connect</button>
                </header>

                <section>
                    <SprintCardOptions current={current} connected={connected} onclick={handleCurrentClick} />
                </section>

                <article>
                    <h2>Results</h2>
                    <ul>
                        {buildResults()}
                    </ul>
                </article>

                <footer>
                    <button onClick={handleClear}>Clear</button>
                </footer>

            </main>

            <style global jsx>{`
        body {
          padding: 0;
          margin:0;
          font-family: arial;
          color: #2f3640
        }

        h2 {
          text-align: center;
          font-size: 32px
        }

        input {
          font-size: 32px;
          text-indent: 10px;
          border: 0;
        }

        label {
          font-size: 32px;
          height: 100%;
          line-height: 90px;
          text-indent: 20px;
        }

        button {
          font-size: 32px;
          border: 0;
          background: orangered;
          color: white;
        }
      `}
            </style>

            <style jsx>{`

          main {
            display : grid;
            /* grid-gap: 25px; */
            grid-template-rows: 90px 600px auto 100px;
            height: 100vh;
          }

          header {
            background: #2f3640;
            color: white;
            display: grid;
            grid-template-columns: 200px auto 200px;
            /* padding: 32px; */
            box-sizing: border-box;
          }

          section{
            padding: 32px;
            background: #f5f6fa;
          }

          article {
              background: #dcdde1
          }
        
          article ul {
            display: grid;
            list-style: none;
            padding: 0;
            margin: 0;
            grid-template-columns: repeat(8, auto);
            grid-gap: 16px;
            justify-content: center;
          }

          section ul li {
            /* border: 1px solid red */
          }

          footer {
            background: #2f3640;
            color: white;
            display: grid;

          }
  
      `}</style>
        </>
    )
}

export default Home
