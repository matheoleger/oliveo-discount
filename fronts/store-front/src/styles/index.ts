export const oliveoTheme = {
    colors: {
        brand: {
            primary: "#ED6A5A",
            secondary: "#50A2A7",
            light: "#FFF9F8",
            dark: "#333837"
        },
    },
    fonts: {
        heading: `'Poppins', 'Open Sans', 'sans-serif'`,
        body: `'Poppins', 'Open Sans', 'sans-serif'` 
    },
    styles: {
        global: () => ({
            body: {
              color: 'brand.dark',
              bg: 'brand.light',
            },
        }),
    }
}