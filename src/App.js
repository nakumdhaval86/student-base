import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "./index.scss";
import "./App.css";
import Navbar from "./layout/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./componets/Home";
import StudentForm from "./componets/StudentForm";
import StudentView from "./componets/StudentView";
import Login from "./componets/Login";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/student/add" component={StudentForm} />
        <ProtectedRoute
          exact
          path="/student/view/:id"
          component={StudentView}
        />
        <ProtectedRoute
          exact
          path="/student/edit/:id?"
          component={StudentForm}
        />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
