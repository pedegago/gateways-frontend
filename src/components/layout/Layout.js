/**
 * Required modules.
 */
import React from "react";
import { Route } from "react-router-dom";
import * as routes from "../../utils/routes";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "../pages/Dashboard";
import GatewayCreate from "../pages/GatewayCreate";
import GatewayDetails from "../pages/GatewayDetails";
import DeviceCreate from "../pages/DeviceCreate";

/**
 * Defines the basic layout of all aplication.
 * Also defines all routes.
 */
const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Route
                    exact
                    path={routes.DASHBOARD}
                    component={Dashboard}
                />
                <Route
                    path={routes.GATEWAYS_CREATE}
                    component={GatewayCreate}
                />
                <Route
                    path={routes.GATEWAYS_DETAILS}
                    component={GatewayDetails}
                />
                <Route
                    path={routes.DEVICES_CREATE}
                    component={DeviceCreate}
                />
            </main>
            <Footer />
        </>
    );
};

/**
 * Exporting component
 */
export default Layout;
