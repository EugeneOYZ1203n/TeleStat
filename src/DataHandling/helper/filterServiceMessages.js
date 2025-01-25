export const filterServiceMessages = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].messages = data[i].messages.filter((el) => el.type === "message")
    }
    return data
}