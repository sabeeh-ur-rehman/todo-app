import ReactDom from "react-dom";
import Layout from "./src/components/Main";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import React from "react";

const Applayout = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<Applayout />);
