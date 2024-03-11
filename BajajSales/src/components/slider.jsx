import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideImageCarousel = () => {
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
        <img src="src/assets/sellerregister1(3).jpg" style={{height:"100vh"}} alt="Slide 1" />
      </div>
      <div>
        <img src="src/assets/sellerregister1(2).jpg" style={{height:"100vh"}} alt="Slide 2" />
      </div>
      <div>
        <img src="src/assets/sellerregister1(1).jpg" style={{height:"100vh"}} alt="Slide 3" />
      </div>
    </Slider>
  );
};

export default SlideImageCarousel;
