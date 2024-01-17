# Database Documentation
We are using PostgreSQL with Docker for our database. Scripts for the initial database setup are located in the `database/init*` directories.

# Setup Configuration
The database can be set up either for production or for testing. The database names used are as follows:
- Production: `cube_data`
- Testing: `test_data`

When setting up the `.env` file, take care to use the correct database names since they are hardcoded into the initialization files (there isn't a great way to use environment variables in .sql files). The following environment variables are required:

```
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=[cube_data|test_data]
POSTGRES_DATA_PATH=["database/data"|"database/test_data"]
POSTGRES_INIT_PATH=["database/init"|"database/init_test"]
```

If this is the first time running the Docker container, `POSTGRES_DATA_PATH` can be any empty directory since it is bound by Docker to the data directory inside the container. However, if there is already existing data take care to set the right value.