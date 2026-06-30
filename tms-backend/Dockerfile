FROM maven:3.9-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/tms-backend-1.0.0.jar"]
