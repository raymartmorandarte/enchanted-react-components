import React from 'react';
/**
 * @typedef ColorPickerProps
 * @type {object}
 * @property {string} value - Controlled hex color value (e.g. "#FF0000" or "#FF0000BF").
 * @property {function} onChange - Callback fired when the selected color changes.
 * @property {boolean} disabled - Disables all interactions when true.
 * @property {boolean} showAlpha - Whether to show the alpha/opacity slider. Defaults to true.
 * @property {boolean} showHexInput - Whether to show the hex input field. Defaults to true.
 */
export interface ColorPickerProps {
    value?: string;
    onChange?: (hex: string) => void;
    disabled?: boolean;
    showAlpha?: boolean;
    showHexInput?: boolean;
}
/**
 * Test-id constants for ColorPicker elements.
 */
export declare enum ColorPickerTestIds {
    ROOT = "color-picker-root",
    GRADIENT = "color-picker-gradient",
    GRADIENT_THUMB = "color-picker-gradient-thumb",
    HUE_SLIDER = "color-picker-hue-slider",
    ALPHA_SLIDER = "color-picker-alpha-slider",
    HEX_INPUT = "color-picker-hex-input",
    PREVIEW_SWATCH = "color-picker-preview-swatch",
    EYEDROPPER_BUTTON = "color-picker-eyedropper"
}
/**
 * ColorPicker component — a gradient-based color selector with hue, alpha,
 * and hex input controls.
 *
 * @param {ColorPickerProps} props - ColorPicker props.
 * @returns {JSX.Element} The rendered ColorPicker.
 *
 * @example
 * <ColorPicker value="#FF5733" onChange={(hex) => console.log(hex)} />
 */
declare const ColorPicker: React.FC<ColorPickerProps>;
export default ColorPicker;
