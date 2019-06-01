export const SCREEN_MIN_WIDTH = '768px';
export const CONTENT_MAX_WIDTH = '325px';
export const FRAME_VERTICAL_PADDING = '20px';
const FRAME_HORIZONTAL_PADDING = '32px';
const CONTENT_RIGHT = `(100vw - ${SCREEN_MIN_WIDTH}) / 2`;
export const FRAME_RIGHT_CALC = `calc(${CONTENT_RIGHT})`;
export const CONTENT_RIGHT_CALC = `calc(${CONTENT_RIGHT} + ${FRAME_HORIZONTAL_PADDING})`;
