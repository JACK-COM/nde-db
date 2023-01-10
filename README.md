# 🗂️ *iNDEx*

This is the backend for a database of NDE resources.

---

- [🗂️ *iNDEx*](#️-index)
  - [Getting Started](#getting-started)
    - [Install dependencies](#install-dependencies)
    - [Configuration](#configuration)
    - [Database | Prisma](#database--prisma)
  - [Running](#running)
  - [Contributing](#contributing)

---

## Getting Started

You will need to
* Create a database (using one of Prisma's supported providers -- see [**Database**](#database--prisma))
* Sync `Prisma` to the project following their documentation


### Install dependencies
```bash
$. npm install 
```

### Configuration

1. Create a new file `{ProjectRoot}/.env` 
2. Copy Contents from `{ProjectRoot}/env.sample` 
3. (Optional) Run `npm run generate-keys` to generate random values for the `JWT_SEC` and `ENCRYPT` .env constants.

### Database | Prisma
If you don't have it installed, you will want to `npx prisma && npx prisma init` to get [Prisma]() on your machine. Then you can follow the next steps:
1. Create a postgres database on your machine called `nde_db`
2. Update the `DATABASE_URL` in the `.env` file to point to your existing database.\
   The end result should look something like this:
   ```
   DB_URL="postgresql://username:password@localhost:5432/nde_db"
   ```
3. If you are not using `postgres`, change the `provider` of the `datasource` block in schema.prisma to match your database. Prisma also supports `mysql`, `sqlite`, `sqlserver` and `mongodb`. 
4. Run `npx prisma db push` (mapped to `npm run prisma-sync`) to create tables in your database from the **Prisma** schema.
5. Run `npx prisma generate` to generate the Prisma Client. You can now access your database.


---

## Running
Run the project on `localhost:4001` (or the `PORT` variable in your .env file):
```bash
$. npm run start
```

---

## Contributing
Any and all suggestions and pull requests are welcome. 
