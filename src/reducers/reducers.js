/**
 * Required modules.
 */
import actionTypes from "../actions/actionTypes";
import _ from "lodash";

/**
 * Defines all reducers for gateways.
 */
export const gateways = (
    state = [],
    action
) => {
    switch (action.type) {
        // This action type inserts all available gateways
        // into store
        case actionTypes.FETCH_ALL_GATEWAYS:
            return [
                ...action.payload
            ]
        // This action type removes a specific gateway given
        // the serial number
        case actionTypes.REMOVE_GATEWAY:
            return _.filter(
                state,
                (s) => s.serial !== action.payload
            );
        // This action type adds a new gateway to
        // gateways list
        case actionTypes.ADD_GATEWAY:
            return [
                ...state,
                action.payload
            ];
        // This action type adds a new device to specific
        // gateway
        case actionTypes.ADD_DEVICE: {
            let index = 0;

            const gateway = _.find(state, (s, i) => {
                index = i;

                return s.serial === action.payload.gateway;
            });

            // Combines all changes made in the state.
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
        // This action type removes specific device
        // given the serial of the gateway which belongs to
        // and id.
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
