# ZLI-Modul-109-Voting-app (Demo React and NodeJS app)

> This is a ReadMe for the deployment and configuration of the voting-app based on React and NodeJS.

---

## Technologies

- Docker
- Python
- Flask
- PostgreSQL
- HTML
- JavaScript
- OpenShift

## Scope
The goal was to create a dynamic voting application to replace the current paper-heavy counting tasks for political parties in Switzerland. The application must be able to run on mobile devices and be intuitive. It allows users to vote for their favorite political parties and view the results in real-time.

[Back To The Top](#zli-modul-109-voting-app-demo-react-and-nodejs-app--lösung)

## Environmen Variables
The backend and frontend are combined in this project. To control the behavior of the application during runtime, the following environment variables can be set:

| Variable Name             | Description                                     |
|---------------------------|-------------------------------------------------|
| `POSTGRES_HOST`           | Host for the PostgreSQL database                |
| `POSTGRES_USER`           | Username for the PostgreSQL database            |
| `POSTGRES_PASSWORD`       | Password for the PostgreSQL database            |
| `POSTGRES_DB`             | Name of the PostgreSQL database                 |
| `PGADMIN_DEFAULT_EMAIL`   | Default email for PGAdmin                       |
| `PGADMIN_DEFAULT_PASSWORD`| Default password for PGAdmin                    |
| `DATABASE_URL`            | Connection string for the PostgreSQL database   |

[Back To The Top](#zli-modul-109-voting-app-demo-react-and-nodejs-app--lösung)