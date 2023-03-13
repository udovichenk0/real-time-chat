export function dateConverter(date:Date){
    const hours = date.getHours() % 12
    const minutes = date.getMinutes()
    const AMPM = hours > 12? 'PM' : 'AM'

    return `${hours}:${minutes}${AMPM}`
}