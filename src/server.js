import app from './app.js'
import { envs } from './config/environments/environments.js'

app.listen(envs.PORT, () => {
    console.log('Port online on port 3100')
})