export const combineDictionary = (a:any, b:any) => {
    let result : any = {}
    for (const key in a) {
        result[key] = (result[key] || 0) + a[key];
    }
    for (const key in b) {
        result[key] = (result[key] || 0) + b[key];
    }
    return result;
}