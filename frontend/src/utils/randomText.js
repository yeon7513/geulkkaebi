export const randomText = (text) => {
  const randText = text[Math.floor(Math.random() * text.length)];
  return randText;
};
