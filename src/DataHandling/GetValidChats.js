export const GetValidChats = (data) => {
    return data.filter(el=>{
        if (el.name === "Telegram" || el.name === "") {
            return false;
        }
        if (el.messages.length < 200) {
            return false;
        }
        return true
    }).map(el => {
        return el.name
    })
}