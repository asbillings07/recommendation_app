import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

* {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  font-family: 'Oswald', sans-serif;
  background-color: #cccccc;
}


`
