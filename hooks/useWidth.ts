import React, { useState, useEffect } from "react";

export default function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWidth(window.innerWidth);
      console.log(window.innerWidth);
      
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  return width;
}
