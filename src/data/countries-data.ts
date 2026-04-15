const COUNTRIES = [
    { iso: "US", name: "United States", dialCode: "+1" },
    { iso: "CA", name: "Canada", dialCode: "+1" },
    { iso: "GB", name: "United Kingdom", dialCode: "+44" },
] as const;

export const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
    value: country.iso,
    label: `${country.name} (${country.dialCode})`,
}));