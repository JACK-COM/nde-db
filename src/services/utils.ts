export function withCreator<T>(d: T, userId: number, newItems = false) {
  type Item = T extends Array<any> ? typeof d[0] : T;
  type AppendCreator = {
    (val: Item): Item & { addedBy: number; lastUpdated: Date };
  };
  const lastUpdated = new Date();
  const appendCreator: AppendCreator = (i) => ({
    ...i,
    addedBy: userId,
    lastUpdated,
    created: newItems ? lastUpdated : undefined
  });

  return Array.isArray(d) ? d.map(appendCreator) : appendCreator(d as Item);
}
