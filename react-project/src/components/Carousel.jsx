import Carousel from "react-bootstrap/Carousel";

export default function CarouselComponent() {
    return (
    <div className="mt-4">
        <Carousel fade>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src="../../public/images/img-carousel-1.png"
                alt="img-carousel-1"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src="../../public/images/img-carousel-2.png"
                alt="img-carousel-2"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src="../../public/images/img-carousel-3.png"
                alt="img-carousel-3"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src="../../public/images/img-carousel-4.png"
                alt="img-carousel-4"
            />
            </Carousel.Item>
            <Carousel.Item>            
            <img
                className="d-block w-100"
                src="../../public/images/img-carousel-5.png"
                alt="img-carousel-5"
            />
            </Carousel.Item>
        </Carousel>
        </div>
    );
}