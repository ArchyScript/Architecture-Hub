export default {
  namespaced: true,
  state: {
    current_active_modal: '',
    post_to_comment_on_id: '',
    comment_post_type: '',
    open_left_nav: false,
    open_new_post_modal: false,
    open_new_competition_modal: false,
    open_new_scholarship_modal: false,
    open_new_comment_modal: false,
    post_comment_object: {
      post_id: '',
      post_type: '',
    },
  },

  //
  getters: {
    getLeftNavVisibillity(state: any) {
      return state.open_left_nav
    },
    getPostToCommentOnId(state: any) {
      return state.post_to_comment_on_id
    },
    getNewCommentPostType(state: any) {
      return state.comment_post_type
    },
    getPostCommentObject(state: any) {
      return state.post_comment_object
    },
    getNewPostVisibillity(state: any) {
      return state.open_new_post_modal
    },
    getNewCompetitionVisibillity(state: any) {
      return state.open_new_competition_modal
    },
    getNewScholarshipVisibillity(state: any) {
      return state.open_new_scholarship_modal
    },
    getNewCommentVisibillity(state: any) {
      return state.open_new_comment_modal
    },
    getCurrentActiveModal(state: any) {
      return state.current_active_modal
    },
  },

  //
  actions: {
    async openActiveModal({ commit }: any, current_active_modal: string) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_ACTIVE_MODAL', current_active_modal)
    },
    async openLeftNav({ commit }: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_LEFT_NAV')
    },
    async openNewPostModal({ commit }: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_NEW_POST_MODAL')
    },
    async openNewCompetitionModal({ commit }: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_NEW_COMPETITION_MODAL')
    },
    async openNewScholarshipModal({ commit }: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_NEW_SCHOLARSHIP_MODAL')
    },
    async openCommentModal({ commit }: any, post_to_comment_on_id: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_NEW_COMMENT_MODAL', post_to_comment_on_id)
    },
    async getPostCommentObject({ commit }: any, post_comment_object: any) {
      commit('CLOSE_ALL_MODALS')
      commit('OPEN_NEW_COMMENT_MODAL', post_comment_object)
    },
    async closeAllModals({ commit }: any) {
      commit('CLOSE_ALL_MODALS')
    },
  },

  //
  mutations: {
    OPEN_ACTIVE_MODAL(state: any, current_active_modal: string) {
      return (state.current_active_modal = current_active_modal)
    },
    OPEN_LEFT_NAV(state: any) {
      return (state.open_left_nav = true)
    },
    OPEN_NEW_POST_MODAL(state: any) {
      return (state.open_new_post_modal = true)
    },
    OPEN_NEW_COMPETITION_MODAL(state: any) {
      return (state.open_new_competition_modal = true)
    },
    OPEN_NEW_SCHOLARSHIP_MODAL(state: any) {
      return (state.open_new_scholarship_modal = true)
    },
    OPEN_NEW_COMMENT_MODAL(state: any, { post_type, post_id }: any) {
      state.post_comment_object.post_type = post_type
      state.post_comment_object.post_id = post_id
      return (state.open_new_comment_modal = true)
    },

    CLOSE_ALL_MODALS(state: any) {
      state.open_left_nav = false
      state.open_new_post_modal = false
      state.open_new_competition_modal = false
      state.open_new_scholarship_modal = false
      state.open_new_comment_modal = false
    },
  },
}

/* 
    OPEN_LEFT_NAV: (state: any) => (state.open_left_nav = true),
    OPEN_NEW_POST_MODAL: (state: any) => (state.open_new_post_modal = true),
    OPEN_NEW_COMPETITION_MODAL: (state: any) =>
      (state.open_new_competition_modal = true),

    OPEN_NEW_COMMENT_MODAL: (state: any) =>
      (state.open_new_comment_modal = true),
 */
