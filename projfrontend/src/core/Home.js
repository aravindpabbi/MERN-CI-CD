import React from 'react'
import { API } from '../backend';
import Base from "./Base"
import "../styles.css";

const Home = () => {

  console.log("API IS", API)
  return (
    <Base title="Home Page" description="An MERN stack E-commerce site">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
    </Base>
  )
}

export default Home;