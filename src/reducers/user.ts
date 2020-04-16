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

export type User = typeof initialState;

export default (state = initialState, action: User & {type: string}) => {
  switch (action.type) {
    case 'AUTH_READY':
      return {
        ...state,
        authReady: true,
      };

    case 'LOGIN_LOGOUT_PENDING':
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        login: {
          errorMessage: '',
          successMessage: action.login.successMessage,
        },
      };

    case 'LOGIN_FAILURE':
      return {
        ...initialState,
        authReady: true,
        login: {
          errorMessage: action.login.errorMessage,
          successMessage: '',
        },
      };

    case 'LOGOUT_COMPLETE':
      return {
        ...initialState, // reset all values except authReady
        authReady: true,
      };

    case 'LOGIN_MESSAGES_RESET':
      return {
        ...state,
        login: {
          errorMessage: '',
          successMessage: '',
        },
      };

    case 'USER_INIT_LOADING':
      return {
        ...state,
        loading: action.loading,
      };

    case 'USER_INIT_SUCCESS':
      return {
        ...state,
        loading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        avatar: action.avatar,
      };

    case 'USER_INIT_ERROR':
      return {
        ...state,
        loading: false,
        login: {
          ...state.login,
          errorMessage: '',
        },
      };

    default:
      return state;
  }
};
