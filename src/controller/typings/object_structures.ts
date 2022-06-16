// THIS FILE HOLDS ALL THE INTERFACES FOR THE APPLICATION
export type AnyObject = any
export type AsyncFunction = (headers?: AnyObject) => Promise<any>
export type DateString = string

export interface AsyncResponse {
  data: any
  error: string | string[] | null
  status: number | string
}

export type ToastAlertType = 'success' | 'info' | 'warn' | 'error'
export type LikeType = 'success' | 'info' | 'warn' | 'error'

export type UserWithToken = AuthUser & { token: string }

export type PurchaseCoursePayload = {
  userId: string
  courseId: string
}

export type ProfilePictureSchema = {
  name: string
  avatar: string
  cloudinary: string
}
export type LikeSchema = {
  like_type: string
  liker_id: string
  post_id: string
}
export type CommentSchema = {
  comment: string
  commenter_id: string
  edited?: string
  post_id: string
}

export type Comment = {
  comment_id: string
}

export type Like = {
  like_id: string
}

export type PostSchema = {
  user_id: string
  title: string
  content: string
  edited: boolean
  comments: Comment[]
  likes: Like[]
}

export type AuthUser = {
  email: string
  username: string
  password: boolean
}

export type Bio = {
  firstname: string
  lastname: string
  gender: string
  date_of_birth: string
}

export type Followers = {
  follower_id: string
}

export type Followings = {
  following_id: string
}

export type Post = {
  post_id: string
}

export type ProfilePicture = {
  title: string
  avatar: string
  cloudinary_id: string
}

export type UserSchema = {
  user_id: string
  profile_picture?: ProfilePicture
  bio?: Bio
  posts?: Post[]
  followers?: Followers[]
  followings?: Followings[]
  is_active: boolean
}
