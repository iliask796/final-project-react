import dayjs from 'dayjs';

function convertDate(date) {
    const timezone = 'Europe/Athens'
    const myFormat = 'MM-DD-YYYY'
    return dayjs(date).format(myFormat, { timezone })
}

export default convertDate