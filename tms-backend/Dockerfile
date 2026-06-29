# Use an official OpenJDK image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml first to cache dependencies
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Download dependencies (this step will be cached)
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application
ENTRYPOINT ["java", "-jar", "target/tms-backend-1.0.0.jar"]
