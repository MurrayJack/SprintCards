import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import SprintCard from "../components/SprintCard"
import SprintCardOptions from "../components/SprintCardOptions"

const Home = () => {
    const [connected, setConnected] = useState(false);
    const [answers, setAnswers] = useState([])
    const [current, setCurrent] = useState();
    const [name, setName] = useState("");
    const [revealed, setRevealed] = useState(false);

    const socket = io();

    useEffect(() => {
        setName(window.localStorage.getItem("name"));
        if (name) {
            setConnected()
        }

        socket.on("reply connection", data => {
            setAnswers(data)
        })

        socket.on("reply answers", data => {
            setAnswers(data)
        })

        socket.on("reply clear", data => {
            setCurrent("")
            setAnswers(data)
            setRevealed(false)
        })

        socket.on("reply reveal", data => {
            setRevealed(true)
        })

        // The Admin has reset all the users
        socket.on("force_disconnect", () => {
            setConnected(false)
            setAnswers()
            setCurrent("")
        })

        return () => socket.disconnect(name)
    }, [])

    const setConnection = () => {
        window.localStorage.setItem("name", name)

        setName(name)
        setConnected(true)

        socket.emit('send connection', { name })
    }

    const handleCurrentClick = (newCurrent) => {
        socket.emit('send result', { sp: newCurrent, name })
        setCurrent(newCurrent)
    }

    const handleClear = () => {
        socket.emit('send clear')
    }

    const handleReveal = () => {
        socket.emit('send reveal')
    }

    const handleConnect = () => {
        if (name) {
            setConnection();
        }
    }

    const buildResults = () => {
        const items = [];
        for (var property in answers) {
            if (answers.hasOwnProperty(property)) {
                items.push(
                    <li>
                        <SprintCard hide={!revealed} name={property} onClick={handleCurrentClick} caption={answers[property]} />
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
                    <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="name" />
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
                    <button disabled={!connected} onClick={handleReveal}>Reveal</button>
                    <div></div>
                    <button disabled={!connected} onClick={handleClear}>Clear</button>
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
          background: #c23616;
          color: white;
          cursor: pointer;
        }

        button[disabled] {
            opacity: 0.4;
        }
      `}
            </style>

            <style jsx>{`

          main {
            display : grid;
            /* grid-gap: 25px; */
            grid-template-rows: 90px 1fr 1fr 100px;
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
            grid-template-columns: 1fr 1px 1fr
          }
  
      `}</style>
        </>
    )
}

export default Home
