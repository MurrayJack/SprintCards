interface IMenuProps {
    onClick: (which: 'New' | 'Existing') => void
    selected: 'New' | 'Existing'
}

export const Menu = ({ onClick, selected }: IMenuProps) => {
    return (
        <>
            <aside>
                <ul>
                    <li>
                        <button type="button" aria-selected={selected === 'New'} onClick={() => onClick('New')}>
                            Create New Room
                        </button>
                    </li>
                    <li>
                        <button type="button" aria-selected={selected === 'Existing'} onClick={() => onClick('Existing')}>
                            Existing Room
                        </button>
                    </li>
                </ul>
            </aside>
            <style jsx>{`
                ul {
                    list-style: none;
                    padding: 0;
                    display: grid;
                    gap: 16px;
                }

                button {
                    background: transparent;
                    padding: 8px;
                    margin: 0;
                    width: 200px;
                    text-align: left;
                    text-transform: capitalize
                }

                button[aria-selected='true'] {
                    font-weight: bold;
                    background: deeppink;
                    
                }
            `}</style>
        </>
    )
}
