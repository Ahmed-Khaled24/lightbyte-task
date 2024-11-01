# Events Management System

## Tools and Technologies used:

-   Express.js
-   TypeScript
-   Mongoose ODM
-   Zod for validation and type generation

## How to run the project:

**First** make sure that you have Node.js installed on you machine, version 20 or higher.

1. Clone the repository to your local machine.

```bash
 git clone git@github.com:Ahmed-Khaled24/LightByte-task.git
```

2. Navigate to the project directory.

```bash
 cd LightByte-task
```

3. Install the project dependencies.

```bash
 npm install
```

4. To run the project in dev mode, create a `.env.dev` file in the root directory of the project, and add the following environment variables:

```bash
MONGO_URL="add-your-own-mongo-url"
PORT=3000 # Or any other port you want to use
```

Then run the following command:

```bash
 npm run start:dev
```

5. To run the project in production mode, create a `.env.prod` file in the root directory of the project, and add the same environment variables as step `4`.  
   Then run the following command:

```bash
 npm run start:prod
```
