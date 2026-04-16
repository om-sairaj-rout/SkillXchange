import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import previewImg1 from "../../assets/previewImg1.jpeg";
import previewImg2 from "../../assets/previewImg2.jpeg";
import previewImg3 from "../../assets/previewImg3.jpeg";
import previewImg4 from "../../assets/previewImg4.jpeg";
import previewImg5 from "../../assets/previewImg5.jpeg";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// ✅ FIXED images array
const images = [
  { id: 1, img: previewImg1 },
  { id: 2, img: previewImg2 },
  { id: 3, img: previewImg3 },
  { id: 4, img: previewImg4 },
  { id: 5, img: previewImg5 },
];

const PreviewSection = ({ rotateAmplitude = 3 }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);

  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  const [index, setIndex] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);

    setLastY(offsetY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute text-6xl left-0 top-60 sm:left-10 sm:top-50 lg:left-30 lg:top-250 text-gray-600"
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      {/* Image Section */}
      <motion.figure
        ref={ref}
        className="relative w-full h-full mt-16 mb-10 max-w-4xl mx-auto flex flex-col items-center justify-center shadow-2xl rounded-[15px]"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        <motion.div
          className="relative w-full max-w-4xl"
          style={{ rotateX, rotateY }}
        >
          {/* ✅ FIXED: dynamic image + animation */}
          <motion.img
            key={index}
            src={images[index].img}
            alt="preview"
            className="w-full rounded-[15px] will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.figure>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute text-6xl right-0 top-60 sm:right-10 sm:top-50 lg:right-30 lg:top-250 text-gray-600"
      >
        <MdOutlineKeyboardArrowRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mb-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-[#D9712E]" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default PreviewSection;