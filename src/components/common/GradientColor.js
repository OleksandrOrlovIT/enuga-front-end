export const getGradientColor = (percentage) => {
    const startColor = { r: 255, g: 0, b: 0 };
    const endColor = { r: 0, g: 255, b: 0 };

    const r = startColor.r + percentage * (endColor.r - startColor.r) / 100;
    const g = startColor.g + percentage * (endColor.g - startColor.g) / 100;
    const b = startColor.b + percentage * (endColor.b - startColor.b) / 100;

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};