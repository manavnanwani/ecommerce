import React from "react";
import useWindowDimensions from "./useWindowDimensions";
import DesktopProduct from "./devices/desktop/Product";
import MobileProduct from "./devices/mobile/Product";
const Product = () => {
  const { width } = useWindowDimensions();
  return <>{width > 992 ? <DesktopProduct /> : <MobileProduct />}</>;
};

export default Product;
