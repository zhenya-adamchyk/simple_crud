export const getId = (req: any): string => {
    const urlArr: string[] = req.url.split('/')
    return urlArr[3]
}