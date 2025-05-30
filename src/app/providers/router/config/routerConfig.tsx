// import { NotFoundPage } from '@/pages/NotFoundPage'
// import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { LoginPage } from '@/pages/LoginPage'
import { AppRoutesProps } from '@/shared/types/router'
import { AppRoutes, getRouteChat, getRouteLogin, getRouteMain, getRouteRegister } from '@/shared/consts/router'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ChatPage } from '@/pages/ChatPage'
import { MainPage } from '@/pages/MainPage'
import { RegisterPage } from '@/pages/RegisterPage'

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />
  },
  [AppRoutes.REGISTER]: {
    path: getRouteRegister(),
    element: <RegisterPage />
  },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true
  },
  [AppRoutes.CHAT]: {
    path: getRouteChat(':id'),
    element: <ChatPage />,
    authOnly: true
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />
  }
}
