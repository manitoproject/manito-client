export const titleMaxLength = 12;
export const nicknameMaxLength = 20;
export const maxMessageLength = 56;

const nicknameRegex = new RegExp(
  `^(?=.*[a-z가-힣])[a-z가-힣]{1,${nicknameMaxLength}}$`,
);
const titleRegex = new RegExp(`^.{1,${titleMaxLength - 1}}[^\\s]$`);

const regex = {
  nickname: nicknameRegex,
  title: titleRegex,
};

export type RegexType = keyof typeof regex;
export default regex;
