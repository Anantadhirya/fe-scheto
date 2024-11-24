// AUTH API
export const apiLogin = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/auth/login"
export const apiLogout = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/auth/logout"
export const apiVerify = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/auth/verify"
export const apiRegister = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/auth/register"

// PERSONAL SCHEDULE API
export const apiGetSchedule = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/schedule/list"
export const apiPostSchedule = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/schedule/individual"
export const apiScheduleRoute = `${process.env.NEXT_PUBLIC_DOMAIN_BE}` + "/schedule/individual/"
    