export class Store {
  constructor(
    public _id: string,
    public name: string,
    public logo_path: string,
    public max_queue: number,
    public max_in_store: number
  ) {}
}
