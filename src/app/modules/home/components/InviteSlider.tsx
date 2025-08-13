import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Share2, TrendingUp } from "lucide-react";
import { Card } from "../../../../components/Card";

const InviteSlider = () => {
  const settings = useMemo(
    () => ({
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3200,
      infinite: true,
      speed: 350,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    []
  );

  const slides = [
    {
      title: "+100% mining rate for 24 hours",
      subtitle: "when you invite new members",
      cta: "Start inviting",
      icon: <TrendingUp className="text-[#F5C242]" />,
    },
    {
      title: "Invite 2 friends, unlock cap",
      subtitle: "Boost your daily earnings instantly",
      cta: "Share link",
      icon: <Share2 className="text-[#F5C242]" />,
    },
    {
      title: "+100% mining rate for 24 hours",
      subtitle: "when you invite new members",
      cta: "Start inviting",
      icon: <TrendingUp className="text-[#F5C242]" />,
    },
    {
      title: "Invite 2 friends, unlock cap",
      subtitle: "Boost your daily earnings instantly",
      cta: "Share link",
      icon: <Share2 className="text-[#F5C242]" />,
    },
  ];

  return (
    <Card className="p-5">
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i}>
            <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              {/* Left side - Icon + Text */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#F5C242]/15 border border-[#F5C242]/25">
                  {s.icon}
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-[#F5F7FA]">{s.title}</p>
                  <p className="text-sm text-[#9AA0A6]">{s.subtitle}</p>
                </div>
              </div>

              {/* Right side - Button */}
              <a
                href="#"
                className="shrink-0 rounded-full px-4 py-2 font-medium bg-[#F5C242] text-[#101014] hover:opacity-90 transition"
              >
                {s.cta}
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default InviteSlider;
