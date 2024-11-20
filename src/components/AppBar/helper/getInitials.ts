export function getInitials(fullName?: string): string {
    const parts = fullName?.split(" ") || "";
    if (parts.length < 1) {
        return "";
    }

    // First letter of first name
    const firstInitial = parts[0].charAt(0).toUpperCase();
    // First letter of last name
    const lastInitial = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";
    // combine
    return `${firstInitial}${lastInitial}`;
}
