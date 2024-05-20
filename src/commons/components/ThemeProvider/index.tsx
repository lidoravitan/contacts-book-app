import { ConfigProvider, theme } from 'antd'
import { useMachineSelector } from '../../../simple-fsm'
import { ThemeState, themeMachine } from '../../../machines/theme.machine'
import { Global, css } from '@emotion/react'

const commonCss = css`
  body {
    margin: 0;
  }

  * {
    font-family: 'Titillium Web', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
`

const dark = css`
  :root {
    color-scheme: dark;
    --primary: #1890ff;
    --secondary: #334657;
    --error: #ce0606;
    --success: #009070;
    --natural-0: #ffffff;
    --natural-10: #000;

    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --space-xl: 4rem;
  }
  ${commonCss}
`

const light = css`
  :root {
    color-scheme: light;
    --primary: #1890ff;
    --secondary: #9fb1c0;
    --error: #ce0606;
    --success: #009070;
    --natural-0: #000;
    --natural-10: #ffffff;

    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --space-xl: 4rem;
  }
  ${commonCss}
`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const machineState = useMachineSelector(themeMachine)

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Titillium Web',
        },
        components: {
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0,
          },
        },
        algorithm: machineState === ThemeState.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Global styles={machineState === ThemeState.DARK ? dark : light} />
      {children}
    </ConfigProvider>
  )
}
