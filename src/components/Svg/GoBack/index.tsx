import * as React from "react";
import Svg, { Path } from "react-native-svg";

function GoBack(props: any) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M19.216 9.223H4.88l6.263-6.263a1.294 1.294 0 00-.415-2.1 1.279 1.279 0 00-1.394.277L.875 9.595a1.278 1.278 0 000 1.81l8.459 8.458a1.28 1.28 0 001.81-1.81L4.88 11.79h14.336c.706 0 1.284-.577 1.284-1.283s-.578-1.284-1.284-1.284z"
        fill="#fff"
      />
    </Svg>
  );
}

export default GoBack;
