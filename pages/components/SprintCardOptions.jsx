import SprintCard from "./SprintCard";
import cards from "./cards";

export default ({ current, onclick, connected }) => {
    return (
        <>
            <h2>Selection</h2>
            <ul>
                {cards.map((e) => (
                    <li>
                        <SprintCard key={e.caption} disabled={!connected} current={current} onClick={onclick} {...e} />
                    </li>
                ))}
            </ul>
            <style jsx>{`
                ul {
                    display: grid;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-template-columns: repeat(7, 1fr);
                    grid-gap: 16px;
                    justify-content: center;
                    height: 60%;
                }
            `}</style>
        </>
    );
};
