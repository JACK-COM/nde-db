export const falsy: any[] = [null, undefined];

export function withCreator<T>(d: T, userId: number, newItems = false) {
  /** A single `Item` (either `d` or an element in `d`) */
  type Item = (T extends Array<any> ? typeof d[0] : T) & {
    id?: number | undefined | null;
  };
  type AppendCreator = {
    (val: Item): Item & { addedBy: number; lastUpdated: Date };
  };
  const lastUpdated = new Date();
  const appendCreator: AppendCreator = (i) => ({
    ...i,
    id: i.id || undefined,
    addedBy: userId,
    lastUpdated,
    created: newItems ? lastUpdated : undefined
  });

  return Array.isArray(d) ? d.map(appendCreator) : appendCreator(d as Item);
}
