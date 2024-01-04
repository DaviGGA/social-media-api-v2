# Instagram Clone API
Node: v18.16.0

## Video demonstration
https://www.youtube.com/watch?v=JHXKjRc8upQ

<br />
<br />

[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,postgres,prisma&theme=light)](https://skillicons.dev)

## How to install

- First clone the repository
```
git clone https://github.com/DaviGGA/social-media-api-v2.git
```

<br />

- Install all necessary packages
```
npm install
```

<br />

- At ./prisma/schema.prisma you can find the database models and datasource, change it or create a database called socialmedia with user as "postgres" and password as "postgres" at localhost
```
// This is the PostgreSQL template for DB URL
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

<br />

- Run prisma migrations
```
npx prisma migrate dev
```

<br />

- Run the application
```
npm run dev
```

You can test it out only using Postman, Insonmia, etc. but i also made a simple Front-End, here is the repo:
https://github.com/DaviGGA/social-media

