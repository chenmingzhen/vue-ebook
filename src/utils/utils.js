export function px2rem(px) {
  const ratio = 375 / 10;
  return px / ratio;
}

export function realPx(px) {
  const maxWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
  return px * (maxWidth / 375);
}
