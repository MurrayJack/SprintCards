import { FC, FormHTMLAttributes } from 'react'

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
    return (
        <>
            <form {...props}>{children}</form>

            <style jsx>{`
                form {
                    display: grid;
                    gap: 40px;
                    min-width: 400px;
                }
            `}</style>
        </>
    )
}
