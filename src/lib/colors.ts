// src/lib/colors.ts

/**
 * Converts a HEX color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes hex is valid and returns h, s, and l in the set [0, 360], [0, 100], [0, 100].
 *
 * @param   String  hex       The hex color value
 * @return  Array           The HSL representation
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    console.warn('Invalid HEX color provided to hexToHsl:', hex);
    return null;
  }

  let r_val = parseInt(hex.substring(1, 3), 16);
  let g_val = parseInt(hex.substring(3, 5), 16);
  let b_val = parseInt(hex.substring(5, 7), 16);

  r_val /= 255;
  g_val /= 255;
  b_val /= 255;

  const max = Math.max(r_val, g_val, b_val);
  const min = Math.min(r_val, g_val, b_val);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r_val: h = (g_val - b_val) / d + (g_val < b_val ? 6 : 0); break;
      case g_val: h = (b_val - r_val) / d + 2; break;
      case b_val: h = (r_val - g_val) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
