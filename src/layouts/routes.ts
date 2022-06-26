import dashboardRoutes from 'layouts/routes/admin/dashboard'
import settingsRoutes from 'layouts/routes/admin/settings'
import homeRoutes from 'layouts/routes/public/home'

const globalRoutes = [].concat(dashboardRoutes, settingsRoutes, homeRoutes)

export default globalRoutes
