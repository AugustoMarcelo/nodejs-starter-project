This is a Node.js project with some preconfigured libraries and design patterns like:
  - DDD
  - Tests with [Jest](https://jestjs.io/)
  - Dependency Injection
  - Repository Pattern
  - [Typeorm](https://typeorm.io/) with [PostgreSQL](https://www.postgresql.org/)
  - Authentication with [JWT](https://jwt.io/)
  - Build libs preconfigured
  - Environment variables
  - Routes validation with [Celebrate](https://github.com/arb/celebrate)
  - Typescript
  - Eslint, Prettier

### ⬇ Cloning project

  ```bash
    git clone https://github.com/augustomarcelo/nodejs-starter-project your-project-name
  ```

### 🔐 Generate pair keys

  For JWT implementation, I recommend generating a public and private key pair.

  ```bash
    # Generate private key
    ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key

    # Generate public key
    ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
  ```

  <small>Reference: https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9#gistcomment-2855422</small>

  After generating the keys, create an `.env` file (or rename the `.env.example`) and fill it out.


### 🎲 Create ormconfig.json

  You can rename the file `ormconfig.example.js` and fill in the fields with your data

### ⌨ Commands

  | Descrtion | Command |
  |---|---|
  | Run application | `yarn dev:server` |
  | Build | `yarn build` |
  | Run tests | `yarn test` |
  | Create migrations | `yarn typeorm migration:create -n MigrationName` |
  | Run migrations | `yarn typeorm migration:run` |
  | Revert migrations | `yarn typeorm migration:revert` |

