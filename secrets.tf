resource "google_secret_manager_secret" "secret-username" {
  secret_id = var.smtp-name

  labels = {
    label = "username"
  }

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
      replicas {
        location = "us-east1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "secret-version-username" {
  secret = google_secret_manager_secret.secret-username.id

  secret_data = var.smtp-user
}

resource "google_secret_manager_secret" "secret-password" {
  secret_id = var.smtp-passname

  labels = {
    label = "password"
  }

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
      replicas {
        location = "us-east1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "secret-version-password" {
  secret = google_secret_manager_secret.secret-password.id

  secret_data = var.smtp-password
}

# [17:20, 06/12/2021] +55 11 96195-4031: email-smtp.us-east-1.amazonaws.com
# [17:20, 06/12/2021] +55 11 96195-4031: STARTTLS Port
# 25, 587 or 2587
# envia como noreply@devops.pernambucanas.com.br
# "ses-smtp-devops",AKIA2NIG5VS6PH5ZOLND,BPv/owELcCp+uMU2F9dlvMH7WnQFdB21Ks34zcBpL6u2
# IAM User Name,Smtp Username,Smtp Password
# "ses-smtp-devops",AKIA2NIG5VS6PH5ZOLND,BPv/owELcCp+uMU2F9dlvMH7WnQFdB21Ks34zcBpL6u2
# Lucas Silva14:51
# devsecops@pernambucanas.com.br
# devsecops@2rpnet.com