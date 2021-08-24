import { useConnection } from '../context/ConnectionContext'

export const AvailableCards = ({ onChange }: { onChange: () => void }) => {
    const { results, changeCardSet } = useConnection()

    const handleOnChange = (set: CardSet) => {
        changeCardSet(set)
        onChange()
    }

    return (
        <>
            <fieldset>
                <legend>Available Cards</legend>
                <ul>
                    <li>
                        <label>
                            <input
                                onClick={() => handleOnChange('fibonacci')}
                                checked={results?.cardSet === 'fibonacci'}
                                value="fibonacci"
                                name="cards"
                                type="radio"
                            />
                            Fibonacci
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                onClick={() => handleOnChange('tshirt')}
                                checked={results?.cardSet === 'tshirt'}
                                value="tshirt"
                                name="cards"
                                type="radio"
                            />
                            TShirt
                        </label>
                    </li>
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
                    gap: 8px;
                }
            `}</style>
        </>
    )
}
