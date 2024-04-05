import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

function Dashboard(props) {
    document.title = "Dashboard | bpadashAdm - Vite React Admin & Dashboard Template";

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title={props.t("Dashboards")}
                        breadcrumbItem={props.t("Dashboard")}
                    />
                    Em Desenvolvimento
                </Container>
            </div>
        </>
    );
}

Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);

