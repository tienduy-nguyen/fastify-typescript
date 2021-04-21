export interface HttpContext {
  req: Request;
  res: Response;
}

export interface PayloadUserForJwtToken {
  user: UserFromRequest;
}

export interface DataStoredFromToken {
  user: UserFromRequest;
}

export interface UserFromRequest {
  id?: string;
  email?: string;
  name?: string;
}
export interface SessionAuthToken {
  authToken?: IAuthToken;
}
export interface IAuthToken {
  accessToken?: string;
  refreshToken?: string;
}
