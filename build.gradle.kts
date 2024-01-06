plugins {
    id("org.jetbrains.kotlin.jvm") version "1.9.0"
    id("org.jetbrains.kotlin.kapt") version "1.9.0"
    id("org.jetbrains.kotlin.plugin.allopen") version "1.9.0"
    id("com.github.johnrengelman.shadow") version "8.1.1"
    id("io.micronaut.application") version "3.7.10"
    id("io.micronaut.library") version "3.7.10"
    id("org.jlleitschuh.gradle.ktlint") version "11.5.0"
    id("org.sonarqube") version "4.3.0.3225"
    id("jacoco")
}

version = "0.0.1"
group = "br.com.houer.tab"

application {
    mainClass.set("br.com.houer.tab.executiveview.application.Application")
}

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    kapt("io.micronaut:micronaut-http-validation")
    implementation("com.google.cloud:google-cloud-storage:2.23.0")
    implementation("io.micronaut:micronaut-http-client")
    implementation("io.reactivex.rxjava3:rxjava:3.1.6")
    implementation("io.micronaut:micronaut-jackson-databind")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")
    implementation("io.micronaut.kotlin:micronaut-kotlin-runtime")
    implementation("jakarta.annotation:jakarta.annotation-api")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.0")
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.9.0")
    implementation("com.google.cloud:google-cloud-bigquery:2.29.0")
    implementation("com.google.auth:google-auth-library-oauth2-http:1.19.0")

    runtimeOnly("ch.qos.logback:logback-classic")
    compileOnly("org.graalvm.nativeimage:svm")

    implementation("io.micronaut:micronaut-validation")

    runtimeOnly("com.fasterxml.jackson.module:jackson-module-kotlin")

    // Micronaut OpenAPI dependency
    kapt("io.micronaut.openapi:micronaut-openapi:4.9.2")

    implementation("io.swagger.core.v3:swagger-annotations")

    implementation("io.micronaut:micronaut-management")

    testImplementation("io.mockk:mockk:1.13.5")
}
tasks.jar {
    manifest {
        attributes["Main-Class"] = "br.com.houer.tab.executiveview.application.Application"
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion("17")
}

tasks {
    compileKotlin {
        kotlinOptions {
            jvmTarget = "17"
        }
    }
    compileTestKotlin {
        kotlinOptions {
            jvmTarget = "17"
        }
    }
}

kapt {
    arguments {
        arg("micronaut.openapi.views.spec", "redoc.enabled=true,rapidoc.enabled=true,swagger-ui.enabled=true,swagger-ui.theme=flattop")
    }
}

micronaut {
    version.set("3.5.1")
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("br.com.houer.tab.*")
    }
}

tasks.jacocoTestReport {
    reports {
        xml.required.set(true)
    }
}

tasks.test {
    finalizedBy(tasks.jacocoTestReport) // report is always generated after tests run
}
tasks.jacocoTestReport {
    dependsOn(tasks.test) // tests are required to run before generating the report
}

sonar {
    properties {
        property("sonar.projectKey", "sambatech_tab-executiveview-query_AYjZNdOPcnP-boN0p4Md")
    }
}
