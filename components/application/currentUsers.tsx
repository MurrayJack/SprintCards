import { useConnection } from '../../context/connectionContext'
import { MdDelete } from 'react-icons/md'

export default () => {
    const { results, kick, userName } = useConnection()

    return (
        <>
            <div>
                <ul>
                    {results &&
                        Object.keys(results.users).map((e) => (
                            <li key={e}>
                                <span>
                                    {e} {userName === e ? ` (me)` : ''}
                                </span>
                                <button type="button" onClick={() => kick(e)}>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
            <style jsx>{`
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    gap: 16px;
                }

                li {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 16px;
                    white-space: nowrap;
                    align-items: center;
                    justify-content: center;
                    min-width: 300px;
                }

                button {
                    height: 30px;
                    width: 30px;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    -webkit-align-items: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                }
            `}</style>
        </>
    )
}
