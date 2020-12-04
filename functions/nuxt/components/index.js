export { default as Logo } from '../..\\..\\src\\components\\Logo.vue'
export { default as NavBar } from '../..\\..\\src\\components\\NavBar.vue'
export { default as SideBar } from '../..\\..\\src\\components\\SideBar.vue'

export const LazyLogo = import('../..\\..\\src\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
export const LazyNavBar = import('../..\\..\\src\\components\\NavBar.vue' /* webpackChunkName: "components_NavBar" */).then(c => c.default || c)
export const LazySideBar = import('../..\\..\\src\\components\\SideBar.vue' /* webpackChunkName: "components_SideBar" */).then(c => c.default || c)
