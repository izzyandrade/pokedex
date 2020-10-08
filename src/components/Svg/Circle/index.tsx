import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

function CircleSvg(props: any) {
  return (
    <Svg width={125} height={125} viewBox="0 0 125 125" fill="none" {...props}>
      <Circle
        cx={62.5}
        cy={62.5}
        r={60}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={5}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={62}
          y1={125}
          x2={14}
          y2={24}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.35} />
          <Stop offset={0.422} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CircleSvg;
