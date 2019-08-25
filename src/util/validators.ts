const getError = (error: (() => string) | string) => typeof (error) === "function" ? error() : error;
const compose = (validator: (value: string, error: string) => boolean | string) =>
    (error: string | (() => string)) =>
        (value: string) => validator(value, getError(error));

const required = (value: string, error: string): boolean | string => {
    return value != null && value !== '' || error;
}

const email = (value: string, error: string): boolean | string => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || error;
}

export const requiredRule = compose(required);
export const emailRule = compose(email);