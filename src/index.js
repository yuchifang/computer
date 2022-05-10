import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    *{
        padding:0;
        margin:0;  
        list-style: none;
    }
`;

ReactDOM.render(
  <>
    <App />
    <GlobalStyle />{" "}
  </>,
  document.getElementById("root")
);
