resource "newrelic_synthetics_script_monitor" "monitor" {
  for_each = var.synthetic

  name     = each.key
  type     = "SCRIPT_API"
  status = "ENABLED"

  locations_public = var.locations_public
  period           = var.period

  script = file("${path.module}/${each.value}")

  script_language      = "JAVASCRIPT"
  runtime_type         = "NODE_API"
  runtime_type_version = "16.10"

  tag {
    key    = "some_key"
    values = ["some_value"]
  }
}




