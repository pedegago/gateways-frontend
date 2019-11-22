import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeDevice } from "../../actions/actions";
import { Button } from "reactstrap";

const GatewayRow = ({ gateway, device, removed }) => {
    const [loading, isLoading] = useState();

    const dispatch = useDispatch();

    const removeIt = () => {
        isLoading(true);

        dispatch(removeDevice(gateway, device.id)).then((e) => {
            removed(device.id, e);
            isLoading(false);
        });
    };

    return (
        <tr>
            <td>{device.vendor}</td>
            <td>
                {new Date(device.dateCreated).toLocaleString()}
            </td>
            <td className="pl-4 pl-md-2">
                {device.isOnline
                    ? (
                        <>
                            🔵
                            <span className="d-none d-md-inline">
                                &nbsp;Online
                            </span>
                        </>
                    ) : (
                        <>
                            🔴
                            <span className="d-none d-md-inline">
                                &nbsp;Offline
                            </span>
                        </>
                    )
                }
            </td>
            <td>
                <Button
                    title="Remove"
                    onClick={removeIt}
                    disabled={loading}
                    outline
                    color="danger"
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

export default GatewayRow;
