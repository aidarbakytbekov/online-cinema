export interface IPath {
  _id: string
  path: string
  title: string
}

export interface IOverview {
  name: string
  paths: IPath[]
}