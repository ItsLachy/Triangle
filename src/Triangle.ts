import * as Sentry from '@sentry/node';
import { TriangleClient } from './lib/TriangleClient';
import Config from './config.json';

const Client: TriangleClient = new TriangleClient();

if (Config.sentryUrl) {
    Sentry.init({
        dsn: Config.sentryUrl,
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

Client.login(process.env.PRODUCTION ? Config.discordTokens.production : Config.discordTokens.development);
