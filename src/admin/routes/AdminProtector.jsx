import React from "react";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
// import Login from "../pages/Login";

const AdminProtector = ({ compo }) => {
    const { manager } = useSelector((state) => state.auth);

    return (
        <div>
            {manager ? (
                <>{compo}</>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default AdminProtector;