export enum AppRoutes {
  MAIN = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  CHAT = 'chat',
  // PROFILE = 'profile',

  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/'
export const getRouteLogin = () => '/login'
export const getRouteRegister = () => '/register'
export const getRouteChat = (id: string) => `/chat/${id}`

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteLogin()]: AppRoutes.LOGIN,
  [getRouteChat(':id')]: AppRoutes.CHAT,
  // [getRouteProfile(':id')]: AppRoutes.PROFILE,

}
