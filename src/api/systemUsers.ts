import { JCAPI } from './base'

export type User = {
  _id: string
  [key: string]: string | number | boolean
}

class SystemUsersAPI extends JCAPI<User> {
  constructor(domain?: string) {
    super(domain)
    this.path = 'systemusers'
  }
}

const users = new SystemUsersAPI()
export { users }
