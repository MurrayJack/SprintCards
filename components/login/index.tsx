import React, { useState } from 'react'
import { Menu } from './menu'
import { NewRoom } from './form'

export const Login = () => {
    const [page, setPage] = useState<'New' | 'Existing'>('New')

    return (
        <>
            <article>
                <h2>Connect to Sprint Cards</h2>
                <section>
                    <Menu selected={page} onClick={setPage} />

                    <NewRoom type={page} />
                </section>
            </article>

            <style jsx>{`
                article {
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    background: var(--main-bg-color);
                    z-index: 1;
                    transition: opacity ease-in-out 0.2s;
                    padding: var(--gaps-xxxlarge);
                    display: grid;
                    grid-gap: var(--gaps-xxlarge);
                    background: var(--main-bg-color2);
                }

                @media (min-width: 800px) {
                    article {
                        width: auto;
                        height: auto;
                        border: 1px solid var(--main-border-color);
                        border-radius: 3px;
                        padding: var(--gaps-xxxlarge);
                        display: grid;
                        grid-gap: var(--gaps-xxlarge);
                        background: var(--main-bg-color2);
                    }
                }

                section {
                    display: grid;
                    grid-template-columns: auto 400px;
                    gap: 32px;
                }
            `}</style>
        </>
    )
}
