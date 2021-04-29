import {config as dotenvConf} from 'dotenv'
dotenvConf()

export const config = {
  serverUrl: process.env.REACT_APP_SERVER_URL
} 