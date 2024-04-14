terraform {
  backend "s3" {
    bucket         = "dailypay-hackathon-sandbox-account-tfstate"
    key            = "hackathon-2023-DailyPay.Augmented/sandbox.tfstate"
    dynamodb_table = "dailypay-hackathon-sandbox-account-tfstate-lock"
    region         = "us-east-1"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.54.0"
    }
  }
}

variable "service_version" {
  type        = string
  description = "Service Version"

  default = null
}

provider "aws" {
  default_tags {
    tags = {
      Project     = module.this.project
      Service     = module.this.service
      Environment = module.this.environment
      Repository  = "dailypay/hackathon-2023-DailyPay.Augmented"
    }
  }
}

module "this" {
  source = "github.com/dailypay/terraform-null-label?ref=0.3.4"

  project     = "hackathon"
  service     = "daily-ar"
  environment = "sandbox"

  label_order = ["service", "environment", "name", "attributes"]
}

module "app" {
  source = "github.com/dailypay/hackathon-2023-infrastructure//terraform/modules/monoapp"

  service_version = var.service_version

  context = module.this.context
}
