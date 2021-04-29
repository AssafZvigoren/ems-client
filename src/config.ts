import {config as dotenvConf} from 'dotenv'
dotenvConf()

export const config = {
  serverUrl: process.env.SERVER_URL
} 