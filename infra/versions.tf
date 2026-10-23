terraform {
  required_version = ">= 1.13.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.70"
    }
  }
}

provider "aws" {
  # Route53 is global; the region only selects the API endpoint.
  region = "us-east-1"
}
