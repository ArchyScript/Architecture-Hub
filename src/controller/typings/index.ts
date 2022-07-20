// THIS FILE HOLDS ALL THE INTERFACES FOR THE APPLICATION
export type AnyObject = any
// export type AsyncFunction = (headers?: AnyObject) => Promise<any>
export type DateString = string

export interface AsyncResponse {
  data: any
  error: string | string[] | null | ''
  status: number | string
}

export type LikeType = 'hand' | 'heart' | 'emoji'

export type UserWithToken = User & { token: string | null }

export type ProfilePictureSchema = {
  name: string
  avatar: string
  cloudinary: string
}
export type LikeSchema = {
  _id: string
  like_type: LikeType
  liker_id: string
  post_id: string
}
export type CommentSchema = {
  _id: string
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
  _id: string
  user_id: string
  title: string
  content: string
  edited: boolean
  post_image: {
    title: string
    cloudinary_id: string
    avatar: string
  }
  comments: Comment[]
  likes: Like[]
}

export type CompetitionSchema = {
  _id: string
  title: string
  content: string
  link: string
  host: string
  description: string
  competition_image: {
    title: string
    cloudinary_id: string
    avatar: string
  }
  comments: Comment[]
  likes: Like[]
}
export type ScholarshipSchema = {
  _id: string
  title: string
  content: string
  link: string
  host: string
  description: string
  competition_image: {
    title: string
    cloudinary_id: string
    avatar: string
  }
  comments: Comment[]
  likes: Like[]
}

export type AuthUser = {
  _id: string
  email: string
  username: string
  password: boolean
}

export type Bio = {
  firstname: string
  lastname: string
  gender: string
  date_of_birth: string
  display_name: string
  description: string
}

export type Followers = {
  follower_id: string
}

export type Followings = {
  following_id: string
}

export type BookmarkedPosts = {
  post_id: string
}

export type Post = {
  post_id: string
}

export type ProfilePicture = {
  title: string
  avatar: string
  cloudinary_id: string
}

export type User =
  | {
      _id: string
      profile_picture: ProfilePicture
      bio: Bio
      posts?: Post[]
      followers?: Followers[]
      followings?: Followings[]
      bookmarked_posts?: BookmarkedPosts[]
      is_active: boolean
      createdAt: string
      updatedAt: string
    }
  | {}

export type UserSchema =
  | {
      _id: string
      profile_picture: ProfilePicture
      bio: Bio
      posts?: Post[]
      followers?: Followers[]
      followings?: Followings[]
      bookmarked_posts?: BookmarkedPosts[]
      is_active: boolean
      createdAt: string
      updatedAt: string
    }
  | {}
