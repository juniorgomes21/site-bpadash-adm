import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

function ManagerUser(props) {

    document.title = "Gerenciar Usuário";

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Gerenciar Usuário")} breadcrumbItem={props.t("Gerenciar Usuário")} />
                    <p>
                        Manager User
                    </p>
                </Container>
            </div>

        </>
    )
}

ManagerUser.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(ManagerUser);
