export interface LogInRequest {
  username: string
  password: string
}

export interface LogInResponse {
  refresh: string
  access: string
}
