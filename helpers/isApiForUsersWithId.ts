export const isPathHaveId = (req: any): boolean => {
    const urlArr: string[] = req.url.split('/')
    const urlLength = urlArr.length
    return urlArr[1] === 'api' && urlArr[2] === 'users' && urlLength === 4
}