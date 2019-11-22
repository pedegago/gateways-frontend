import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGateways } from "../../actions/actions";
import { Table } from "reactstrap";
import _ from "lodash";
import GatewayRow from "../base/GatewayRow";
import useAlert from "../hooks/useAlert";
import Loading from "../base/Loading";

const Dashboard = () => {
    const [loading, isLoading] = useState(true);
    const [alert, showAlert] = useAlert();

    const dispatch = useDispatch();
    const gateways = useSelector((state) => state.gateways);

    useEffect(() => {
        dispatch(getAllGateways()).then((e) => {
            if (!e.status)
                showAlert(
                    e,
                    "",
                    "An error occurred. Please, try reloading entire page."
                );

            isLoading(false);
        });
    }, [dispatch]);

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
                <Table borderless hover responsive>
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

export default Dashboard;
