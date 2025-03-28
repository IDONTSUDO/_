export const toBeginDate = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    date.setSeconds(0);
    return date
}

export const toEndDate = (date: Date) => {

    date.setHours(23);
    date.setMinutes(59);
    date.setMilliseconds(59);
    date.setSeconds(59);

    return date
}