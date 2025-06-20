import React, { useState, useEffect } from 'react';


const ImageSlider = ({images, autoSlide = true, autoSlideInterval = 2000}) => {
    
    const [currentIndex,setCurrentIndex] = useState(0); // aktif resim için

    const length = images.length;

    const nextSlide = () => {
        // prev = önceki
        setCurrentIndex((prev) => (prev + 1) % length);
      };
    
      const prevSlide = () => {
        // prev = önceki
        setCurrentIndex((prev) => (prev - 1 + length) % length);
      };

 // Otomatik geçiş (isteğe bağlı)
 useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [currentIndex, autoSlide, autoSlideInterval]);

  return (
    <div class="container">
      {/* Görsel */}
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        style={{width:"100%",height:"50vh"}}
      />

      {/* Sol ok */}
      <button
        onClick={prevSlide}
        className={"absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"}
      >
        ‹
      </button>

      {/* Sağ ok */}
      <button
        onClick={nextSlide}
        className={"absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"}
      >
        ›
      </button>

      {/* Noktalar */}
      <div className={"absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;


