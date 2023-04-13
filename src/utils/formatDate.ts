import moment from "moment"

export const formatDate = (date: Date, format = 'YYYY-MM-DD HH:mm'): string => {
    return moment(date).fromNow()
};

