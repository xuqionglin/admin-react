export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear().toString().padStart(4, '0') + '-'
        + (date.getMonth() + 1).toString().padStart(2, '0') + '-'
        + date.getDate().toString().padStart(2, '0') + ' '
        + date.getHours().toString().padStart(2, '0') + ':'
        + date.getMinutes().toString().padStart(2, '0') + ':'
        + date.getSeconds().toString().padStart(2, '0')

}