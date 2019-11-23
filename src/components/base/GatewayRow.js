/**
 * Required modules.
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeGateway } from "../../actions/actions";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import * as routes from "../../utils/routes";
import _ from "lodash";

/**
 * Renders a row inside the table of gateways from
 * home page. Make basic actions such as to navigate
 * to gateway details page and remove the gateway.
 */
const GatewayRow = ({ gateway, removed }) => {
    const [loading, isLoading] = useState();

    const dispatch = useDispatch();
    let history = useHistory();

    // Dispatch action for calling endpoint in order
    // to remove this gateway.
    const removeIt = () => {
        isLoading(true);

        dispatch(removeGateway(gateway.serial)).then((e) => {
            removed(e);
            isLoading(false);
        });
    };

    return (
        <tr>
            <td>{gateway.serial}</td>
            <td>{gateway.name}</td>
            <td>{gateway.ipv4}</td>
            <td>
                <Button
                    onClick={() => {
                        history.push(_.replace(
                            routes.GATEWAYS_DETAILS,
                            ":serial",
                            gateway.serial
                        ))
                    }}
                    title="Details"
                    color="primary"
                    size="sm"
                >
                    <span role="img" aria-label="">✏</span>
                    <span className="d-none d-md-inline">
                        &nbsp;Details
                    </span>
                </Button>
                <Button
                    title="Remove"
                    onClick={removeIt}
                    disabled={loading}
                    color="danger"
                    outline
                    size="sm"
                >
                    <span role="img" aria-label="">❌</span>
                    <span className="d-none d-md-inline">
                        &nbsp;Remove
                    </span>
                </Button>
            </td>
        </tr>
    );
};

/**
 * Exporting component
 */
export default GatewayRow;
