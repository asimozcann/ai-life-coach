import { useEffect, useRef } from "react";
import lottie from "lottie-web-light";

const LiteLottie = ({ animationData, style }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!animationData) return;

    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => anim.destroy();
  }, [animationData]);

  return <div ref={container} style={style}></div>;
};

export default LiteLottie;
