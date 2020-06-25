export const Layout = ({ children }) => (
    <>
        {children}

        <style jsx global>{`
            :root {
                --font-small: 0.8em;
                --font-normal: 1em;
                --font-large: 1.4em;
                --font-xlarge: 1.8em;

                --gaps-small: 4px;
                --gaps-medium: 8px;
                --gaps-large: 16px;
                --gaps-xlarge: 24px;
                --gaps-xxlarge: 32px;
                --gaps-xxxlarge: 48px;

                --color-accent-color: #f68e1e;
            }

            @media (prefers-color-scheme: dark) {
                :root {
                    --main-bg-color: #1f2730;
                    --main-color: #dfe1df;

                    --main-bg-color2: #272e37;

                    --button-bg-color: #9b7351;
                    --button-color: white;

                    --main-border-color: #757581;
                }
            }

            @media (prefers-color-scheme: light) {
                :root {
                    --main-bg-color: #dfe1df;
                    --main-color: #232b35;

                    --main-bg-color2: white;

                    --button-bg-color: #272e37;
                    --button-color: white;

                    --main-border-color: ##ddd;
                }
            }

            html {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
                    "Open Sans", "Helvetica Neue", sans-serif;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                scroll-behavior: smooth;
                font-size: 100%;
            }

            body {
                padding: 0;
                margin: 0;
                background: var(--main-bg-color);
                color: var(--main-color);
            }

            button {
                background: var(--button-bg-color);
                color: var(--button-color);
                border: 0;
                font-size: var(--font-normal);
                padding: var(--gaps-large) var(--gaps-xlarge);
                border-radius: 3px;
                cursor: pointer;
                text-transform: uppercase;
            }

            button[type="submit"] {
                background: var(--color-accent-color);
            }

            button[type="submit"]:hover {
                background: var(--button-bg-color);
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                letter-spacing: 0.03em;
                padding: 0;
                margin: 0;
            }

            h1 {
                font-size: var(--font-xlarge);
            }

            input {
                padding: var(--gaps-large);
                font-size: 1em;
                border-radius: 4px;
                border: 1px solid var(--color-accent-color);
                background: var(--main-bg-color);
                color: var(--main-color);
            }
        `}</style>
    </>
);

{
    /* 
            <style global jsx>
                {`
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: arial;
                        color: #2f3640;
                    }

                    h2 {
                        text-align: center;
                        font-size: 32px;
                    }

                    input {
                        font-size: 32px;
                        text-indent: 10px;
                        border: 0;
                    }

                    label {
                        font-size: 32px;
                        height: 100%;
                        line-height: 90px;
                        text-indent: 20px;
                    }

                    button {
                        font-size: 32px;
                        border: 0;
                        background: #c23616;
                        color: white;
                        cursor: pointer;
                    }

                    button[disabled] {
                        opacity: 0.4;
                    }
                `}
            </style> */
}
