export const contactNameHandler = (name) => {
    if (typeof name !== "string") return "";

    const tempContactNameArray = name
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .split(/[^a-z]+/)

    const resultArr = [];

    for (const item of tempContactNameArray) {
        if (!item) continue;

        resultArr.push(item[0].toUpperCase() + item.slice(1));
    }

    return resultArr.join(" ");
}
