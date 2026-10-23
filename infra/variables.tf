variable "zone_name" {
  description = "Existing Route53 public hosted zone."
  type        = string
  default     = "jagiello.org"
}

variable "subdomain" {
  description = "Label within the zone that serves the site."
  type        = string
  default     = "lukasz"
}

variable "vercel_cname_target" {
  description = "CNAME target shown by Vercel under Project > Settings > Domains."
  type        = string
}

variable "vercel_verification_txt" {
  description = "Value for the _vercel TXT record, only needed if Vercel asks to verify domain ownership."
  type        = string
  default     = ""
}
