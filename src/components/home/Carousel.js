import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageProp from '../../store/Carousel.json'



function CarouselComponent() {
  return (
    <Carousel
      autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
    >
      {imageProp.map((image, index) => {
        return (
          <div
            key={index}
            style={{ maxHeight: "36rem" }}
            className="object-center brightness-50"
          >
            <img
              src={`${image}`}
              alt="Indian Food"
            />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
