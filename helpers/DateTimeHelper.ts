export class DateTimeHelper {
    public static toMysqlDate(d: Date) {
        if (d === null || d === undefined) {
            return undefined;
        }
        const date = new Date(d);
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    public static subtractHoursFromNow(hour: number) {
        const now = new Date();
        return new Date(now.setHours(now.getHours() - hour));
    }
}