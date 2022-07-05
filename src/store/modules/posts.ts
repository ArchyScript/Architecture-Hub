import { fetchAllPosts, fetchSinglePost } from '@/controller/api/posts.api'

const posts = [
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
  {
    _id: '62a88a9675a64e7ba1a0c451',
    content: `tje ljsn; ;s sf sfsfosnflsr ms;fm;fs fsfs;fl`,
  },
]

const state = {
  posts,
}

export default {
  namespaced: true,
  state,
  //
  getters: {
    //
    allPosts: (state: any) => {
      return state
    },
    //
    getSinglePost: (state: any) => {
      return state.posts
    },
  },

  actions: {
    //
    async getSinglePost({ commit }: any, post_id: any) {
      const response: any = await fetchSinglePost(post_id)

      const { data } = response

      console.log(data)

      commit('GET_SINGLE_POST', data)
    },
    //
    async getAllPosts({ commit }: any) {
      const response: any = await fetchAllPosts()

      const { data } = response

      console.log(data)

      commit('GET_ALL_POSTS', data)
    },
  },

  //
  mutations: {
    //
    ALL_POSTS(state: any, posts: any) {
      return (state.posts = posts)
    },
    //
    GET_SINGLE_POST: (state: any, posts: any) => {
      return (state.posts = posts)
    },
  },
}
