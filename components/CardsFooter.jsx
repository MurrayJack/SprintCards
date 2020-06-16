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
                grid-gap: 1px;
            }

            button {
                border-radius: 0;
            }
        `}</style>
    </>
);
