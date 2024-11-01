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

## Basic API Documentation:

### Create an event:

**Constraints:** A user is allowed to create at most 5 events per day.

-   **URL:** `/events`
-   **Method:** `POST`
-   **Request Body:**

```json
{
    "title": "Event Name",
    "description": "Event Description",
    "date": "2022-12-12T12:00:00.000Z" // Must be in the future
}
```

-   **Response:**

```json
{
    "data": {
        "title": "Event Name",
        "description": "Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-username"
    }
}
```

### Get all events:

-   **URL:** `/events`
-   **Method:** `GET`
-   **Query Parameters**
    -   `page` (optional) `Must be greater than or equal 0`
    -   `limit` (optional) `Must be greater than 0`
-   **Response:**

```json
{
    "data": [
        {
            "title": "Event Name",
            "description": "Event Description",
            "date": "2022-12-12T12:00:00.000Z",
            "_id": "event-id",
            "createdAt": "2022-12-12T12:00:00.000Z",
            "updatedAt": "2022-12-12T12:00:00.000Z",
            "createdBy": "some-username"
        }
    ]
}
```

### Get a single event:

-   **URL:** `/events/:id`
-   **Method:** `GET`
-   **Response:**

```json
{
    "data": {
        "title": "Event Name",
        "description": "Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-username"
    }
}
```

### Update an event:

-   **URL:** `/events/:id`
-   **Method:** `PATCH`
-   **Request Body:**

```json
// The updated version of the event
{
    "title": "New Event Name", // Optional
    "description": "New Event Description", // Optional
    "date": "2022-12-12T12:00:00.000Z", // Optional
    "createdBy": "some-new-username" // Optional
}
```

-   **Response:**

```json
{
    "data": {
        "title": "New Event Name",
        "description": "New Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-new-username"
    }
}
```

### Delete an event:

-   **URL:** `/events/:id`
-   **Method:** `DELETE`
-   **Response:**

```json
// The deleted event
{
    "data": {
        "title": "New Event Name",
        "description": "New Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-new-username"
    }
}
```

### Subscribe to an event:

-   **Constraints:** A user is allowed to subscribe only to the future events.

-   **URL:** `/events/:id/subscribe`
-   **Method:** `POST`
-   **Response:**

```json
// The target event after updating the attendees list
{
    "data": {
        "title": "Event Name",
        "description": "Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-username",
        "attendees": ["some-username"]
    }
}
```

### Unsubscribe from an event:

**Constraints:** A user is allowed to unsubscribe only from the events he/she is already subscribed to, also, must be in the future.

-   **URL:** `/events/:id/unsubscribe`
-   **Method:** `POST`
-   **Response:**

```json
// The target event after updating the attendees list
{
    "data": {
        "title": "Event Name",
        "description": "Event Description",
        "date": "2022-12-12T12:00:00.000Z",
        "_id": "event-id",
        "createdAt": "2022-12-12T12:00:00.000Z",
        "updatedAt": "2022-12-12T12:00:00.000Z",
        "createdBy": "some-username",
        "attendees": []
    }
}
```
