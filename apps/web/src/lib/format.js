export function formatCurrencyUsd(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    }).format(value);
}
export function formatTimestamp(value) {
    if (!value) {
        return "Never";
    }
    return new Date(value).toLocaleString();
}
