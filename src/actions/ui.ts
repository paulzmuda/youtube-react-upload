export function openCloseDrawer() {
  return {
    type: 'TOGGLE_DRAWER',
  };
}

export function openCloseSettingsRevokeModal(settingsRevokeModalOpen: Boolean) {
  return {
    type: 'TOGGLE_SETTINGS_REVOKE_MODAL',
    settingsRevokeModalOpen,
  };
}
