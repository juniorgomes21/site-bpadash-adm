import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import { Link } from "react-router-dom";

function Sidebar(props) {
    return (
        <>
            <div className="vertical-menu !bg-gradient-to-tl from-gray-800 via-gray-600 to-gray-800">
                <div className="navbar-brand-box !bg-gray-700 ">
                    <Link to="/" className="logo logo-light">
                        <span className="logo-lg">
                            <p className="font-bold text-white text-md">
                                BPADASH ADM
                            </p>
                        </span>
                    </Link>
                </div>
                <div data-simplebar className="h-100">
                    {props.type !== "condensed" ? (
                        <SidebarContent />
                    ) : (
                        <SidebarContent />
                    )}
                </div>

                <div className="sidebar-background"></div>
            </div>
        </>
    );
}

Sidebar.propTypes = {
    type: PropTypes.string,
};

const mapStatetoProps = (state) => {
    return {
        layout: state.Layout,
    };
};
export default connect(
    mapStatetoProps,
    {}
)(withRouter(withTranslation()(Sidebar)));
