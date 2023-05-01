export interface ThemeState {
    // mode: string
    primary_background_color: string
    secondary_background_color: string
    third_background_color: string
    primary_font_color: string
}

export const lightTheme: ThemeState = {
    // mode: "light",
    primary_background_color: "#EC7E8F",
    secondary_background_color: "#E45C6C",
    third_background_color: "#F6C5CD",
    primary_font_color: "#FFFFFF",
}

export const darkTheme: ThemeState = {
    // mode: "dark",
    primary_background_color: "#012B7D",
    secondary_background_color: "#E45C6C",
    third_background_color: "#7B90B9",
    primary_font_color: "#FFFFFF", //FDF8BE
}