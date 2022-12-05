type Unarray<T> = T extends readonly (infer P)[] ? T[number] : T;

type ArrayType<T> = T extends (infer Item)[] ? Item : number;

type MapEntity<T> = T extends Map<infer K, infer V> ? [K, V] : never;
