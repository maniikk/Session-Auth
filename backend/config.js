import env from '../../Environment/config'
export const {
    PORT = env.PORT,
    NODE_ENV = env.NODE_ENV,
    MONGO_URI_LOCAL = env.MONGO_URI_LOCAL,
    SESS_NAME = env.SESS_NAME,
    SESS_SECRET = env.SESS_SECRET,
    SESS_LIFETIME = env.SESS_LIFETIME
} = process.env