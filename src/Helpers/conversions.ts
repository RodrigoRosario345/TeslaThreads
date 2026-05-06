export function firstLetterUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(price: number) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}