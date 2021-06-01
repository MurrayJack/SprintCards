import { FC, SelectHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export const Select: FC<SelectHTMLAttributes<HTMLSelectElement> & { icon: IconType; label: string }> = ({
    children,
    icon: Icon,
    label,
    ...props
}) => {
    return (
        <>
            <label>
                <span>{label}:</span>

                <div>
                    <Icon />
                </div>

                <select {...props}>{children}</select>
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

                select {
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
