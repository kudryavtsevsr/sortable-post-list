export default function swapElements(array: unknown[], index1: number, index2: number): void {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}
