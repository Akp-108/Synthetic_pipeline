terraform {
  required_providers {
    newrelic = {
      source  = "newrelic/newrelic"
      version = "3.2.1"
    }
  }
}




provider "newrelic" {
  account_id = var.USER_ACCOUNT_ID # Your New Relic accNRAK-KAA0NS59T13Eount ID
  api_key    = var.USER_API_KEY    # Your New Relic user key
  region     = "US"                # US or EU (defaults to US)
}
