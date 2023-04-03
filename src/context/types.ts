export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id?: number
  role: string
  email?: string
  fullName?: string
  username: string
  password?: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export type DataGridRowType = {
  id: number;
  avatar: string;
  full_name: string;
  post: string;
  email: string;
  title: string;
  post_update: string;
  salary: number;
  age: string;
  experience: string;
  status: number;
  feedTypes : number[];
}

export type DataVideosGridRowType = {
  id: number;
  avatar: string;
  full_name: string;
  post: string;
  videoUrl: string;
  title: string;
  last_update: string;
  salary: number;
  age: string;
  experience: string;
  status: number;
}
export interface IFeedStory {
  created_at: string
  is_Service: boolean
  location: string
  site_id: number
  string_story: string
  images? : IImages[]
  tags: string[]
  updated_at: string
  user?: IUser
  user_id: number
  _id: string
  videos : {
    url : string
  }
}

export interface IImages {
  url : string,
  width: number,
  _id : string
}
export interface IUser {
  id: number
  photo: string
  username: string
}