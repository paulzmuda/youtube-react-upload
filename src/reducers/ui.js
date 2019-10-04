const initialState = {
    drawerOpen: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return Object.assign({}, state, {
                ...state,
                drawerOpen: !state.drawerOpen
            });

        default:
            return state;
    }
  }
  