import React from "react";
import DesktopHome from "./devices/desktop/Home";
import MobileHome from "./devices/mobile/Home";
import useWindowDimensions from "./useWindowDimensions";

const Home = () => {
  const { width } = useWindowDimensions();

  return <>{width > 992 ? <DesktopHome /> : <MobileHome />}</>;
};

export default Home;
