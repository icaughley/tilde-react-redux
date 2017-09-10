export function sortRows(r1, r2) {
    if (r1.date.isSame(r2.date)) {
        if (r1.id && r2.id) return r1.id - r2.id;
        if (r1.id) return -1;
        if (r2.id) return 1;
        return r1.key.localeCompare(r2.key);
    }
    return r1.date.isBefore(r2.date) ? -1 : 1;
}
