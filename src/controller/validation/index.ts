require('dotenv').config()

export const validation = {
  tokenValidation(token: string) {
    // validate token  here
    console.log(token)
    // console.log(process.env)
  },

  postValidation(post_id: string, user_id: string) {
    // validate post
    console.log(post_id)
    console.log(user_id)
  },
}

validation.tokenValidation('jkfjle;')
