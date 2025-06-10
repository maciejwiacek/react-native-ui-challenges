import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_WIDTH = 375;  // Reference width (e.g., iPhone 11)
const BASE_HEIGHT = 812; // Reference height (e.g., iPhone 11)

// Horizontal scale (width based)
export function horizontalScale(size: number): number {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
}

// Vertical scale (height based)
export function verticalScale(size: number): number {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
}

// Moderate scale - blend between horizontal and vertical scaling
export function scale(size: number, factor = 0.5): number {
  const hScale = horizontalScale(size);
  const vScale = verticalScale(size);
  return hScale + (vScale - hScale) * factor;
}

// Font size scaling using moderate scale and pixel rounding
export function scaleFontSize(size: number): number {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
