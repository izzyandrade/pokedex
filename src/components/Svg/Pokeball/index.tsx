import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function PokeballSvg(props: any) {
  return (
    <Svg width={130} height={135} viewBox="0 0 130 115" fill="none" {...props}>
      <Path
        d="M72.5-15c37.309 0 68.086 27.765 72.5 63.613h-35.385c-4.029-16.637-19.117-29-37.115-29s-33.086 12.363-37.115 29H0C4.414 12.765 35.19-15 72.5-15z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M109.615 66.387H145C140.586 102.235 109.809 130 72.5 130 35.19 130 4.414 102.235 0 66.387h35.385c4.029 16.637 19.117 29 37.115 29s33.086-12.363 37.115-29z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M72.5 81.355c13.273 0 24.034-10.68 24.034-23.855S85.774 33.645 72.5 33.645c-13.273 0-24.034 10.68-24.034 23.855S59.226 81.355 72.5 81.355z"
        fill="url(#prefix__paint2_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={72.5}
          y1={-15}
          x2={72.5}
          y2={130}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.3} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={72.5}
          y1={-15}
          x2={72.5}
          y2={130}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.3} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={72.5}
          y1={-15}
          x2={72.5}
          y2={130}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.3} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default PokeballSvg;
