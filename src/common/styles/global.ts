import { createGlobalStyle } from 'styled-components'

import theme from './theme'

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &::before,
    &::after {
      box-sizing: inherit;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Cor da scrollbar */
    ::-webkit-scrollbar-track {
      background-color: #FFF;
    }

    /* Cor da barra de rolagem */
    ::-webkit-scrollbar-thumb {
      background-color: #D5D5D5;
      border-radius: 5px;
    }

    /* Hover da barra de rolagem */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #aaa;
    }
      }

    //temporário somente para colocar a pagina com height 100%
    html,
    body,
    body {
      font-family: ${theme.font.family};
    }
    *{
      user-select: text;
    }

`

export default GlobalStyles
