function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getDate(date) {
    return new Date(date).toLocaleDateString([], {weekday:"long" ,day: "numeric", month: "long"})
}

export {
    getTime,
    getDate
}