import * as Sentry from '@sentry/nextjs'

export const captureSuccess = (route: any, message: any) => {
    Sentry.captureMessage(
        `ADMIN SUCCESS! ROUTE/PAGE: ${route}, CUSTOM MSG: ${message}`
    )
};

export const captureError = (route: any, message: any) => {
    const r = JSON.stringify(route);

    Sentry.captureMessage(
        `ADMIN ERROR! ROUTE/PAGE: ${r}, ERROR MSG: ${message}`
    );

    Sentry.captureException(route, message);
}