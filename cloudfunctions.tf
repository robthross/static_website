resource "google_storage_bucket" "bucket" {
  name     = "notificador"
  location = "US"
}

resource "google_storage_bucket_object" "archive" {
  name   = "notica"
  bucket = google_storage_bucket.bucket.name
  source = "notifica.zip"
}

resource "google_cloudfunctions_function" "function" {

  name        = "notifica"
  description = "Meu Notificador"
  runtime     = "python37"

  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  timeout               = 60
  entry_point           = "send_notification"
  labels = {
    my-label = "send_notification"
  }

   environment_variables = {
     SMTP-USERNAME      = google_secret_manager_secret.secret-username.id
     SMTP-PASSWORD      = google_secret_manager_secret.secret-password.id
  }

}

# IAM entry for a single user to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "user:rtech.thiago@gmail.com"
}

