# tab-executiveview-query

[![Quality Gate Status](https://sonar.sambadigital.dev/api/project_badges/measure?project=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md&metric=alert_status&token=sqb_e59c49ad3c25245af2062163d669c14e64fbdb09)](https://sonar.sambadigital.dev/dashboard?id=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md)
[![Coverage](https://sonar.sambadigital.dev/api/project_badges/measure?project=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md&metric=coverage&token=sqb_e59c49ad3c25245af2062163d669c14e64fbdb09)](https://sonar.sambadigital.dev/dashboard?id=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md)
[![Reliability Rating](https://sonar.sambadigital.dev/api/project_badges/measure?project=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md&metric=reliability_rating&token=sqb_e59c49ad3c25245af2062163d669c14e64fbdb09)](https://sonar.sambadigital.dev/dashboard?id=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md)
[![Security Rating](https://sonar.sambadigital.dev/api/project_badges/measure?project=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md&metric=security_rating&token=sqb_e59c49ad3c25245af2062163d669c14e64fbdb09)](https://sonar.sambadigital.dev/dashboard?id=sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md)

Comando para buildar dentro do Dockerfile
RUN chmod +x gradlew && \
    ./gradlew clean && \
    ./gradlew build --no-daemon

para executar crie uma imagem com ```gradle dockerBuild```

To run this application build a docker image with  ```gradle dockerBuild```

followed by ```docker run -p 8080:8080 tab-executiveview-query```

the env GOOGLE_SERVICE_ACCOUNT_KEY should be defined as a base64 content
```base64 -w 0 /path-to-file.json```
