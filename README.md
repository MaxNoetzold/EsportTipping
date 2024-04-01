# Free Esport Tipping

## Run in Development

1. Create a `backend/.env` file out of the respective `EXAMPLE.env` file.
2. Start frontend & backend with `npm run dev`

## Run in Production

1. Create a `./.env` and a `backend/.env.production` file out of the respective `EXAMPLE.env` files.
2. Build: `docker compose build`
   1. Tag: `docker tag esport-tipping-server maxnoetzold/esport-tipping-server:${version}`
   2. Upload: `docker push maxnoetzold/esport-tipping-server:${version}`
3. Run: `docker-compose up -d`
   1. Probably first run `nano docker-compose.yaml` to edit the versions tag
   2. Download: `docker pull maxnoetzold/esport-tipping-server:${version}`
   3. Copy the relevant docker files to the server `scp docker-compose.yaml .env Dockerfile user@ip:~/server docker-compose.yaml`

## Docker Only Commands

Build the container: `docker build -t esport-tipping .`

Run the container: `docker run --init -p 3000:3000 esport-tipping`
