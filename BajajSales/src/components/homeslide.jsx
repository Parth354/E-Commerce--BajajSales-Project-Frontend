import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeSlide = () => {
  const settings = {
    infinite: true,
    speed: 1500,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="/home1.jpg" style={{width:"100vw", height:'64vh'}} alt="Slide 1" />
      </div>
      <div>
        <img src="/home2.jpg" style={{width:"100vw"}} alt="Slide 2" />
      </div>
      <div>
        <img src="/home3.jpg" style={{width:"100vw"}} alt="Slide 3" />
      </div>
    </Slider>
  );
};

export default HomeSlide;
