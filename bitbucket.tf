# # Configure the Bitbucket Provider
# provider "bitbucket" {
#   username = var.bitusername
#   password = var.bitpassword # you can also use app passwords
# }

# resource "bitbucket_repository" "illusions" {
#   owner      = "robson_thiago"
#   name       = "teste-terraform"
#   scm        = "git"
#   is_private = true
# }

# resource "bitbucket_project" "project" {
#   owner      = "theleagueofmagicians" # must be a team
#   name       = "illusions-project"
#   key        = "ILLUSIONSPROJ"
#   is_private = true
# }
