import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#9c1e5d',
    title: '#1D3557',
    white: '#FFFFFF',
    lightGrey: '#D3D6D6',
    grey: '#C1C0C9',
    blue: '#087BB6',
    yellow: '#F4D03F',
    secondary: '#020024',
    lightBg:'#F1FAEE',
    medBg:'#A8DADC',
    red: '#E63946',
};

export const SIZES = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,

    width,
    height,
}