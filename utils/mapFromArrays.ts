const mapFromArrays = <
  KT extends Unarray<K>,
  VT extends Unarray<V>,
  K extends ReadonlyArray<any>,
  V extends ReadonlyArray<any>,
>(
  keys: K,
  values: V,
) =>
  keys.reduce((m: Map<KT, VT>, k, i) => m.set(k, values[i]), new Map<KT, VT>());

export default mapFromArrays;
