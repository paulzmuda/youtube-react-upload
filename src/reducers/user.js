const initialState = {
    authReady: false,
    loading: false,
    isAuthenticated: false,
    login: {
        errorMessage: '',
        successMessage: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_READY':
            return Object.assign({}, state, {
                ...state,
                authReady: true,
            });

        case 'LOGIN_PENDING':
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isAuthenticated: false,
            });

        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isAuthenticated: true,
                login: {
                    errorMessage: '',
                    successMessage: action.message,
                }
            });

        case 'LOGIN_FAILURE':
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isAuthenticated: false,
                login: {
                    errorMessage: action.message,
                    successMessage: '',
                }
            });

        case 'LOGOUT_PENDING':
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isAuthenticated: false,
            });

        case 'LOGOUT_COMPLETE':
            return Object.assign({}, state, {
                ...initialState, // reset all values except authReady
                authReady: true,
            });

        case 'LOGIN_MESSAGES_RESET':
            return Object.assign({}, state, {
                ...state,
                login: {
                    errorMessage: '',
                    successMessage: '',
                }
            });

        case 'USER_INIT_LOADING':
            return Object.assign({}, state, {
                ...state,
                loading: action.loading
            });

        case 'USER_INIT_SUCCESS':
            return Object.assign({}, state, {
                    ...state,
                    loading: false,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email,
                    avatar: action.avatar,
            });

        case 'USER_INIT_ERROR':
            return Object.assign({}, state, {
                ...state,
                loading: false,
                login: {
                    ...this.state.login,
                    errorMessage: '',
                }
            });

        default:
            return state;
    }
  }
  