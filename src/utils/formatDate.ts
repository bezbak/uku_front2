import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";

export const parseDate = (str: string, format: string, locale: any) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
};
export const formatDate = (date: Date, format: string, locale: any) => {
    return dateFnsFormat(date, format, { locale });
};
