export default ({ current, caption, onClick, name = "", disabled, icon }) => {
    const handleOnClick = () => {
        onClick(caption);
    };

    return (
        <>
            <div>
                <button aria-current={current === caption} onClick={handleOnClick} disabled={disabled}>
                    <div>{icon && icon()}</div>
                    <div>{caption}</div>
                </button>
                <p>{name}</p>
            </div>
            <style jsx>{`
                button {
                    border: 15px solid #487eb0;
                    border-radius: 5px;
                    width: 250px;
                    height: 350px;
                    background-color: white;
                    font-size: 60px;
                    color: #333;
                    cursor: pointer;
                    position: relative;
                }

                button div:first-of-type {
                    color: #c23616;
                }

                div:first-of-type {
                }

                button[aria-current="true"] {
                    border: 15px solid #c23616;
                    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.8);
                }

                button[disabled] {
                    opacity: 0.4;
                }

                p {
                    font-size: 24px;
                    font-weight: bold;
                    text-transform: uppercase;
                    text-align: center;
                }
            `}</style>
        </>
    );
};
