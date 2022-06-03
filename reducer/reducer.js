
export const initialState = {
    phone_number : '',
    AuthConfirmation : null,
    user: '',
    fullName : '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PHONE':
            return {
                ...state,
                phone_number: action.payload,
            };
        case 'SET_CONF':
            return {
                ...state,
                AuthConfirmation: action.payload,
            };
        case 'SET_FULL_NAME':
            return {
                ...state,
                fullName : action.payload,
            };
        default:
            return state;
    }
};

export default reducer;