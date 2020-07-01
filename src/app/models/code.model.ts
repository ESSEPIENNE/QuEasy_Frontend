export class Code {
  constructor(
    public _id: string,
    public store: string,
    public code: string,
    public status: string[],
    public code_type: string[],
    public created_at: Date,
    public updated_at: Date
  ) {}
}
