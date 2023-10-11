# README

## Project Description

This is a project called Crush It for NJIT CS490 Fall 2023, a planner app. More details coming soon.

Team Name: ...pending...

## WSL Development Setup
Use your IDE or Git to clone the project to a directory in Windows Subsystem for Linux.

Then, open a terminal and run the following commands to install `nvm`, `node`, and `yarn`. 

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

## Load the .env file with required fields
```
This is a placeholder for later, we will detail the required secrets and where they can be gotten
```
