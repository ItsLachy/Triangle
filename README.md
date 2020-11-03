# Triangle [![Discord](https://img.shields.io/discord/760646632584511539?style=flat-square&label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/weTkeRB)
Multi-purpose Discord bot

- [Reporting bugs & vulnerabilities](#Reporting-bugs-&-vulnerabilities)
- [Selfhosting](#selfhosting)


## Reporting bugs & vulnerabilities

Most issues can be reported by either [opening an issue](https://github.com/triangle-project/triangle/issues/new) or in the [`#support` channel on Discord](https://discord.gg/ZfsRkQZ6PV). However, if you find a vulnerability that is exploitable in any way/shape/form, please reach out to me directly on Discord (`Eton#4446`).

## Selfhosting

Triangle is designed to be easily scalable, as such it is designed to be run inside of a [Docker](https://docker.com) container. It can be run without docker but we strongly recommend against it. Additionally, this means you **will not be able to host Triangle on services such as Glitch or Heroku.**

With that out of the way, we can now get into the steps of actually self-hosting Triangle for yourself. This guide will not go over how to setup a server or docker and presumes that these things are setup already.

If you run into any issues, don't hesitate to open an [issue](https://github.com/triangle-project/triangle/issues/new).

### 1. Dependencies
At the current moment Triangle has no other dependencies so you can run it just fine with docker alone, **however this may change in the future.**

### 2. Pulling the Docker image
To begin, run the following to pull the image from Github's servers;
```bash
sudo docker pull docker.pkg.github.com/triangle-project/triangle/triangle:0.0.0
```

### 3.1. Running the image with Docker
This is the normal way you would run a Docker container, however, we recommend that you use [Docker-Compose](#3.2.-Running-the-image-with-Docker-Compose) to run Triangle.

```bash
sudo docker run -d --name Triangle \
-e "PREFIX=t!" \
-e "DISCORD_PRODUCTION=your_token_here" \
-e "PRODUCTION=true" \
docker.pkg.github.com/triangle-project/triangle/triangle:0.0.0
```

Make sure to replace `your_token_here` with your Discord token. Optionally, you can set the `SENTRY_URL` environment variable to have any errors reported to your sentry instance.

### 3.2. Running the image with Docker-Compose
This is a method that is a little bit more complex but it will make your life easier as you can simply update your docker-compose.yml from this repository, and restart the compose to get any updates.

Firstly, make sure you have [Docker Compose](https://docs.docker.com/compose/install/) installed.

Now all you need to do is download the `docker-compose.yml` file from the most recent release to a folder on your server.

Then move into that directory and run the following command to bring up Triangle and any dependencies it may need.

```bash
sudo docker-compose up -d # Is it crashing? Remove the -d to view logs
```

### 4. Updating
The way you update will depend on how you are running Triangle. To update the normal Docker method ([3.1](#3.1.-Running-the-image-with-Docker)) you will need to stop and remove the container, pull the new version, spinup any dependencies, then start a new container following the instructions in [3.1](#3.1.-Running-the-image-with-Docker).

If you are running Triangle with Docker Compose, updating is much simpler. Firstly you need to shutdown Triangle. *Make sure you are in the folder where you uploaded the `docker-compose.yml`.
```bash
sudo docker-compose down
```

Next, download the new `docker-compose.yml` from the latest release and replace your current file. Make sure to replace any fields that you modified in the new file. Then just bring everything back up.
```bash
sudo docker-compose up -d
```
