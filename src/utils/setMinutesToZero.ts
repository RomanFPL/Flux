export function setMinutesToZero(utcString: string): string {
    const date = new Date(utcString);
    date.setMinutes(0, 0, 0);
    return date.toUTCString();
}
