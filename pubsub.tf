resource "google_pubsub_topic" "notifica" {
  name = "cloud-builds"
  
}

resource "google_pubsub_subscription" "notifica" {
  name  = "notificador-subscription"
  topic = google_pubsub_topic.notifica.name

  ack_deadline_seconds = 20

  labels = {
    foo = "bar"
  }

  push_config {
    push_endpoint = google_cloudfunctions_function.function.https_trigger_url

    attributes = {
      x-goog-version = "v1"
    }
  }
}