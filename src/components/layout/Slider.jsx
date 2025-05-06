import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSliderImages from '../../services/useSliderImages';

const Slider = () => {
    const images = useSliderImages();
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    // Auto slide cada 7s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden h-[300px] md:h-[560px] transition-all duration-700">

            {/* Imagen actual */}
            <img
                key={current}
                src={images[current].url}
                alt={images[current].title || `Imagen ${current + 1}`}
                className="w-full h-full object-contain transition-all duration-700 md:mt-3"
            />

            {/* Botón anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition duration-300"
                aria-label="Anterior"
            >
                <ChevronLeft size={28} />
            </button>

            {/* Botón siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition duration-300"
                aria-label="Siguiente"
            >
                <ChevronRight size={28} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'
                            } transition`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
