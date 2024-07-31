export const fakeNetwork = (sec?: number) => {
  return new Promise((resolve) =>
    setTimeout(resolve, sec ?? Math.random() * 800),
  );
};
