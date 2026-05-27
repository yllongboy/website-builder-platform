# Placeholder Dockerfile for Spring Boot API.
# Build this after the Spring Boot project is initialized.
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
