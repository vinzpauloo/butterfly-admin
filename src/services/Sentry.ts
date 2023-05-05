import * as Sentry from '@sentry/nextjs'

export const captureSuccess = (route: any, message: any) => {
    Sentry.captureMessage(
        `ADMIN SUCCESS! ROUTE/PAGE: ${route}, CUSTOM MSG: ${message}`
    )
};

export const captureError = (error: any, route: any, message: any) => {
    const e = JSON.stringify(error);

    Sentry.captureMessage(
        `ADMIN ROUTE/PAGE: ${route}, CUSTOM ERROR MSG: ${message}, ERROR MSG: ${e}`
    );

    Sentry.captureException(error, route);
}