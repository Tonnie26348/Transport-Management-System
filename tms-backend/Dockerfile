# Use official Eclipse Temurin image (which includes Maven)
FROM maven:3.9.6-eclipse-temurin-21

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml first to cache dependencies
COPY pom.xml .

# Download dependencies (this step will be cached)
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests

# Run the application
ENTRYPOINT ["java", "-jar", "target/tms-backend-1.0.0.jar"]
