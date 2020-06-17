import SprintCard from "./SprintCard";

export const CardSelection = ({ answers, current, revealed, property, handleCurrentClick }) => {
    const buildResults = () => {
        const items = [];
        for (var property in answers) {
            if (answers.hasOwnProperty(property)) {
                items.push(
                    <li>
                        <SprintCard
                            hide={!revealed}
                            name={property}
                            onClick={handleCurrentClick}
                            caption={answers[property]}
                        />
                    </li>,
                );
            }
        }
        return items;
    };

    return (
        <>
            <section>
                <ul>
                    <ul>{buildResults()}</ul>
                </ul>
            </section>
            <style jsx>{`
                section {
                    padding: var(--gaps-xlarge);
                }

                ul {
                    display: grid;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-template-columns: repeat(7, 1fr);
                    grid-gap: 16px;
                    justify-content: center;
                }

                li {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                }
            `}</style>
        </>
    );
};
