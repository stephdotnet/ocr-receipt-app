export const conditionnalSlice = <T>(array: T[], count: number | null) => {
  if (count) {
    return array.slice(0, count);
  }

  return array;
};
