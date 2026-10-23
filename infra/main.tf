# The zone is managed outside this config (it also carries the apex MX/SPF
# records for mail), so it is read, never created or modified.
data "aws_route53_zone" "this" {
  name         = var.zone_name
  private_zone = false
}

resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = "${var.subdomain}.${var.zone_name}"
  type    = "CNAME"
  ttl     = 300
  records = [var.vercel_cname_target]

  # Replaces the pre-existing CNAME (lukasz -> jagiello.org) on first apply.
  allow_overwrite = true
}

resource "aws_route53_record" "vercel_verification" {
  count = var.vercel_verification_txt == "" ? 0 : 1

  zone_id = data.aws_route53_zone.this.zone_id
  name    = "_vercel.${var.zone_name}"
  type    = "TXT"
  ttl     = 300
  records = [var.vercel_verification_txt]
}

output "site_fqdn" {
  value = aws_route53_record.site.fqdn
}
