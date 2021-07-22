import React from "react";
import DesktopCompare from "./devices/desktop/Compare";
import MobileCompare from "./devices/mobile/Compare";
import useWindowDimensions from "./useWindowDimensions";

const Compare = () => {
  const { width } = useWindowDimensions();
  return <>{width > 992 ? <DesktopCompare /> : <MobileCompare />}</>;
};

export default Compare;
