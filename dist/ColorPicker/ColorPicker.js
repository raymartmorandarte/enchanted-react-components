"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPickerTestIds = void 0;
/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
const react_1 = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const TextField_1 = __importDefault(require("../TextField"));
/**
 * Test-id constants for ColorPicker elements.
 */
var ColorPickerTestIds;
(function (ColorPickerTestIds) {
    ColorPickerTestIds["ROOT"] = "color-picker-root";
    ColorPickerTestIds["GRADIENT"] = "color-picker-gradient";
    ColorPickerTestIds["GRADIENT_THUMB"] = "color-picker-gradient-thumb";
    ColorPickerTestIds["HUE_SLIDER"] = "color-picker-hue-slider";
    ColorPickerTestIds["ALPHA_SLIDER"] = "color-picker-alpha-slider";
    ColorPickerTestIds["HEX_INPUT"] = "color-picker-hex-input";
    ColorPickerTestIds["PREVIEW_SWATCH"] = "color-picker-preview-swatch";
    ColorPickerTestIds["EYEDROPPER_BUTTON"] = "color-picker-eyedropper";
})(ColorPickerTestIds = exports.ColorPickerTestIds || (exports.ColorPickerTestIds = {}));
// ---------------------------------------------------------------------------
// Helpers — color conversion
// ---------------------------------------------------------------------------
/** Convert HSVA → RGBA (0-255). */
function hsvaToRgba(h, s, v, a) {
    const sv = s / 100;
    const vv = v / 100;
    const c = vv * sv;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = vv - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h < 60) {
        r = c;
        g = x;
    }
    else if (h < 120) {
        r = x;
        g = c;
    }
    else if (h < 180) {
        g = c;
        b = x;
    }
    else if (h < 240) {
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        b = c;
    }
    else {
        r = c;
        b = x;
    }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255), a];
}
/** Convert RGBA (0-255) → hex string with optional alpha (#RRGGBBAA). */
function rgbaToHex(r, g, b, a) {
    const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 255 ? toHex(a) : ''}`;
}
/** Convert hex (#RGB, #RRGGBB, #RRGGBBAA) → RGBA. */
function hexToRgba(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3)
        h = h.split('').map((c) => c + c).join('');
    if (h.length === 6)
        h += 'FF';
    const n = parseInt(h, 16);
    // eslint-disable-next-line no-bitwise
    return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff];
}
/** Convert RGB (0-255) → HSV. */
function rgbToHsv(r, g, b) {
    const rv = r / 255;
    const gv = g / 255;
    const bv = b / 255;
    const max = Math.max(rv, gv, bv);
    const min = Math.min(rv, gv, bv);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === rv)
            h = ((gv - bv) / d) % 6;
        else if (max === gv)
            h = (bv - rv) / d + 2;
        else
            h = (rv - gv) / d + 4;
    }
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    const s = max === 0 ? 0 : Math.round((d / max) * 100);
    const v = Math.round(max * 100);
    return [h, s, v];
}
/** Validate a hex color string (#RGB, #RRGGBB, #RRGGBBAA). */
function isValidHex(hex) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex);
}
// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------
const Root = (0, styles_1.styled)(Box_1.default)(() => ({
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '12px',
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '6px',
    userSelect: 'none',
    width: '260px',
    boxSizing: 'border-box',
}));
const GradientCanvas = (0, styles_1.styled)('div')(() => ({
    position: 'relative',
    width: '100%',
    height: '176px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'crosshair',
    flexShrink: 0,
}));
const GradientLayer = (0, styles_1.styled)('div')(({ background }) => ({
    position: 'absolute',
    inset: 0,
    background,
}));
const GradientThumb = (0, styles_1.styled)('div')(({ left, top }) => ({
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    left: `${left}%`,
    top: `${top}%`,
}));
const SliderRow = (0, styles_1.styled)(Box_1.default)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}));
const PreviewSwatch = (0, styles_1.styled)(Box_1.default)(({ color }) => ({
    width: '36px',
    height: '36px',
    borderRadius: '4px',
    flexShrink: 0,
    background: `
    linear-gradient(${color}, ${color}),
    repeating-conic-gradient(#CCCCCC 0% 25%, transparent 0% 50%) 0 0 / 8px 8px
  `,
    border: '1px solid rgba(0,0,0,0.12)',
}));
const HueTrack = (0, styles_1.styled)('div')(() => ({
    position: 'relative',
    flex: 1,
    height: '12px',
    borderRadius: '6px',
    background: 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)',
    cursor: 'pointer',
}));
const AlphaTrack = (0, styles_1.styled)('div')(({ hueColor }) => ({
    position: 'relative',
    flex: 1,
    height: '12px',
    borderRadius: '6px',
    background: `
    linear-gradient(to right, transparent, ${hueColor}),
    repeating-conic-gradient(#CCCCCC 0% 25%, transparent 0% 50%) 0 0 / 8px 8px
  `,
    cursor: 'pointer',
}));
const SliderThumb = (0, styles_1.styled)('div')(({ position }) => ({
    position: 'absolute',
    top: '50%',
    left: `${position * 100}%`,
    transform: 'translate(-50%, -50%)',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: '#FFFFFF',
    border: '2px solid rgba(0,0,0,0.3)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    pointerEvents: 'none',
}));
const Slider = (_a) => {
    var { value, onChange, trackComponent, disabled } = _a, rest = __rest(_a, ["value", "onChange", "trackComponent", "disabled"]);
    const trackRef = (0, react_1.useRef)(null);
    const getValueFromEvent = (0, react_1.useCallback)((e) => {
        if (!trackRef.current)
            return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        onChange(x / rect.width);
    }, [onChange]);
    const handleMouseDown = (0, react_1.useCallback)((e) => {
        if (disabled)
            return;
        e.preventDefault();
        getValueFromEvent(e);
        const onMouseMove = (ev) => getValueFromEvent(ev);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [disabled, getValueFromEvent]);
    return react_1.default.cloneElement(trackComponent, Object.assign(Object.assign({ ref: trackRef, onMouseDown: handleMouseDown }, rest), { children: react_1.default.createElement(SliderThumb, { position: value }) }));
};
// ---------------------------------------------------------------------------
// Main ColorPicker component
// ---------------------------------------------------------------------------
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
const ColorPicker = ({ value = '#000000', onChange, disabled = false, showAlpha = true, showHexInput = true, }) => {
    // Parse the incoming hex value into HSVA state
    const parseHsva = (hex) => {
        if (!isValidHex(hex))
            return {
                h: 0, s: 0, v: 0, a: 255,
            };
        const [r, g, b, a] = hexToRgba(hex);
        const [h, s, v] = rgbToHsv(r, g, b);
        return {
            h, s, v, a,
        };
    };
    const [hsva, setHsva] = (0, react_1.useState)(() => parseHsva(value));
    const [hexInput, setHexInput] = (0, react_1.useState)(value.toUpperCase());
    const gradientRef = (0, react_1.useRef)(null);
    const dragging = (0, react_1.useRef)(false);
    // Sync when controlled value changes externally
    (0, react_1.useEffect)(() => {
        if (!isValidHex(value))
            return;
        const parsed = parseHsva(value);
        setHsva(parsed);
        const [r, g, b, a] = hsvaToRgba(parsed.h, parsed.s, parsed.v, parsed.a);
        setHexInput(rgbaToHex(r, g, b, a));
        // Only run when the `value` prop changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    // Fire onChange whenever hsva changes
    const emitChange = (0, react_1.useCallback)((next) => {
        const [r, g, b, a] = hsvaToRgba(next.h, next.s, next.v, next.a);
        const hex = rgbaToHex(r, g, b, a);
        setHexInput(hex);
        onChange === null || onChange === void 0 ? void 0 : onChange(hex);
    }, [onChange]);
    // ── Gradient canvas interaction ─────────────────────────────────────────
    const updateSVFromEvent = (0, react_1.useCallback)((e) => {
        if (!gradientRef.current)
            return;
        const rect = gradientRef.current.getBoundingClientRect();
        const s = Math.round(Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1)) * 100);
        const v = Math.round(Math.max(0, Math.min(1 - (e.clientY - rect.top) / rect.height, 1)) * 100);
        setHsva((prev) => {
            const next = Object.assign(Object.assign({}, prev), { s, v });
            emitChange(next);
            return next;
        });
    }, [emitChange]);
    const handleGradientMouseDown = (0, react_1.useCallback)((e) => {
        if (disabled)
            return;
        e.preventDefault();
        dragging.current = true;
        updateSVFromEvent(e);
        const onMouseMove = (ev) => { if (dragging.current)
            updateSVFromEvent(ev); };
        const onMouseUp = () => {
            dragging.current = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [disabled, updateSVFromEvent]);
    // ── Slider handlers ─────────────────────────────────────────────────────
    const handleHueChange = (0, react_1.useCallback)((ratio) => {
        setHsva((prev) => {
            const next = Object.assign(Object.assign({}, prev), { h: Math.round(ratio * 360) });
            emitChange(next);
            return next;
        });
    }, [emitChange]);
    const handleAlphaChange = (0, react_1.useCallback)((ratio) => {
        setHsva((prev) => {
            const next = Object.assign(Object.assign({}, prev), { a: Math.round(ratio * 255) });
            emitChange(next);
            return next;
        });
    }, [emitChange]);
    // ── Hex input handler ────────────────────────────────────────────────────
    const handleHexInputChange = (0, react_1.useCallback)((e) => {
        const raw = e.target.value;
        setHexInput(raw);
        if (isValidHex(raw)) {
            const parsed = parseHsva(raw);
            setHsva(parsed);
            onChange === null || onChange === void 0 ? void 0 : onChange(raw.toUpperCase());
        }
    }, [onChange]);
    // ── Eyedropper ──────────────────────────────────────────────────────────
    const handleEyedropper = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (disabled)
            return;
        // EyeDropper API (Chrome 95+)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const EyeDropper = window.EyeDropper;
        if (!EyeDropper)
            return;
        try {
            const eyeDropper = new EyeDropper();
            const result = yield eyeDropper.open();
            const hex = result.sRGBHex.toUpperCase();
            const parsed = parseHsva(hex);
            setHsva(parsed);
            setHexInput(hex);
            onChange === null || onChange === void 0 ? void 0 : onChange(hex);
        }
        catch (_a) {
            // User cancelled the eyedropper — no action needed
        }
    }), [disabled, onChange]);
    // ── Derived values ──────────────────────────────────────────────────────
    const [r, g, b, a] = hsvaToRgba(hsva.h, hsva.s, hsva.v, hsva.a);
    const currentHex = rgbaToHex(r, g, b, a);
    const currentRgba = `rgba(${r}, ${g}, ${b}, ${hsva.a / 255})`;
    // Pure hue color (full saturation/value) for the hue-based alpha gradient
    const [hr, hg, hb] = hsvaToRgba(hsva.h, 100, 100, 255);
    const hueColor = `rgb(${hr}, ${hg}, ${hb})`;
    // Thumb position on the gradient canvas
    const thumbLeft = hsva.s; // 0–100 (percentage)
    const thumbTop = 100 - hsva.v; // 0–100 (percentage)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eyeDropperSupported = typeof window.EyeDropper !== 'undefined';
    return (react_1.default.createElement(Root, { "data-testid": ColorPickerTestIds.ROOT },
        react_1.default.createElement(GradientCanvas, { ref: gradientRef, onMouseDown: handleGradientMouseDown, "data-testid": ColorPickerTestIds.GRADIENT, style: { opacity: disabled ? 0.5 : 1, cursor: disabled ? 'default' : 'crosshair' } },
            react_1.default.createElement(GradientLayer, { background: hueColor }),
            react_1.default.createElement(GradientLayer, { background: "linear-gradient(to right, #FFFFFF, transparent)" }),
            react_1.default.createElement(GradientLayer, { background: "linear-gradient(to bottom, transparent, #000000)" }),
            react_1.default.createElement(GradientThumb, { left: thumbLeft, top: thumbTop, "data-testid": ColorPickerTestIds.GRADIENT_THUMB, style: { background: currentRgba } })),
        react_1.default.createElement(SliderRow, null,
            react_1.default.createElement(PreviewSwatch, { color: currentRgba, "data-testid": ColorPickerTestIds.PREVIEW_SWATCH }),
            react_1.default.createElement(Box_1.default, { sx: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 } },
                react_1.default.createElement(Slider, { value: hsva.h / 360, onChange: handleHueChange, disabled: disabled, "data-testid": ColorPickerTestIds.HUE_SLIDER, trackComponent: react_1.default.createElement(HueTrack, null) }),
                showAlpha && (react_1.default.createElement(Slider, { value: hsva.a / 255, onChange: handleAlphaChange, disabled: disabled, "data-testid": ColorPickerTestIds.ALPHA_SLIDER, trackComponent: react_1.default.createElement(AlphaTrack, { hueColor: hueColor }) })))),
        showHexInput && (react_1.default.createElement(Box_1.default, { sx: { display: 'flex', alignItems: 'flex-end', gap: '8px' } },
            react_1.default.createElement(TextField_1.default, { value: hexInput, onChange: handleHexInputChange, disabled: disabled, label: "HEX", inputProps: { 'data-testid': ColorPickerTestIds.HEX_INPUT }, sx: { flex: 1 } }),
            eyeDropperSupported && (react_1.default.createElement(Box_1.default, { component: "button", onClick: handleEyedropper, "data-testid": ColorPickerTestIds.EYEDROPPER_BUTTON, disabled: disabled, "aria-label": "Pick color from screen", sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(0,0,0,0.23)',
                    borderRadius: '4px',
                    background: 'transparent',
                    cursor: disabled ? 'default' : 'pointer',
                    flexShrink: 0,
                    '&:hover:not(:disabled)': { background: 'rgba(0,0,0,0.04)' },
                } },
                react_1.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M13.77 2.23a2.57 2.57 0 0 0-3.63 0L2.5 9.87l-.5 3.5a.5.5 0 0 0 .56.56l3.5-.5 7.71-7.64a2.57 2.57 0 0 0 0-3.56zM5.56 12.43l-2.1.3.3-2.1 6.3-6.24 1.8 1.8-6.3 6.24zm7.5-7.44-.5.5-1.8-1.8.5-.5a1.57 1.57 0 0 1 2.22 0 1.57 1.57 0 0 1-.42 1.8z" })))))),
        react_1.default.createElement(Box_1.default, { component: "output", "aria-live": "polite", "aria-atomic": "true", sx: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' } }, currentHex)));
};
ColorPicker.defaultProps = {
    value: '#000000',
    disabled: false,
    showAlpha: true,
    showHexInput: true,
};
exports.default = ColorPicker;
