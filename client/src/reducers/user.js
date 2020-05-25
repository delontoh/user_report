export default function user (state = {}, action) {
    switch (action.type) {
        case 'SET_USER':
            let userInfo = {
                userId: action.user.userId || '',
                userName: action.user.userName || '',
                userType: action.user.userType || ''
            };
            return {
                ...state,
                userInfo
            }
        default:
            return state;
    }
}