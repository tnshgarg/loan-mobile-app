
export const initialState = {
    phone_number : '',
    session : null,
    user: null,
    fullName : '',
    AadhaarFront : null,
    AadhaarBack : null,
    PanFront : null,
    AadhaarTransactionId: null,
    AadharData: null,
    AadhaarDataFront:null,
    AadhaarDataBack:null,
    AadhaarVerifedStatus:null,
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
        case 'SET_AADHAAR_TRANSACTION_ID':
            return {
                ...state,
                AadhaarTransactionId : action.payload,
            };
        case 'SET_AADHAAR_DATA':
            return {
                ...state,
                AadhaarData : action.payload,
            };
        case 'SET_ID':
            switch(action.payload.type){
                case 'AADHAAR_FRONT':
                    return {
                        ...state,
                        AadhaarFront : action.payload.data,
                    };
                case 'AADHAAR_BACK':
                    return {
                        ...state,
                        AadhaarBack : action.payload.data,
                    };
                case 'PAN_FRONT':
                    return {
                        ...state,
                        PanFront : action.payload.data,
                    };
            }
        case 'SET_AADHAAR_OCR_DATA':
            switch(action.payload.type){
                case 'AADHAAR_FRONT':
                    return {
                        ...state,
                        AadhaarDataFront : action.payload.data,
                    };
                case 'AADHAAR_BACK':
                    return {
                        ...state,
                        AadhaarDataBack : action.payload.data,
                    };
            }
        case 'SET_AADHAAR_VERIFED_STATUS':
            return {
                ...state,
                AadhaarVerifedStatus : action.payload,
            };
        default:
            return state;
    }
};

export default reducer;