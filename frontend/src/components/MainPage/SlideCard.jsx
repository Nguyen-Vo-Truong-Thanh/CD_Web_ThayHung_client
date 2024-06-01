import React from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sử dụng thư viện ngzoro antd
import { Card, Button  } from 'antd';

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  return (
    <Slider {...settings} className="w-100">
      {Sdata.map((value, index) => (
        <Card className="w-100 bg-slide" key={index} >

          <div className="bg-image">
            <img src={value.cover} />
          </div>

          <div className="bg-content">
            <div className="code-box-price">{value.title}</div>
            <div className="pt-2 pb-2">{value.desc}</div>
            <Button type="primary">Visit Collections</Button>
          </div>
        </Card>
      ))}
    </Slider>
  );
};

export default SlideCard;
