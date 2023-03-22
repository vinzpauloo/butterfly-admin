export type VideoType = {
  _id: string
  user_id: number
  approved_by: number
  video_url: string
  trial_video_uid: string
  full_video_uid: string
  thumbnail_url: string
  title: string
  description: string
  orientation: string
  duration: string
  approval: string
  tags: string[]
  created_at: string
  updated_at: string
  user: UserType
}

export type UserType = {
  id: number
  photo: string
  username: string
}
