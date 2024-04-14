# Hackathon 2023 - DailyPay.Augmented

You're application is available at: [daily-ar.hackathon.sandbox.dailypay.com](https://daily-ar.hackathon.sandbox.dailypay.com)

This repository has been bootstrapped by the [hackathon-2023-infrastructure](https://github.com/dailypay/hackathon-2023-infrastructure) repository.

You're builds, deployments, and infrastructure is managed for you! Write code, push to master, and watch it go...

## Prerequisites

- Docker
- Login to Artifactory
- (Optional) AWS profile configured (For live logs)
- (Optional) `GITHUB_TOKEN` with workflow permissions to deploy

## First Time Setup

Run `npm install`

ADD THIS IMPORT STATEMENT TO RNDateTimePickerShadowView.m File:

`#import <React/RCTLog.h>`

ADD AN EXTRA PIPE TO YOGA MODULE

### Login to Artifactory

Docker images are pulled and pushed to Artifactory.
If you haven't already logged in, now is the time!

[Login instructions](https://dailypay.atlassian.net/wiki/spaces/TECH/pages/3121020977/Docker)

### Setting AWS Profile

Within your `~/.aws/config`

```ini
[profile hackathon-sandbox]
sso_start_url  = https://dailypay.awsapps.com/start
sso_region     = us-east-1
sso_account_id = 130410402553
sso_role_name  = hackSandboxOperator
region         = us-east-1
output         = json
```

## Developer Workflow

You're developer workflow will be as follows:

### Up

This will use docker compose to stand up your services.
Change the code and watch it reload

Your app will be available at [localhost:1337](http://localhost:1337)

To interact with the API, append `/api`, e.g. `localhost:1337/api/pets`

```bash
make up
```

Note: if you install additional frontend dependencies, you'll need to run `make restart`.
Unfortunately, due to package differences between `darwin` and `linux` local packages can't be mounted.
The dependencies are cached, so it should be quick.

### Logs

To view the container logs, run the following.

```bash
make logs
```

### Restart

If you download new `frontend` dependencies!

```ini
make restart
```

### View Your Services Live Deployed Logs

Your service's logs are being written to cloudwatch. The following command will tail them, and write them to your local.

```bash
make ecslogs
```

### Deploy a Specific Version

On pushes to main, the code will be built, tagged with the commit SHA and deployed. If you need to rollback to a previous version, or want to deploy a specific version run the following.

```bash
make deploy VERSION=<COMMIT_SHA>
```

## Pipelines

There are three pipelines:

- `on-main-merge.yml`
- `on-pull-request.yml`
- `reusable-deploy.yml`

### On Main Merge

1. The containers will be built
2. The container tagged with the commit SHA and pushed to artifactory
3. The container version is deployed via terraform

### On Pull Request

1. The container is built as test

### Reusable Deploy

1. Plans terraform
2. Applies terraform (Deploy)

## Database

By default, all backends are configured with basic SQLite Code.

`db/bootstrap.sql` - Runs on startup

### Bootstrapping

There are two options for database bootstrapping:

- write your SQL to `bootstrap.sql`.
- come up with your own approach
