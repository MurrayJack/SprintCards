import { FC, InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { icon: IconType; label: string }> = ({
    icon: Icon,
    ...props
}) => {
    return (
        <>
            <label>
                <span>{props.label}:</span>

                <div>
                    <Icon />
                </div>

                <input required {...props} />
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
                    text-indent: 20px;
                }
            `}</style>
        </>
    )
}
