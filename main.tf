terraform {
  required_version = ">= 0.12.7"
  backend "gcs" {
    bucket = "rtech-318519_cloudbuild"
    prefix = "/source"
  }
}

