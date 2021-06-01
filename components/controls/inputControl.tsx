import { FC, InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { icon: IconType; label: string }> = ({
    icon: Icon,
    ...props
}) => {
    return (
        <>
            <label>
                <span>{props.label}: {props.required ? "(required)" : ""}</span>

                <div>
                    <Icon />
                </div>

                <input {...props} />
            </label>
            <style jsx>{`
                label {
                    position: relative;
                    display: grid;
                    grid-gap: var(--gaps-medium);
                }

                div {
                    bottom: 16px;
                    left: 16px;
                    position: absolute;
                    color: var(--color-accent-color);
                    pointer-events: none;
                }

                input {
                    padding: var(--gaps-large);
                    font-size: 1em;
                    border-radius: 4px;
                    border: 1px solid var(--color-accent-color);
                    background: var(--main-bg-color);
                    color: var(--main-color);
                    text-indent: 24px;
                }
            `}</style>
        </>
    )
}
