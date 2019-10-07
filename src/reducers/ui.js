const initialState = {
    drawerOpen: true,
    settingsRevokeModalOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return Object.assign({}, state, {
                ...state,
                drawerOpen: !state.drawerOpen
            });

        case 'TOGGLE_SETTINGS_REVOKE_MODAL':
            return Object.assign({}, state, {
                ...state,
                settingsRevokeModalOpen: action.isOpen
            });

        default:
            return state;
    }
  }
  