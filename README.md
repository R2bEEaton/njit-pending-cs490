# README

## Project Description

This is a project called Crush It for NJIT CS490 Fall 2023, a planner app. More details coming soon.

Team Name: ...pending...

## WSL Development Setup
Use your IDE or Git to clone the project to a directory in Windows Subsystem for Linux.

Then, open a terminal in the project root and run the following commands to install `nvm`, `node`, and `yarn`.

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    nvm install --lts
    curl -o- -L https://yarnpkg.com/install.sh | bash

Then, install the project

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

## Install Local Postgres Server

Install PostgreSQL:

```
sudo apt install postgresql
```

Start the postgres service:

```
sudo service postgresql start
```

After installing, start the postgres terminal with the following command:

```
sudo -u postgres psql
```

Once in the postgres terminal, set the password for the postgres user with the following SQL command:

```
ALTER ROLE postgres WITH PASSWORD 'password';
```

Then, create the database with the following SQL command:

```
CREATE DATABASE pendingredwood;
```

In a file called `.env`, add the following:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/pendingredwood?connection_limit=1"
```

## Google OAuth Setup
Let's set up Google OAuth to work clientside. Add the following to your .env file using the CLIENT ID and CLIENT SECRET from a Google Cloud project.

https://console.cloud.google.com/apis/credentials?authuser=1&project=crush-it-cs490

![img.png](readme_assets/img.png)

Click the edit button, copy the Client ID and Secret.

```
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GOOGLE_OAUTH_REDIRECT_URI="http://localhost:8910/.redwood/functions/oauth/callback"
```

## Generate Secret for dbAuth
```
yarn rw g secret
```

This generates a secret for dbAuth. Copy and paste it into .env under SESSION_SECRET

## Full .env file example
```
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GOOGLE_OAUTH_REDIRECT_URI="http://localhost:8910/.redwood/functions/oauth/callback"

DATABASE_URL="postgresql://postgres:password@localhost:5432/pendingredwood?connection_limit=1"
SESSION_SECRET=...
```
