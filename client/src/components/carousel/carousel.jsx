
import React, { useEffect, useState } from "react";
import "./carousel.css";

const slides = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWceUITxJa28F3dW_cEPiOu0cKFty0alVhldrQixeS9g&s=10",
    title: "Big Shopping Deals",
    text: "Up to 70% Off",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpV3l23zbZKnCLymvfnWookBeCrxw1sb9fEk0QkFxXA&s=10",
    title: "Electronics Sale",
    text: "Best prices on electronics",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt394mR-KhxNc2Hv6sZe594dX6AD9-0BhSIFDadrvpng&s=10",
    title: "Fashion Sale",
    text: "Trendy products at great prices",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  // AUTOPLAY EVERY 5 SECONDS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((previous) => {
        return (previous + 1) % slides.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">

      <img
        src={slides[current].image}
        alt={slides[current].title}
      />

      <div className="carousel-content">
        <h1>{slides[current].title}</h1>
        <p>{slides[current].text}</p>
        <button>Shop Now</button>
      </div>

    </div>
  );
}

export default Carousel;
