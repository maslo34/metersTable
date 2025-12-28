import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    font-family: Roboto, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: inherit;
    line-height: inherit;
    color: #333;
    background-color: #F8F9FA;
    overflow-x: hidden;
  }
  
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
