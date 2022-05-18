
export const initialState = {
    phn : '',
    conf : null,
    user : '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PHONE':
            return {
                ...state,
                phn: action.payload,
            };
        case 'SET_CONF':
            return {
                ...state,
                conf: action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;