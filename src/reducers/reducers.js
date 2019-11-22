import actionTypes from "../actions/actionTypes";
import _ from "lodash";

export const gateways = (
    state = [],
    action
) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_GATEWAYS:
            return [
                ...action.payload
            ]
        case actionTypes.REMOVE_GATEWAY:
            return _.filter(
                state,
                (s) => s.serial !== action.payload
            );
        case actionTypes.ADD_GATEWAY:
            return [
                ...state,
                action.payload
            ];
        case actionTypes.ADD_DEVICE: {
            let index = 0;

            const gateway = _.find(state, (s, i) => {
                index = i;

                return s.serial === action.payload.gateway;
            });

            if (gateway) {
                return [
                    ..._.slice(state, 0, index),
                    {
                        ...gateway,
                        devices: [
                            ...gateway.devices,
                            action.payload.device
                        ]
                    },
                    ..._.slice(state, index + 1)
                ];
            }

            break;
        }
        case actionTypes.REMOVE_DEVICE: {
            let index = 0;

            const gateway = _.find(state, (s, i) => {
                index = i;

                return s.serial === action.payload.gateway;
            });

            if (gateway) {
                _.remove(gateway.devices, (d) =>
                    d.id === action.payload.id
                );

                return [
                    ..._.slice(state, 0, index),
                    gateway,
                    ..._.slice(state, index + 1)
                ];
            }

            break;
        }
        default:
            break;
    }

    return state;
}
