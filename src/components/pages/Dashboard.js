/**
 * Required modules.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGateways } from "../../actions/actions";
import { Table } from "reactstrap";
import _ from "lodash";
import GatewayRow from "../base/GatewayRow";
import useAlert from "../hooks/useAlert";
import Loading from "../base/Loading";


/**
 * This page renders table with the information
 * of all gateways and shows basic options over
 * each row.
 */
const Dashboard = () => {
    const [loading, isLoading] = useState(true);
    const [alert, showAlert] = useAlert();

    const dispatch = useDispatch();
    const gateways = useSelector((state) => state.gateways);

    // Fetching all gateways in first render,
    // and storing it into global store.
    useEffect(() => {
        dispatch(getAllGateways()).then((e) => {
            // Show an alert with errors.
            if (!e.status)
                showAlert(
                    e,
                    "",
                    "An error occurred. Please, try reloading entire page."
                );

            isLoading(false);
        });
    }, [dispatch]);

    // This functions will be called for children
    // in order to show when a row was or not removed.
    const removed = (res) => {
        showAlert(
            res,
            "Gateway removed successfully."
        );
    };

    return (
        <article>
            {alert}
            <h2>Gateways List</h2>
            {loading ? (
                <Loading />
            ) : (
                <Table borderless hover responsive striped>
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Ipv4</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!gateways.length ? (
                            <tr>
                                <td colSpan={4}>No Gateways.</td>
                            </tr>
                        ) : (
                            _.map(gateways, (g) => (
                                <GatewayRow
                                    gateway={g}
                                    key={g.serial}
                                    removed={removed}
                                />
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </article>
    );
};

/**
 * Exporting component
 */
export default Dashboard;
