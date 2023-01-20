declare namespace domain {
  type Error =
    | undefined
    | {
        code: number;
        message: string;
      };
}
