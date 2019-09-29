export const PAGE_PADDING = '4px';
export const CONTENT_MAX_WIDTH = '375px';
export const FRAME_VERTICAL_PADDING = '20px';
const FRAME_HORIZONTAL_PADDING = '32px';

const SCREEN_MIN_WIDTH = `calc(2 * (${CONTENT_MAX_WIDTH} + 2 * ${FRAME_HORIZONTAL_PADDING}))`;
const CONTENT_RIGHT = `(100vw - ${SCREEN_MIN_WIDTH}) / 2`;
export const FRAME_RIGHT_CALC = `calc(${CONTENT_RIGHT})`;
export const CONTENT_RIGHT_CALC = `calc(${CONTENT_RIGHT} + ${FRAME_HORIZONTAL_PADDING} + ${PAGE_PADDING})`;

export const isPokedexLayout = `@media only screen and (min-width: ${SCREEN_MIN_WIDTH})`;
export const isMobileLayout = `@media only screen and (max-width: calc(${SCREEN_MIN_WIDTH} - 1px))`;
