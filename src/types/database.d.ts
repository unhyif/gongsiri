export interface ListResponse<T, D> extends T {
  Items: D;
}

export interface ItemResponse<T, D> extends T {
  Item: D;
}
