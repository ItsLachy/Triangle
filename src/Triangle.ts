// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as Sentry from '@sentry/node';
import { TriangleClient } from './lib/TriangleClient';

const Client: TriangleClient = new TriangleClient();

if (process.env.SENTRY_URL && process.env.PRODUCTION) {
    Sentry.init({
        dsn: process.env.SENTRY_URL,
        release: 'Triangle@' + process.env.npm_package_version,
        environment: process.env.PRODUCTION ? 'production' : 'development',
        integrations: [
            new Sentry.Integrations.Modules(),
            new Sentry.Integrations.FunctionToString(),
            new Sentry.Integrations.LinkedErrors(),
            new Sentry.Integrations.Console(),
        ],
    });
}

Client.login(process.env.PRODUCTION ? process.env.DISCORD_PRODUCTION : process.env.DISCORD_DEV);
