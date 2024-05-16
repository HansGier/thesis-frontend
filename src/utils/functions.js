export function getInitials(username) {
    const names = username.split(" ");
    return names.map(name => name[0].toUpperCase()).join("");
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sortMessagesByDate(messages) {
    return messages.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });
}