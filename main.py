import os
import smtplib
import base64
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from flask import escape

from google.cloud import storage

def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"

    # The ID of your GCS object
    # source_blob_name = "storage-object-name"

    # The path to which the file should be downloaded
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(
        "Downloaded storage object {} from bucket {} to local file {}.".format(
            source_blob_name, bucket_name, destination_file_name
        )
    )

def send_notification(request):
    """Triggered from a message on a Cloud Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """

    # Tratando parâmetros vindos da requisição
    request_json = request.get_json(silent=True)
    data = request_json['message']
    mailMessageBody = base64.b64decode(data['data']).decode('utf-8')
    build_parameters = json.loads(mailMessageBody)
    print(build_parameters)

    # Pegando parâmetros da pipeline
    bucket_name = build_parameters['logsBucket'][5:]
    build_id = build_parameters['id']
    build_status = build_parameters['status']
    substitutions = build_parameters['substitutions']
    repo_name = substitutions['REPO_NAME']
    branch_name = substitutions['BRANCH_NAME']
    commit_short = substitutions['SHORT_SHA']

    # Baixando arquivos de log do GCS
    log_file = f'log-{build_id}.txt'
    destination_file_name = f'/tmp/{log_file}'

    download_blob(bucket_name, log_file, destination_file_name)

    # Texto do corpo do email
    mail_content = f'''
    A pipeline {build_id} foi concluída com status {build_status}.

    Status:      {build_status}
    Repositório: {repo_name}
    Branch:      {branch_name}
    Commit:      {commit_short}
    '''

    # Usuário, Email e senha utilizados para o envio
    sender_address = 'noreply@devops.pernambucanas.com.br'
    smtp_username = os.environ['SMTP-USERNAME']
    smtp_pass = os.environ['SMTP-PASSWORD']

    # Emails que irão receber o envio
    receiver_address = ['devsecops@pernambucanas.com.br','devsecops-pnb@2rpnet.com']

    #Configuração do MIME
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = ", ".join(receiver_address)
    message['Subject'] = f'{repo_name} | A pipeline para {branch_name} foi concluída com status {build_status}.'

    # Adicionando o corpo e o anexo ao email
    message.attach(MIMEText(mail_content, 'plain'))
    attach_file = open(destination_file_name, 'rb') # Abre arquivo no modo binário
    payload = MIMEBase('application', 'octate-stream')
    payload.set_payload((attach_file).read())
    encoders.encode_base64(payload) # Codifica o arquivo
    payload.add_header('Content-Disposition', 'attachment', filename=log_file) # Adiciona Header
    message.attach(payload)

    #Criando a sessão SMTP session para envio do mail
    session = smtplib.SMTP_SSL('email-smtp.us-east-1.amazonaws.com', 465)
    session.login(smtp_username, smtp_pass) # Login com email e senha
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()
    print('Email enviado.')