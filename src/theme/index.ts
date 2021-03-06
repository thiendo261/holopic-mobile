import 'styled-components';

export type HexColor = string;

interface IHoloAppTheme {
  colors: {
    black: HexColor;
    background: HexColor;
    white: HexColor;
    disabled: HexColor;
    darkGray: HexColor;
    lightGray: HexColor;
    lightBlue1: HexColor;
    lightBlue2: HexColor;
    bluePurple: HexColor;
    primary: HexColor;
    red: HexColor;
  };
}

const theme: IHoloAppTheme = {
  colors: {
    black: '#06060C',
    background: '#FDFDFD',
    white: '#FFFFFF',
    disabled: '#cac9c9',
    darkGray: '#666666',
    lightGray: '#e3e5ea',
    lightBlue1: '#7fbfff',
    lightBlue2: '#a1c4fd',
    bluePurple: '#6f86d6',
    primary: '#7aa0fa',
    red: '#ef807a99',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme extends IHoloAppTheme {}
}

export default theme;
