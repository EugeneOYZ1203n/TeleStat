export const getUserIdentifier = (userId, name) => {
    return userId.concat("/", name)
}