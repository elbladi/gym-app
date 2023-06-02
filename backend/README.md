## Description

Microservices can be developed in any language or technology since the dependencies will be isolated in a Docker container.

## New Microservice

-   Create the microservice inside the backend folder

```
cd backend
npx @nestjs/cli new <service-name>
```

**This is a nestjs app example. But you can use any other type of technology**

-   Add a Dockerfile for your service with instructions on how to create the image
-   Create the docker image & publish it into docker hub.

```
docker build -t <docker-username>/<service-name> .
docker push <docker-username>/<service-name>
```

-   Add your deployment file inside `infra/k8s`. Example: `infra/k8s/users-depl.yml`
-   Update `skaffold.yaml` by adding your docker image name (artifact).
