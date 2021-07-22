import React from 'react';
import {
    BrowserView,
    MobileView
} from "react-device-detect";
import DesktopWishList from './devices/desktop/WishList';
import MobileWishList from './devices/mobile/WishList';


const WishList = () => {
    return (
        <>
            <BrowserView>
                <DesktopWishList />
            </BrowserView>
            <MobileView>
                <MobileWishList />
            </MobileView>
        </>
    )
}

export default WishList
