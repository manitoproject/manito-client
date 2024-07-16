export const titleMaxLength = 20;
export const nicknameMaxLength = 20;

const nicknameRegex = new RegExp(
  `^(?=.*[a-z가-힣])[a-z가-힣]{1,${nicknameMaxLength}}$`,
);
const titleRegex = new RegExp(`^.{1,${titleMaxLength}}$`);

const regex = {
  nickname: nicknameRegex,
  title: titleRegex,
};

export type RegexType = keyof typeof regex;
export default regex;
