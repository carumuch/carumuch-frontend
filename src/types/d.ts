export interface LoginCredentials {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
}

// 회원 가입 데이터
export interface SignupData {
  loginId: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
}

// 공통 API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  code: string;
  response: T;
}

// 로그인 상태 관리 타입
export interface LoginState {
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
}
