import default_axios_instance from './axios_config'
import {
  HandleAxiosResponse,
  HandleAxiosError,
} from '../utilities/axios_return_response'

//
export const commentOnPost = async (params: any, payload: any) => {
  const { commenter_id, post_id, post_type } = params

  try {
    const response = await default_axios_instance
      .post(
        `reactions/${post_type}/comments/${commenter_id}/${post_id}`,
        payload,
      )
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const specificComment = async (params: any) => {
  const { post_type, comment_id } = params

  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/comments/${comment_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const singleCommentOnPost = async (comment_id: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/comments/${comment_id}`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const deleteComment = async (params: any) => {
  const { commenter_id, comment_id } = params
  try {
    const response = await default_axios_instance
      .delete(`reactions/comments/${commenter_id}/${comment_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//

//
// export const createNewLike = async (params: any) => {
//   const { liker_id, post_id } = params

//   try {
//     const response = await default_axios_instance
//       .post(`reactions/likes/${liker_id}/${post_id}`)
//       .then(async (response) => response)

//     return HandleAxiosResponse(response)
//   } catch (error) {
//     return HandleAxiosError(error)
//   }
// }

//
export const all___Comments = async (post_type: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/comments`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const all___Likes = async (post_type: any) => {
  try {
    const response = await default_axios_instance
      .get(`reactions/${post_type}/likes`)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const createNewLike = async (params: any) => {
  const { liker_id, post_id, post_type } = params
  const payload = { like_type: 'heart' }

  try {
    const response = await default_axios_instance
      .post(`reactions/${post_type}/likes/${liker_id}/${post_id}`, payload)
      .then(async (response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

//
export const reverseLike = async (params: any) => {
  const { post_type, liker_id, like_id } = params
  // localhost:4000/api/reactions/post/likes/62cab7cdc0873b83d04dfd6f/62deb2c82f7f5b14d791cc36
  try {
    const response = await default_axios_instance
      .delete(`reactions/${post_type}/likes/${liker_id}/${like_id}`)
      .then((response) => response)

    return HandleAxiosResponse(response)
  } catch (error) {
    return HandleAxiosError(error)
  }
}

/* 
//
const {
  newPostComment,
  singlePostComment,
  deletePostComment,
} = require('../controller/reactions.posts.comments')
const {
  newPostLike,
  reversePostLike,
} = require('../controller/reactions.posts.likes')


router.get('/post/comments/:comment_id', singlePostComment)
router.post('/post/comments/:commenter_id/:post_id', newPostComment)
router.delete('/post/comments/:commenter_id/:comment_id', deletePostComment)
router.post('/post/likes/:liker_id/:post_id', newPostLike)
router.delete('/post/likes/:liker_id/:like_id', reversePostLike)

//
const {
  newCompetitionComment,
  singleCompetitionComment,
  deleteCompetitionComment,
} = require('../controller/reactions.competitions.comments')
const {
  newCompetitionLike,
  reverseCompetitionLike,
} = require('../controller/reactions.competitions.likes')

// 
router.post(
  '/competition/comments/:commenter_id/:competition_id',
  newCompetitionComment,
)
router.get('/competition/comments/:comment_id', singleCompetitionComment)
router.delete(
  '/competition/comments/:commenter_id/:comment_id',
  deleteCompetitionComment,
)
router.post('/competition/likes/:liker_id/:competition_id', newCompetitionLike)
router.delete('/competition/likes/:liker_id/:like_id', reverseCompetitionLike)

//
const {
  newScholarshipComment,
  singleScholarshipComment,
  deleteScholarshipComment,
} = require('../controller/reactions.scholarships.comments')
const {
  newScholarshipLike,
  reverseScholarshipLike,
} = require('../controller/reactions.scholarships.likes')


router.post(
  '/scholarship/comments/:commenter_id/:scholarship_id',
  newScholarshipComment,
)
router.get('/scholarship/comments/:comment_id', singleScholarshipComment)
router.delete(
  '/scholarship/comments/:commenter_id/:comment_id',
  deleteScholarshipComment,
)
router.post('/scholarship/likes/:liker_id/:scholarship_id', newScholarshipLike)
router.delete('/scholarship/likes/:liker_id/:like_id', reverseScholarshipLike)

 */
