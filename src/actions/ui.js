export function openCloseDrawer() {
    return {
      type: 'TOGGLE_DRAWER',
    };
  }

export function openCloseSettingsRevokeModal(isOpen) {
  return {
    type: 'TOGGLE_SETTINGS_REVOKE_MODAL',
    isOpen
  }
}