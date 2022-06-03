
export const initialState = {
    phone_number : '',
    session : null,
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
        case 'SET_SESSION':
            return {
                ...state,
                session: action.payload,
            };
        case 'SET_FULL_NAME':
            return {
                ...state,
                fullName : action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                user : action.payload,
            };
        default:
            return state;
    }
};

export default reducer;