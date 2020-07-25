import { App } from './app';
import { env } from './env';

try {
    const app = new App();
    const port: number = env.app.port;

    app.createExpressServer(port);
}catch (error) {
    console.log(error);
}