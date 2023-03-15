type APIParams = {
  path: string
  options?: RequestInit | undefined
}

class JCAPI<T> {
  private domain: string
  public path: string = ''
  constructor(domain?: string) {
    this.domain = import.meta.env.DOMAIN || domain || 'https://us-central1-mikeplayground-8af67.cloudfunctions.net/jc/api'
  }
  public baseFetch(params: APIParams): Promise<Record<string, any>> {
    return fetch(`${this.domain}/${params.path}`, params.options || {}).then((response) =>
      response.json()
    )
  }
  public getAll(): Promise<T[]> {
    return this.baseFetch({ path: this.path }).then((data) => {
      return new Promise((resolve, reject) => {
        resolve(data.results)
      })
    })
  }
  public get(id: string) {
    return this.baseFetch({ path: `${this.path}/${id}` })
  }
  public create(user: T) {
    return this.baseFetch({
      path: `${this.path}`,
      options: {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'content-type': 'application/json' }
      }
    })
  }
  public update(id: string, user: T) {
    return this.baseFetch({
      path: `${this.path}/${id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'content-type': 'application/json' }
      }
    })
  }
  public delete(id: string) {
    return this.baseFetch({
      path: `${this.path}/${id}`,
      options: { method: 'DELETE' }
    })
  }
}

export { JCAPI }
