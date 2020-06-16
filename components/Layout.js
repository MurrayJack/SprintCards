export const Layout = ({ children }) => <>

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
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --main-bg-color: #121723;
                --main-color: #9ca8bd;

                --accent-bg-color: #47a0b7;
                --accent-color: white;
            }
        }
        
        @media (prefers-color-scheme: light) {
            :root {
                --main-bg-color: #f2f2f2;
                --main-color: #121723;

                --accent-bg-color: #47a0b7;
                --accent-color: white;
            }
        }

        html {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
            background: var(--accent-bg-color);
            color: var(--accent-color);
            border: 0;
            font-size: var(--font-normal);
            padding: var(--gaps-large) var(--gaps-xlarge); 
            border-radius: 3px;
            cursor: pointer;
        }


        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            letter-spacing: 0.03em  ;
            padding: 0;
            margin: 0;
        }

        h1 {
            font-size: var(--font-xlarge)
        }
    `}</style>

</>