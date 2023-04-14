variable "USER_ACCOUNT_ID" {
  type = number
}

variable "USER_API_KEY" {
  type = string
}

variable "synthetic_from_root" {
  type = map(any)
}

variable "period" {
  type = string
}

variable "locations_public" {
  type = list(any)
}
