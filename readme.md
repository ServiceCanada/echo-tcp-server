# Echo TCP server

Utility server for debugging TCP message communication by echo or by replying pre-defined response.

## Run

```
node server.js
```

## How it works

1. Start the Echo TCP Server
2. Connect and submit data to the server
3. The server will echo the data submitted or the predefined response.

## Add predefined response

Requirement:
* Configure an `.env` file with an `AUTOREPLY` setting.
* Add your predefined response as a text file in your project.

## Environment configuration

* `PORT`: (Number) Server port for listening
* `HOST`: (String) Server Host or IP for listening

### `AUTOREPLY` settings

Value: JSON string

It is a key/value pair where the **key** represent the beginning of the received data and the **value** is the file system path where to load the response.

For example:
```
AUTOREPLY=`{
	"GET /example/endpointA": "responses/endpointA.txt",
	"POST /example/endpointA": "responses/endpointA-post.txt"
}`
```
