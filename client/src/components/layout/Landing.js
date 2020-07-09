import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container text-center  mt-15">
        <div className="row">
          <div className="col-sm-12 ">
            <h1>
              Welcome to{" "}
              <span style={{ fontFamily: "monospace" }}>RostersGG</span>
            </h1>
            <p>An esports team owner's and captain's one-stop-shop for managing their teams!</p>
            </div>
            </div>
            <div className="row mt-4">
            <div className="col-sm-12">
              <Link
                to="/register"
                className="btn btn-large btn-dark hoverable"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-large btn-light hoverable ml-5"
              >
                Log In
              </Link>
            </div>
           
          </div>
        </div>
      
    );
  }
}
export default Landing;