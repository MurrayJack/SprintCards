export const CardsFooter = ({ onHandleReveal, onHandleClear }) => (
    <>
        <footer>
            <button onClick={onHandleReveal}>Reveal</button>
            <button onClick={onHandleClear}>Clear</button>
        </footer>

        <style jsx>{`
            footer {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;
                padding: 20px;
            }

            button {
                border-radius: 0;
            }

            button:hover {
                background-color: var(--color-accent-color);
            }

        `}</style>
    </>
);
