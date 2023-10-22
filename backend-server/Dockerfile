#
# Build stage
#
FROM gradle:8.4.0-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle -Dskip.tests build

#
# Package stage
#
FROM openjdk:17-oracle
WORKDIR /app
COPY --from=build app/build/libs/*.jar app.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]