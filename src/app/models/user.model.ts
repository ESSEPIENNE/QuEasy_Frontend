export class User {
  constructor(
    public id: string,
    public email: string,
    public role: string,
    public store: number,
    private _token: string,
    private _refreshToken: string
  ) {}

  get token() {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }
}
