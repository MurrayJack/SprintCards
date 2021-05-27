import { useConnection } from '../context/ConnectionContext'

export default () => {
    const { results } = useConnection()

    return (
        <>
            <div>
                <h2>Current Members</h2>
                <ul>
                    {results &&
                        Object.keys(results.users).map((e) => (
                            <li>
                                <span>{e}</span>
                                <button>kick</button>
                            </li>
                        ))}
                </ul>
            </div>
            <style jsx>{`
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                li {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 16px;
                    white-space: nowrap;
                }
            `}</style>
        </>
    )
}
