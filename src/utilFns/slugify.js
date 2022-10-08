export const slugify = (str) => {
    if (str.indexOf(" ") === -1) {
        return str.toLowerCase();
    }
    return str.replaceAll(" ", "-").toLowerCase();
};
