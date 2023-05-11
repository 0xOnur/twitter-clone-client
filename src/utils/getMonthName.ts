export function getMonthNameFromNumber(monthNumber: number) {
    var date = new Date(2023, monthNumber);
    return date.toLocaleString('default', { month: 'long' });
}