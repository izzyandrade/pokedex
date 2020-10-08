import React from "react";
import PokeballSvg from "../../components/Svg/Pokeball";
import Pattern from "../../components/Svg/Pattern";
import BigPattern from "../../components/Svg/BigPattern";
import CircleSvg from "../../components/Svg/Circle";

const Drawings = () => {
  return (
    <>
      <BigPattern
        style={{
          position: "absolute",
          top: 350,
          left: 360,
          right: 0,
          bottom: 0,
        }}
      />
      <Pattern
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          right: 0,
          bottom: 0,
        }}
      />
      <Pattern
        style={{
          position: "absolute",
          top: 350,
          left: 80,
          right: 0,
          bottom: 0,
        }}
      />
      <CircleSvg
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 0,
          bottom: 0,
        }}
      />
      <PokeballSvg
        style={{
          position: "absolute",
          top: 0,
          left: 300,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
};

export default Drawings;
