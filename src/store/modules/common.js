import *as types from '../types';

 const state = {
	routeSave: null
 }

 const getters = {
	c_routeSave: state => state.routeSave
 }

 const mutations  = {
 	[types.ROUTE_SAVE](state, obj) {
 		state.routeSave = obj
	}
 }

 const actions = {
 	c_saveRouteStatus({commit}, obj) {
 		commit(types.ROUTE_SAVE, obj)
	}
 }

 export default {
	state,
    actions,
    getters,
    mutations
}