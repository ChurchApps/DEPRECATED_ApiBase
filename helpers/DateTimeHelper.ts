import dayjs from "dayjs"

export class DateTimeHelper {
    public static toMysqlDate(d: Date) {
        if (d === null || d === undefined) {
            return undefined;
        }
        return dayjs(d).format("YYYY-MM-DD HH:mm:ss")
    }

    public static subtractHoursFromNow(hour: number) {
        const now = new Date();
        return new Date(now.setHours(now.getHours() - hour));
    }
}