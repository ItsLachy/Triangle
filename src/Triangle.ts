import * as Sentry from '@sentry/node';

import Config from './config.json';

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
        tracesSampleRate: 1.0,
    });
}
