[![Deploy API](https://github.com/keinuma/continuer-app/actions/workflows/deploy-api.yml/badge.svg)](https://github.com/keinuma/continuer-app/actions/workflows/deploy-api.yml)

# continuer

## Develop

To develop all apps and packages, run the following command:

```sh
pnpm install
pnpm dev
```

## Build and Deploy with Docker

```sh
docker build --platform=linux/amd64 --tag asia-northeast1-docker.pkg.dev/${project-id}/${repository-id}/app:latest -f ./apps/web Dockerfile .
docker push asia-northeast1-docker.pkg.dev/${project-id}/${repository-id}/app:latest
```

# LICENSE

- [MIT](https://github.com/keinuma/continuer-frontend/blob/main/LICENSE)
