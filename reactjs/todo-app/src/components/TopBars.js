import {useRef} from "react";
import {TopBar} from "@shopify/polaris";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const TopBars = () => {
    const defaultState = useRef({
        emailFieldValue: 'dharma@jadedpixel.com',
        nameFieldValue: 'Xquenda Andreev',
    });

    const userMenuMarkup = (
        <TopBar.UserMenu
            name={defaultState.current.nameFieldValue}
            initials="XA"
        />
    );

    return (
        <TopBar
            userMenu={userMenuMarkup}
        />
    );
};

export default TopBars;