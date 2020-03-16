import SprintCard from "./SprintCard";
import cards from "../cards";

export default ({ current, onclick, connected }) => {
    return (
        <>
            <h2>Selection</h2>
            <ul>
                {cards.map(e => <SprintCard key={e.caption} disabled={!connected} current={current} onClick={onclick} {...e} />)}
            </ul>
            <style jsx>{`
                ul {
                    display: grid;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-template-columns: repeat(8, auto);
                    grid-gap: 16px;
                    justify-content: center;
                }
            `}</style>
        </>
    );
};
