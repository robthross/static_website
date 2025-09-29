variable "project_name" {
  description = "GCP project Name"
  default = "RTECH"
}
variable "project_id" {
  description = "GCP project Name"
  default = "rtech-318519"
}

variable "region" { # For Provider, you must specify the region
  description = "GCP region, e.g. us-east1"
  default = "us-east1"
}
## Módulos para provisionar repositório no Bitbucket
variable "bitusername" { # Bitbucket username
  description = "GCP region, e.g. us-east1"
  default = "robson.thiago@ipnet.cloud"
}

variable "bitpassword" { # Bitbucket password
  description = "GCP region, e.g. us-east1"
  default = "Rt@!@#$3tonto33"
}

### Pub/Sub ###
variable "id" { 
  description = "Notificador do Pub/Sub"
  default = "notifica"
}


### Cloud Build ###

variable "repo_name" { 
  description = "GCP region, e.g. us-east1"
  default = "static_website"
}
variable "service_account" { 
  description = "GCP region, e.g. us-east1"
  default = "notificadoremail"
}

### Secrets Manager ###

variable "smtp-user" { 
  description = "GCP region, e.g. us-east1"
  default = "AKIA2NIG5VS6PH5ZOLND"
}

variable "smtp-name" { 
  description = "GCP region, e.g. us-east1"
  default = "smtp-username"
}

variable "smtp-passname" { 
  description = "GCP region, e.g. us-east1"
  default = "smtp-password"
}

variable "smtp-password" { 
  description = "GCP region, e.g. us-east1"
  default = "BPv/owELcCp+uMU2F9dlvMH7WnQFdB21Ks34zcBpL6u2"
}