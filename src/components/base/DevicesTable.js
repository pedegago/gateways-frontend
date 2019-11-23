/**
 * Required modules.
 */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDevices } from "../../actions/actions";
import { Table } from "reactstrap";
import _ from "lodash";
import DeviceRow from "./DeviceRow";
import Loading from "./Loading";

/**
 * This component renders table with the information
 * of all devices of specific gateway and shows basic options
 * over each row.
 */
const DevicesTable = ({ gateway, alert }) => {
    const [devices, setDevices] = useState([]);
    const [loading, isLoading] = useState(true);

    const dispatch = useDispatch();

    // Fetching all devices of specific gateway.
    useEffect(() => {
        dispatch(getDevices(gateway)).then((e) => {
            if (!e.status)
                alert(
                    e,
                    "",
                    "An error occurred. Please, try reloading entire page."
                );
            else
                setDevices(e.data);

            isLoading(false);
        });
    }, [dispatch, setDevices, gateway]);

    // This functions will be called for children
    // in order to show when a row was or not removed.
    const removed = (id, res) => {
        setDevices([
            ..._.filter(devices, (d) =>
                d.id !== id
            )
        ]);

        alert(res, "Device removed from this gateway successfully.", "");
    };

    return (
        <>
            <h2>Devices list</h2>
            {loading ? (
                <Loading />
            ) : (
                <Table borderless hover responsive striped>
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!devices.length ? (
                            <tr>
                                <td colSpan={4}>No Devices.</td>
                            </tr>
                        ) : (
                            _.map(devices, (d) => (
                                <DeviceRow
                                    gateway={gateway}
                                    device={d}
                                    key={d.id}
                                    removed={removed}
                                />
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </>
    );
};

/**
 * Exporting component
 */
export default DevicesTable;
