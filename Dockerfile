# Use a base image with Java and Gradle pre-installed
FROM gradle:8.3.0-jdk17 AS builder

# Set the working directory
WORKDIR /app

# Copy the build.gradle and settings.gradle files
# Copy the source code
COPY . /app/

# Build the application
RUN ./gradlew build --no-daemon

# Use a lightweight base image with Java
FROM openjdk:17-alpine

# Copy the built JAR file from the previous build stage
COPY --from=builder app/build/libs/*-all.jar /app/app.jar

ARG database=unset
ARG service_key=unset
ARG cors_origin=unset
ARG service_key_json=unset

ENV BIGQUERY_DATASET=$database
ENV GOOGLE_SERVICE_ACCOUNT_KEY=$service_key
ENV MICRONAUT_SERVER_CORS_CONFIGURATIONS_WEB_ALLOWED_ORIGINS=$cors_origin

COPY service_key.json /app/service_key.json
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/service_key.json

# Set the working directory
WORKDIR /app
COPY . /app/

# Expose the port your application will run on
EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"]
