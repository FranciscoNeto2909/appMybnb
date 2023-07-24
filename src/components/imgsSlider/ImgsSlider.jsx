import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from 'swiper/modules';
import { serverUrl } from "../../assets/api";
import { useEffect, useState } from "react";


export default function ImgsSlider({ imgs }) {
    const [navigation, setNavigation] = useState(false)

    function handleResize() {
        if (window.innerWidth > 750) {
            setNavigation(true)
        } else {
            setNavigation(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <Swiper
            slidesPerView={1}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            navigation={navigation}
            loop={true}
        >
            {imgs.map((img, i) => (
                <SwiperSlide key={i}>
                    <img className="card-img" src={`${serverUrl}acomodationImages/${img}`} alt="house" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}