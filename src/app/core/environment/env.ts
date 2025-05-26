import { config } from './config';

export const environment = {
    production: false,
    api: {
        urlBase: '/api',
        endpoints: {
        login: '/login',
        refresh: '/refresh',
        sql: '/query'
        // users: 'users',
        // products: 'products',
        // pedidos: 'pedidos',
    }
  }
}