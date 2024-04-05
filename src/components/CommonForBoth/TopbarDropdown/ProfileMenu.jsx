import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import bpaLogo from "../../../assets/images/logo_bpadash_dark.png";

function ProfileMenu(props) {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item "
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user bg-blue-600"
                        src={bpaLogo}
                        alt="Header Avatar"
                    />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem tag="a" href="#">
                        {" "}
                        <i className="bx bx-user font-size-16 align-middle me-1" />
                        {props.t("Perfil")}{" "}
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                        <i className="bx bx-wrench font-size-16 align-middle me-1" />
                        {props.t("Configurações")}
                    </DropdownItem>
                    <div className="dropdown-divider" />
                    <Link to="/logout" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                        <span>{props.t("Logout")}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

ProfileMenu.propTypes = {
    success: PropTypes.any,
    t: PropTypes.any,
};

const mapStatetoProps = (state) => {
    const { error, success } = state.Profile;
    return { error, success };
};

export default withRouter(
    connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);

