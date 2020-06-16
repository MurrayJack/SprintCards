export const Layout = ({ children }) => <>

    <main>
        {children}
    </main>

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
            }
        }
        
        @media (prefers-color-scheme: light) {
            :root {
                --main-bg-color: #f2f2f2;
                --main-color: #121723;
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



    `}</style>

</>