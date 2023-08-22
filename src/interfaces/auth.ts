export interface IUser {
  iss: string
  iat: number
  exp: number
  nbf: number
  jti: string
  sub: string
  prv: string
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string | null
  job_title: string
  for_logistics_partner: boolean
  is_logistics_partner_primary_admin: boolean
  last_logged_in: null
}

export interface IProfile {
  token: string
  refreshToken: string
  user: IUser
}

export interface IAuthStore {
  profile: IProfile | null
}
