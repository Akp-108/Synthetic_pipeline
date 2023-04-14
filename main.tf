module "synthetic_monitor" {
  source           = "./modules/sythetic_monitor"
  synthetic        = var.synthetic_from_root
  period           = var.period
  locations_public = var.locations_public
  USER_ACCOUNT_ID = var.USER_ACCOUNT_ID
  USER_API_KEY = var.USER_API_KEY


}