// Main configuration fields to control sorting, labeling, and editable features.
type ConfigOptions = {
  label: string
  editable?: boolean
  mandatory?: boolean
}

export const configFields: { [key: string]: ConfigOptions } = {
  _id: {
    label: 'ID'
  },
  state: {
    label: 'Status'
  },
  firstname: {
    label: 'First Name',
    editable: true,
    mandatory: true
  },
  lastname: {
    label: 'Last Name',
    editable: true,
    mandatory: true
  },
  username: {
    label: 'Username',
    editable: true,
    mandatory: true
  },
  email: {
    label: 'e-mail',
    editable: true,
    mandatory: true
  },
  displayname: {
    label: 'Display Name',
    editable: true
  },
  company: {
    label: 'Company Name',
    editable: true
  },
  mfa: {
    label: 'MFA Options'
  }
}
