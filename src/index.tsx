import ReactDOM from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { RecoilRoot } from "recoil";
import { darkTheme } from "./theme";
import reset from "styled-reset";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
${reset}
  * {
    box-sizing: border-box; 

  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    line-height: 1;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </RecoilRoot>
);
