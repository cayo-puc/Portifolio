export const isMobileLandscape = () => window.matchMedia?.("(hover: none) and (pointer: coarse) and (orientation: landscape) and (max-height: 520px)").matches ?? false;

export const sceneDepth = (depth) => isMobileLandscape() ? depth * 0.38 : depth;
