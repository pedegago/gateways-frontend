import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDevices } from "../../actions/actions";
import { Table } from "reactstrap";
import _ from "lodash";
import DeviceRow from "./DeviceRow";
import Loading from "./Loading";

const DevicesTable = ({ gateway, alert }) => {
    const [devices, setDevices] = useState([]);
    const [loading, isLoading] = useState(true);

    const dispatch = useDispatch();

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
                <Table borderless hover responsive>
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

export default DevicesTable;
