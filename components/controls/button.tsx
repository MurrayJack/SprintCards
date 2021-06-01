import { FC } from 'react'
import { ButtonHTMLAttributes } from 'react'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <>
            <button {...props}>{children}</button>

            <style jsx>{`
                button {
                    background: var(--button-bg-color);
                    color: var(--button-color);
                    border: 0;
                    font-size: var(--font-normal);
                    padding: var(--gaps-large) var(--gaps-xlarge);
                    border-radius: 3px;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: all ease-in-out 0.2s;
                }

                button:hover {
                    background: var(--color-accent-color);
                }
            `}</style>
        </>
    )
}
