const initialState = {
  drawerOpen: true,
  settingsRevokeModalOpen: false,
};

export type UI = typeof initialState;

export default (state: UI = initialState, action: UI & {type: string}) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case 'TOGGLE_SETTINGS_REVOKE_MODAL':
      return {
        ...state,
        settingsRevokeModalOpen: action.settingsRevokeModalOpen
      }

    default:
      return state;
  }
};
