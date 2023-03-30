interface Password {
  text: string;
  strength: number;
}

interface Options {
  length: string;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  [key: string]: boolean | string;
}

export type { Password, Options };
