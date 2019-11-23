/**
 * Required modules.
 */
import React from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../../utils/routes";

/**
 * Renders the header of all application.
 */
const Header = () => {
    let history = useHistory();

    return (
        <header>
            <div>
                <h1>
                    {"📚 Gateways and Devices"}&nbsp;
                    <small>Application for managing Gateways and Devices.</small>
                </h1>
                <nav>
                    <button onClick={() => {
                        history.push(routes.DASHBOARD)
                    }}>
                        <span role="img" aria-label="">🏠</span>
                        &nbsp;Home
                    </button>
                    <button onClick={() => {
                        history.push(routes.GATEWAYS_CREATE)
                    }}>
                        <span role="img" aria-label="">➕</span>
                        &nbsp;Add Gateway
                    </button>
                    <button onClick={() => {
                        history.push(routes.DEVICES_CREATE)
                    }}>
                        <span role="img" aria-label="">➕</span>
                        &nbsp;Add Device
                    </button>
                </nav>
            </div>
        </header>
    );
};

/**
 * Exporting component
 */
export default Header;
