"use client"

import React, { useState } from "react"
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/utils/styles"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface CarouselProps {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  autoScroll?: boolean
  scrollSpeed?: number
  maxItems?: number
  slidesToShow?: number
  centerMode?: boolean
  fade?: boolean
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  )
}

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
      aria-label="Next slide"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  )
}

export function Carousel({
  children,
  className,
  itemClassName,
  autoScroll = true,
  scrollSpeed = 0.3,
  maxItems = 20,
  slidesToShow = 4,
  centerMode = false,
  fade = false,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const childrenArray = React.Children.toArray(children).slice(0, maxItems)
  
  const autoplaySpeed = Math.max(1, Math.round(0.3 / scrollSpeed)) * 1000
  
  const responsive = [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: Math.min(4, slidesToShow),
        slidesToScroll: 1,
        centerMode: centerMode,
        centerPadding: centerMode ? '40px' : '0',
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: centerMode,
        centerPadding: centerMode ? '40px' : '0',
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: centerMode,
        centerPadding: centerMode ? '30px' : '0',
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '40px',
        arrows: false,
      },
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoScroll,
    autoplaySpeed: autoplaySpeed,
    cssEase: "cubic-bezier(0.45, 0, 0.55, 1)",
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: responsive,
    centerMode: centerMode,
    centerPadding: centerMode ? '60px' : '0',
    fade: fade,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    swipeToSlide: true,
    focusOnSelect: true,
    adaptiveHeight: true,
  }

  return (
    <div className={cn("relative group carousel-container", className)}>
      <div className="carousel-gradient-left absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white/80 to-transparent dark:from-gray-900/80 pointer-events-none" />
      
      <Slider {...settings}>
        {React.Children.map(childrenArray, (child, index) => (
          <div 
            key={index} 
            className={cn(
              "px-2 transition-all duration-300 carousel-item", 
              itemClassName,
              currentSlide === index ? "scale-100" : "scale-95 opacity-80"
            )}
          >
            {child}
          </div>
        ))}
      </Slider>
      
      <div className="carousel-gradient-right absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white/80 to-transparent dark:from-gray-900/80 pointer-events-none" />
    </div>
  )
} 