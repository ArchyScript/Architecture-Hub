import { fetchAllPosts, fetchSinglePost } from '@/controller/api/posts.api'
import {
  fetchAllCompetitions,
  fetchSingleCompetition,
} from '@/controller/api/competitions'
import {
  fetchSingleScholarship,
  fetchAllScholarships,
} from '@/controller/api/scholarships'
import {
  fetchAllUsers,
  fetchSingleUserByUsername,
} from '@/controller/api/users.api'
import { all___Comments, all___Likes } from '@/controller/api/reactions.api'

const singleUser: any = {}
const singlePost: any = {}
const singleCompetition: any = {}
const singleScholarship: any = {}
const allUsers: any = []
const allPosts: any = []
const allCompetitions: any = []
const allScholarships: any = []
const allPostComments: any = []
const allCompetitionComments: any = []
const allScholarshipComments: any = []
const allPostLikes: any = []
const allCompetitionLikes: any = []
const allScholarshipLikes: any = []

const state = {
  singleUser,
  singlePost,
  singleScholarship,
  singleCompetition,
  allUsers,
  allPosts,
  allCompetitions,
  allScholarships,

  //
  allPostComments,
  allPostLikes,
  allScholarshipComments,
  allScholarshipLikes,
  allCompetitionComments,
  allCompetitionLikes,
}

export default {
  namespaced: true,
  state,
  getters: {
    getSingleUser: (state: any) => {
      return state.singleUser
    },
    getSinglePost: (state: any) => {
      return state.singlePost
    },
    getSingleScholarship: (state: any) => {
      return state.singleScholarship
    },
    getSingleCompetition: (state: any) => {
      return state.singleCompetition
    },
    getAllUsers: (state: any) => {
      return state.allUsers
    },
    getAllPosts: (state: any) => {
      return state.allPosts
    },
    getAllCompetitions: (state: any) => {
      return state.allCompetitions
    },
    getAllScholarships: (state: any) => {
      return state.allScholarships
    },

    //
    getAllPostComments: (state: any) => {
      return state.allPostComments
    },
    getAllCompetitionComments: (state: any) => {
      return state.allCompetitionComments
    },
    getAllScholarshipComments: (state: any) => {
      return state.allScholarshipComments
    },
    getAllPostLikes: (state: any) => {
      return state.allPostLikes
    },
    getAllCompetitionLikes: (state: any) => {
      return state.allCompetitionLikes
    },
    getAllScholarshipLikes: (state: any) => {
      return state.allScholarshipLikes
    },
  },

  actions: {
    async setSingleUser({ commit }: any, username: string) {
      const response: any = await fetchSingleUserByUsername(username)
      const { data } = response

      commit('SET_SINGLE_USER', data)
    },
    async setSinglePost({ commit }: any, _id: string) {
      const response: any = await fetchSinglePost(_id)
      const { data } = response

      commit('SET_SINGLE_POST', data)
    },
    async setSingleCompetition({ commit }: any, _id: string) {
      const response: any = await fetchSingleCompetition(_id)
      const { data } = response

      commit('SET_SINGLE_COMPETITION', data)
    },
    async setSingleScholarship({ commit }: any, _id: string) {
      const response: any = await fetchSingleScholarship(_id)
      const { data } = response

      commit('SET_SINGLE_SCHOLARSHIP', data)
    },
    async getAllCompetitions({ commit }: any) {
      const response: any = await fetchAllCompetitions()
      const { data } = response

      commit('SET_ALL_COMPETITIONS', data)
    },
    async getAllScholarships({ commit }: any) {
      const response: any = await fetchAllScholarships()
      const { data } = response

      commit('SET_ALL_SCHOLARSHIPS', data)
    },
    async getAllPosts({ commit }: any) {
      const response: any = await fetchAllPosts()
      const { data } = response

      commit('SET_ALL_POSTS', data)
    },
    async getAllUsers({ commit }: any) {
      const response: any = await fetchAllUsers()
      const { data } = response

      commit('SET_ALL_USERS', data)
    },

    // REACTIONS
    // comments
    async getAllPostComments({ commit }: any) {
      const response: any = await all___Comments('post')
      const { data } = response

      commit('SET_ALL_POST_COMMENTS', data)
    },
    async getAllCompetitionComments({ commit }: any) {
      const response: any = await all___Comments('competition')
      const { data } = response

      commit('SET_ALL_COMPETITION_COMMENTS', data)
    },
    async getAllScholarshipComments({ commit }: any) {
      const response: any = await all___Comments('scholarship')
      const { data } = response

      commit('SET_ALL_SCHOLARSHIP_COMMENTS', data)
    },
    // likes
    async getAllPostLikes({ commit }: any) {
      const response: any = await all___Likes('post')
      const { data } = response

      commit('SET_ALL_POST_LIKES', data)
    },
    async getAllCompetitionLikes({ commit }: any) {
      const response: any = await all___Likes('competition')
      const { data } = response

      commit('SET_ALL_COMPETITION_LIKES', data)
    },
    async getAllScholarshipLikes({ commit }: any) {
      const response: any = await all___Likes('scholarship')
      const { data } = response

      commit('SET_ALL_SCHOLARSHIP_LIKES', data)
    },
  },

  //
  mutations: {
    SET_SINGLE_USER(state: any, data: any) {
      if (!data) return

      return (state.singleUser = data)
    },
    SET_SINGLE_POST(state: any, data: any) {
      if (!data) return

      return (state.singlePost = data)
    },
    SET_SINGLE_COMPETITION(state: any, data: any) {
      if (!data) return

      return (state.singleCompetition = data)
    },
    SET_SINGLE_SCHOLARSHIP(state: any, data: any) {
      if (!data) return

      return (state.singleScholarship = data)
    },
    SET_ALL_COMPETITIONS(state: any, data: any) {
      if (!data) return

      return (state.allCompetitions = data)
    },
    SET_ALL_SCHOLARSHIPS(state: any, data: any) {
      if (!data) return

      return (state.allScholarships = data)
    },
    SET_ALL_USERS(state: any, data: any) {
      if (!data) return

      return (state.allUsers = data)
    },
    SET_ALL_POSTS(state: any, data: any) {
      if (!data) return

      return (state.allPosts = data)
    },

    // REACTIONS
    // comments
    SET_ALL_POST_COMMENTS(state: any, data: any) {
      if (!data) return

      return (state.allPostComments = data)
    },
    SET_ALL_COMPETITION_COMMENTS(state: any, data: any) {
      if (!data) return

      return (state.allCompetitionComments = data)
    },
    SET_ALL_SCHOLARSHIP_COMMENTS(state: any, data: any) {
      if (!data) return

      return (state.allScholarshipComments = data)
    },
    // likes
    SET_ALL_POST_LIKES(state: any, data: any) {
      if (!data) return

      return (state.allPostLikes = data)
    },
    SET_ALL_COMPETITION_LIKES(state: any, data: any) {
      if (!data) return

      return (state.allCompetitionLikes = data)
    },
    SET_ALL_SCHOLARSHIP_LIKES(state: any, data: any) {
      if (!data) return

      return (state.allScholarshipLikes = data)
    },
  },
}
