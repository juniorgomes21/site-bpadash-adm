import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import {
    changeLayout,
    changeLayoutMode,
    changeSidebarTheme,
    changeSidebarThemeImage,
    changeSidebarType,
    changeTopbarTheme,
    changeLayoutWidth,
    showRightSidebarAction,
} from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../CommonForBoth/RightSidebar";

//redux
import { useSelector, useDispatch } from "react-redux";

function Layout(props) {
    const dispatch = useDispatch();

    const {
        isPreloader,
        leftSideBarThemeImage,
        layoutWidth,
        leftSideBarType,
        topbarTheme,
        showRightSidebar,
        leftSideBarTheme,
        layoutModeType,
    } = useSelector((state) => ({
        isPreloader: state.Layout.isPreloader,
        layoutModeType: state.Layout.layoutModeType,
        leftSideBarThemeImage: state.Layout.leftSideBarThemeImage,
        leftSideBarType: state.Layout.leftSideBarType,
        layoutWidth: state.Layout.layoutWidth,
        topbarTheme: state.Layout.topbarTheme,
        showRightSidebar: state.Layout.showRightSidebar,
        leftSideBarTheme: state.Layout.leftSideBarTheme,
    }));

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    function toggleMenuCallback() {
        if (leftSideBarType === "default") {
            dispatch(changeSidebarType("condensed", isMobile));
        } else if (leftSideBarType === "condensed") {
            dispatch(changeSidebarType("default", isMobile));
        }
    };

    function hideRightbar(event) {
        var rightbar = document.getElementById("right-bar");
        if (rightbar && rightbar.contains(event.target)) {
            return;
        } else {
            dispatch(showRightSidebarAction(false));
        }
    };


    useEffect(() => {
        document.body.addEventListener("click", hideRightbar, true);

        if (isPreloader === true) {
            document.getElementById("preloader").style.display = "block";
            document.getElementById("status").style.display = "block";

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("status").style.display = "none";
            }, 2500);
        } else {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("status").style.display = "none";
        }
    }, [isPreloader]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(changeLayout("vertical"));
    }, [dispatch]);

    useEffect(() => {
        if (leftSideBarTheme) {
            dispatch(changeSidebarTheme(leftSideBarTheme));
        }
    }, [leftSideBarTheme, dispatch]);

    useEffect(() => {
        if (layoutModeType) {
            dispatch(changeLayoutMode(layoutModeType));
        }
    }, [layoutModeType, dispatch]);

    useEffect(() => {
        if (leftSideBarThemeImage) {
            dispatch(changeSidebarThemeImage(leftSideBarThemeImage));
        }
    }, [leftSideBarThemeImage, dispatch]);

    useEffect(() => {
        if (layoutWidth) {
            dispatch(changeLayoutWidth(layoutWidth));
        }
    }, [layoutWidth, dispatch]);

    useEffect(() => {
        if (leftSideBarType) {
            dispatch(changeSidebarType(leftSideBarType));
        }
    }, [leftSideBarType, dispatch]);

    useEffect(() => {
        if (topbarTheme) {
            dispatch(changeTopbarTheme(topbarTheme));
        }
    }, [topbarTheme, dispatch]);


    return (
        <>
            <div id="preloader" >
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                    </div>
                </div>
            </div>

            <div id="layout-wrapper">
                <Header toggleMenuCallback={toggleMenuCallback} />
                <Sidebar
                    theme={leftSideBarTheme}
                    type={leftSideBarType}
                    isMobile={isMobile}
                />
                <div className="main-content">{props.children}</div>
                <Footer />
            </div>
            {showRightSidebar ? <RightSidebar /> : null}
        </>
    );
};

Layout.propTypes = {
    changeLayoutWidth: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarThemeImage: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.object,
    isPreloader: PropTypes.any,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
    location: PropTypes.object,
    showRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any,
};

export default withRouter(Layout);

