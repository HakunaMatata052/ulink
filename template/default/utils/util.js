export const filterEmoji = (val) => {
    return val.replace(/<span.*?><\/span>/g, '')
}
export const formatTimer = (validTime) => {
    let result = validTime // 剩余时间（秒）
    const d = Math.floor(result / 3600 * 24) < 10 ? '0' + Math.floor(result / 3600 * 24) : Math.floor(result / 3600 * 24)
    const h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    const m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    return {
        d,
        h,
        m,
        s
    }
}