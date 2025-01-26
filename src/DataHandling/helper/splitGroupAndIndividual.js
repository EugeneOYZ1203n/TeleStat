function splitByPredicate(array, predicate) {
    return array.reduce(
      ([truthy, falsy], item) => {
        if (predicate(item)) {
          truthy.push(item);
        } else {
          falsy.push(item);
        }
        return [truthy, falsy];
      },
      [[], []] // Initial values: an empty truthy array and an empty falsy array
    );
}

// returns [personal_chat_data, group_chat_data]
export const splitGroupAndIndividual = (data) => {
    return splitByPredicate(data, el => el.type === "personal_chat")
}