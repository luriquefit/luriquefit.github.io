import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/morango.jpg";
import banner2 from "../assets/melancia.jpg";
import banner3 from "../assets/cafe.jpg";
import banner4 from "../assets/cookie.jpg";

const banners = [banner1, banner2, banner3, banner4];

export default function HomeCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: true,
    pauseOnHover: true,
    swipe: true,
    draggable: true,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings} className="carousel-slider">
        {banners.map((img, i) => (
          <div key={i} className="w-full flex justify-center items-center">
            <img
              src={img}
              className="w-full max-w-5xl h-[600px] md:h-[1000px] object-cover m-0"
              alt={`banner-${i + 1}`}
              draggable={false}
              style={{ marginBottom: 0 }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
