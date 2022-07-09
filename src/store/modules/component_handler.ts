export default {
  namespaced: true,
  state: {
    show_left_nav: false,
    show_new_post_modal: false,
    show_new_competition_modal: false,
  },

  //
  getters: {
    getLeftNavVisibillity(state: any) {
      return state.show_left_nav
    },
    getNewPostVisibillity(state: any) {
      return state.show_new_post_modal
    },
    getNewCompetitionVisibillity(state: any) {
      return state.show_new_competition_modal
    },
  },

  //
  actions: {
    async toggleLeftNav({ commit }: any, current_state: string) {
      commit('RESET_STATE_TO_DEFAULT')
      commit('TOGGLE_SIDE_NAV', current_state)
    },
    async toggleNewPostModal({ commit }: any, current_state: string) {
      commit('RESET_STATE_TO_DEFAULT')
      commit('TOGGLE_NEW_POST_MODAL', current_state)
    },
    async toggleNewCompetitionModal({ commit }: any, current_state: string) {
      commit('RESET_STATE_TO_DEFAULT')
      commit('TOGGLE_NEW_COMPETITION_MODAL', current_state)
    },
  },

  //
  mutations: {
    TOGGLE_SIDE_NAV(state: any, current_state: string) {
      if (current_state === 'opened') return (state.show_left_nav = false)
      if (current_state === 'closed') return (state.show_left_nav = true)
    },
    TOGGLE_NEW_POST_MODAL(state: any, current_state: string) {
      if (current_state === 'opened') return (state.show_new_post_modal = false)
      if (current_state === 'closed') return (state.show_new_post_modal = true)
    },
    TOGGLE_NEW_COMPETITION_MODAL(state: any, current_state: string) {
      if (current_state === 'opened')
        return (state.show_new_competition_modal = false)
      if (current_state === 'closed')
        return (state.show_new_competition_modal = true)
    },
    RESET_STATE_TO_DEFAULT(state: any) {
      state.show_left_nav = false
      state.show_new_post_modal = false
      state.show_new_competition_modal = false
    },
  },
}
