export interface NotificationProps {
  notifications: NotificationItems[]
}

export interface NotificationItems {
  id: number
  label: string
}

export interface NotificationDropdownProps {
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: () => void
  menuItems: MenuItem[]
}

export interface MenuItem {
  label: string
}