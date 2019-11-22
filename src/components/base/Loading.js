import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
    return (
        <div className="d-flex align-items-center">
            <Spinner type="grow" color="primary" />
            &nbsp;Loading...
        </div>
    );
};

export default Loading;
