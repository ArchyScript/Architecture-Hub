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

const singleUser: any = {}
const singlePost: any = {}
const singleCompetition: any = {}
const singleScholarship: any = {}
const allUsers: any = []
const allPosts: any = []
const allCompetitions: any = []
const allScholarships: any = []

const state = {
  singleUser,
  singlePost,
  singleScholarship,
  singleCompetition,
  allUsers,
  allPosts,
  allCompetitions,
  allScholarships,
}

export const users = {
  namespaced: true,
  state,
  getters: {
    getSingleUser: (state: any) => {
      return state.singleUser
    },
    getSinglePost: (state: any) => {
      return state.singleUser
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
      return state.allUsers
    },
    getAllCompetitions: (state: any) => {
      return state.allCompetitions
    },
    getAllScholarships: (state: any) => {
      return state.allScholarships
    },
  },

  actions: {
    async singleUser({ commit }: any, username: string) {
      const response: any = await fetchSingleUserByUsername(username)
      const { data } = response

      commit('SET_SINGLE_USER', data)
    },
    async singlePost({ commit }: any, _id: string) {
      const response: any = await fetchSinglePost(_id)
      const { data } = response

      commit('SET_SINGLE_POST', data)
    },
    async singleCompetition({ commit }: any, _id: string) {
      const response: any = await fetchSingleCompetition(_id)
      const { data } = response

      commit('SET_SINGLE_COMPETITION', data)
    },
    async singleScholarship({ commit }: any, _id: string) {
      const response: any = await fetchSingleScholarship(_id)
      const { data } = response

      commit('SET_SINGLE_SCHOLARSHIP', data)
    },
    async allCompetitions({ commit }: any) {
      const response: any = await fetchAllCompetitions()
      const { data } = response

      commit('SET_ALL_COMPETITIONS', data)
    },
    async allScholarships({ commit }: any) {
      const response: any = await fetchAllScholarships()
      const { data } = response

      commit('SET_ALL_SCHOLARSHIPS', data)
    },
    async allPosts({ commit }: any) {
      const response: any = await fetchAllPosts()
      const { data } = response

      commit('SET_ALL_POSTS', data)
    },
    async allUsers({ commit }: any) {
      const response: any = await fetchAllUsers()
      const { data } = response

      commit('SET_ALL_USERS', data)
    },
  },

  //
  mutations: {
    SET_SINGLE_USER(state: any, data: any) {
      console.log(data)
      return (state.singleUser = data)
    },
    SET_SINGLE_POST(state: any, data: any) {
      console.log(data)
      return (state.singleUser = data)
    },
    SET_SINGLE_COMPETITION(state: any, data: any) {
      console.log(data)
      return (state.singleCompetition = data)
    },
    SET_SINGLE_SCHOLARSHIP(state: any, data: any) {
      console.log(data)
      return (state.singleScholarship = data)
    },
    SET_ALL_COMPETITIONS(state: any, data: any) {
      console.log(data)
      return (state.allCompetitions = data)
    },
    SET_ALL_SCHOLARSHIPS(state: any, data: any) {
      console.log(data)
      return (state.allScholarships = data)
    },
    SET_ALL_USERS(state: any, data: any) {
      console.log(data)
      return (state.allUsers = data)
    },
    SET_ALL_POSTS(state: any, data: any) {
      console.log(data)
      return (state.allUsers = data)
    },
  },
}

/*
console.log('halda j adgj adk aadakdlad adhaldadn;abirvbe vefgvef eb')
console.log('halda j adgj adk aadakdlad adhaldadn;abirvbe vefgvef eb')
console.log('halda j adgj adk aadakdlad adhaldadn;abirvbe vefgvef eb')
console.log('halda j adgj adk aadakdlad adhaldadn;abirvbe vefgvef eb')
console.log('halda j adgj adk aadakdlad adhaldadn;abirvbe vefgvef eb')
*/
