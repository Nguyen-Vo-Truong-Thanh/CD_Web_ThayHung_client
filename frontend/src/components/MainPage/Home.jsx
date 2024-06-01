import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"

const Home = () => {
  return (
    <>
      <div className="w-100 h-100 pt-4 pb-4">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-3 d-none d-sm-block">
              <Categories />
            </div>
            <div className="col-md-8 col-sm-12">
              <SliderHome className="col-md-8"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
