import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const Home = () => {
  const [others, setOthers] = useState([])
  const [current, setCurrent] = useState();
  const [name, setName] = useState("");
  const socket = io();

  useEffect(() => {

    setName(window.localStorage.getItem("name"))

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

  const buildResults = () => {
    const items = [];
    for (var property in others) {
      if (others.hasOwnProperty(property)) {
        // Do things here
        items.push(
          <li>
            <SprintCard name={property} current={current} onClick={handleCurrentClick} caption={others[property]} />
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
          <input value={name} onChange={handleNameChange} placeholder="name" />
          <button>Connect</button>
        </header>

        <section>
          <h2>Selection</h2>
          <ul>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="1" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="2" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="3" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="5" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="8" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="13" /></li>
            <li><SprintCard current={current} onClick={handleCurrentClick} caption="?" /></li>
          </ul>
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
        }

        h2 {
          text-align: center;
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
            grid-template-rows: 90px 500px auto 100px;
            height: 100vh;
          }

          header {
            background: #333;
            color: white;
            display: grid;
            grid-template-columns: 200px auto 200px;
            /* padding: 32px; */
            box-sizing: border-box;
          }

          section{
            padding: 32px;
            background: #f2f2f2;
          }

          section ul {
            display: grid;
            list-style: none;
            padding: 0;
            margin: 0;
            grid-template-columns: repeat(8, auto);
            grid-gap: 16px;
            justify-content: center;
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
            background: #333;
            color: white;
            display: grid;

          }
  
      `}</style>
    </>
  )
}

const SprintCard = ({ current, caption, onClick, name }) => {

  const handleOnClick = () => {
    onClick(caption);
  }

  return (
    <>
      <div>
        <button onClick={handleOnClick}>{caption}</button>
        <p>{name}</p>
      </div>
      <style jsx>{`

        button {
          border: 15px solid ${current === caption ? "red" : "#0097ef"};
          border-radius: 5px;
          width: 200px;
          height: 300px;
          background-color: white;
          font-size: 60px;
          color: #333;
          cursor: pointer;
       }

       p {
         font-size: 18px;
         text-align: center;
       }


      `}</style>

    </>
  )
}

export default Home
