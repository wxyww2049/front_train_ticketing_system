import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import { Pagination, Autoplay, A11y } from "swiper";
import QueryDetail from "../components/QueryDetail";
const imgurl = [
  "https://www.12306.cn/index/images/pic/banner10.jpg",
  "https://www.12306.cn/index/images/pic/banner26.jpg",
  "https://www.12306.cn/index/images/pic/banner11.jpg",
  "https://www.12306.cn/index/images/pic/banner13.jpg",
];
export default function QueryPage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box style={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          spaceBetween={50}
          loop={true}
          slidesPerView={1}
          parallax={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {imgurl.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(${item}) center center no-repeat`,
                  backgroundSize: "auto 100%",
                  width: "100%",
                  height: "200px",
                  color: "#ff000000",
                }}
              >
                " "
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box
        style={{
          marginTop: -10,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <Paper style={{ width: "90%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
          >
            <Tab value={0} label="单程" />
            <Tab value={1} label="往返" />
          </Tabs>
          <QueryDetail value={value} />
        </Paper>
      </Box>
    </div>
  );
}
