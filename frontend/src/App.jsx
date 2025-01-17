import React, { useState } from "react";
import Header from "./component/layout/Header/Header";
import UserOptions from "./component/layout/Header/UserOptions";
import Footer from "./component/layout/Footer/Footer";
import WebFont from "webfontloader";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import store from "./store/store";
import { loadUser } from "./store/actions/userAction";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Poppins", "Montserrat", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Header user={user} isAuthenticated={isAuthenticated} />
      <Outlet />
      <Footer />
    </>
  );
  
};

export default App;
