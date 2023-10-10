import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import "./custom.css";
import {
  ChakraProvider,
  extendTheme,
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/react";
import { checkboxAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys,
);

const pinned = definePartsStyle({
  control: defineStyle({
    rounded: "full",
    float: "right",
    margin: "5px",
    position: "relative",
  }),
  container: {
    display: "inline-block",
  },
});

export const theme = extendTheme({
  components: {
    Checkbox: {
      variants: {
        pinned: pinned,
      },
    },
  },
});

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      </ChakraProvider>
    );
  }
}
