function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getWeekDate(date) {
    return new Date(date).toLocaleDateString([], {weekday:"long" ,day: "numeric", month: "long"})
}

function getFullDate(date) {
    return new Date(date).toLocaleDateString([], {day: "numeric", month: "long", year: "numeric"});
}

export {
    getTime,
    getWeekDate,
    getFullDate
}