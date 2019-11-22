import actionTypes from "./actionTypes";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllGateways = () =>
    async (dispatch) =>
        axios.get(
            `${API_URL}/gateways`
        ).then((res) => {
            if (res.status === 200)
                dispatch({
                    type: actionTypes.FETCH_ALL_GATEWAYS,
                    payload: res.data
                });

            return res;
        }).catch((e) => {
            return e;
        });

export const getGateway = (gateway) =>
        async (dispatch) =>
            axios.get(
                `${API_URL}/gateways/${gateway}`
            ).then((res) => {
                if (res.status === 200)
                    return {
                        status: 200,
                        data: res.data
                    }

                return res;
            }).catch((e) => {
                return e;
            });

export const removeGateway = (serial) =>
    async (dispatch) =>
        axios.delete(
            `${API_URL}/gateways/${serial}`
        ).then((res) => {
            if (res.status === 204)
                dispatch({
                    type: actionTypes.REMOVE_GATEWAY,
                    payload: serial
                });

            return res;
        }).catch((e) => {
            return e;
        });

export const createGateway = (serial, name, ipv4) =>
    async (dispatch) =>
        axios.post(
            `${API_URL}/gateways`,
            {
                serial,
                name,
                ipv4
            }
        ).then((res) => {
            dispatch({
                type: actionTypes.ADD_GATEWAY,
                payload: res.data
            });

            return res;
        }).catch((e) => {
            return e;
        });

export const updateGateway = (gateway, serial, name, ipv4) =>
    async (dispatch) =>
        axios.put(
            `${API_URL}/gateways/${gateway}`,
            {
                serial,
                name,
                ipv4
            }
        ).then((res) => {
            return res;
        }).catch((e) => {
            return e;
        });

export const getDevices = (gateway) =>
    async (dispatch) =>
        axios.get(
            `${API_URL}/gateways/${gateway}/devices`
        ).then((res) => {
            if (res.status === 200)
                return {
                    status: 200,
                    data: res.data
                }

            return res;
        }).catch((e) => {
            return e;
        });

export const createDevice = (gateway, isOnline, vendor) =>
    async (dispatch) =>
        axios.post(
            `${API_URL}/gateways/${gateway}/devices`,
            {
                isOnline,
                vendor
            }
        ).then((res) => {
            dispatch({
                type: actionTypes.ADD_DEVICE,
                payload: {
                    gateway,
                    device: res.data
                }
            });

            return res;
        }).catch((e) => {
            return e;
        });


export const removeDevice = (gateway, id) =>
    async (dispatch) =>
        axios.delete(
            `${API_URL}/gateways/${gateway}/devices/${id}`
        ).then((res) => {
            if (res.status === 204)
                dispatch({
                    type: actionTypes.REMOVE_DEVICE,
                    payload: {
                        gateway,
                        id
                    }
                });

            return res;
        }).catch((e) => {
            return e;
        });
