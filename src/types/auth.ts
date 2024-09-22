export interface LoginCredentials {
  loginId: string;
  password: string;
}

// export interface LoginResponse {
//   success: boolean;
//   status: number;
//   message: string;
//   code: string;
//   response: any;
// }

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
