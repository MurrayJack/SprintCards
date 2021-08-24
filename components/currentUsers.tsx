import { useConnection } from '../context/ConnectionContext'
import { MdDelete } from 'react-icons/md'

export const CurrentUsers = () => {
    const { results, kick, user } = useConnection()

    return (
        <>
            <fieldset>
                <legend>Current Users</legend>
                <ul>
                    {results &&
                        Object.keys(results.users).map((e) => (
                            <li>
                                <span>
                                    {e} {user === e ? ` (me)` : ''}
                                </span>
                                <button type="button" onClick={() => kick(e)}>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                </ul>
            </fieldset>

            <style jsx>{`
                fieldset {
                    border: 1px solid var(--color-accent-color);
                    padding: 16px;
                    border-radius: 4px;
                }

                legend {
                    padding: 0 8px;
                }

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
