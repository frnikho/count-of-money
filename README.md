# Count of money

![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)


> This project is an EPITECH Project. If you are an EPITECH student, move out the way! Nothing to see here... The groups don't want to be involved to your -42.
> If you're not, no worries! You're welcome here!


#### Code Quality

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=frnikho_count-of-money&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=frnikho_count-of-money&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=frnikho_count-of-money&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)

****


## Documentation

Le projet est basé sur un mono repo NX. il contient 2 applications :
- Api (NestJS en typescript)
- Web (React en typescript)

et de plusieurs modules :

- Shared (Class/Interface utilisée par les deux applications)
- Utils (fonction et données utilisée par l'api ou le web)

Pour créer une nouvelle application dans le mono repo, il faut se référer à la documentation NX: https://nx.dev/nx/generate

Pour créer un nouveau module typescript, il faut execute la commande suivante à la racine du repository:

```shell
$ pnpm nx g lib nom_du_module
```

### CLI

**dev:**
```shell
$ pnpm run dev:api
$ pnpm run dev:web
```

**prod:**
```shell
$ pnpm run prod:api
$ pnpm run prod:web
```

### CI:

3 actions github ont été créés dans le dossier '.github/workflows':
- Le build afin de vérifier le bon fonctionnement de l'application,
- le linter qui vise à améliorer la qualité du code
- les tests qui exécutent les tests web et api et qui envoie les données a sonarcloud afin d'avoir une interface plus détaillée de nos tests, coverage et issues possibles

La CI est exécuté automatiquement à chaque changement qui touche de prés ou de loin a main (ouverture d'une PR, merge d'une PR...)

Pour le build de la CI, trois versions de node sont testés et ont pour but de vérifier la compatibilité de notre application dans le temps avec les librairies installées.


### Docker:

Nos services ont été découper dans un docker compose afin d'orchestrer le build et le deployment de façon autonome notre application.

Deux dockers compose ont été créé:

- Un docker compose de développement, qui facilite le développement d'une partie de notre application ou d'un service
- Un docker compose de déploiement qui vise à être déployé sur un server distant.

Chaque docker compose comprends au minimum 4 services:

- **Postgres**, notre base de données
- **Adminer**, une interface pour gérer notre base de données sans avoir besoin de passé par la cli psql
- **Api**, notre application nestjs qui est construite selon le Dockerfile
- **Web**, notre application react qui est également construite selon le Dockerfile

Le docker compose de production comprends également 2 autres services:

- **Jwilder/nginx,** un service qui nous permet la création d'une configuration nginx dynamique et sans avoir besoin de créer des fichiers de configs
- **acme**, un service d'obtention de certificats SSL/TLS auprès de l'autorité let's encrypt

Ces deux services sont connectés ensemble afin de fournir un reverse-proxy dynamique en https pour la production.


Pour lancer le docker-compose de développement:
```shell
$ docker compose up # A la racine du repository
```

Pour lancer le docker-compose de production:
```shell
# On lance en premier les services de reverse-proxy/https
$ docker compose --env-file .env.prod -f docker-compose.prod.yml up --build acme-companion nginx-proxy -d
# On lance ensuite les services requis pour l'application
$ docker compose --env-file .env.prod -f docker-compose.prod.yml up --build adminer api db web -d
# Le service adminer est optionnel en production
# si besoin, vous pouvez afficher les logs des conteneurs pour vérifier leurs fonctionnement:
$ docker compose logs
```


