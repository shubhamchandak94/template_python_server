# Template Python Server
This is a template Python server that consists of a backend able to receive a JSON in a POST request, do some computation and return the results in another JSON object. The template site just does a simple substring computation, but the same principles can be extended to more complex services. The API is described below, the [`backend`](backend/) directory has the instructions for deploying the backend, and the [`frontend`](frontend/) directory has a minimal HTML/JS frontend able to interact with the backend (a simple `curl` command can also be used for testing as described in the backend README). In addition, a simplified setup using docker is described in [`backend_docker`](backend_docker/) which just requires running a single command to set up the whole thing!

### API documentation
We assume the backend address is http://example.com.

---
```
GET http://example.com/
```
Response body: 
```
Hello, World! You have reached the template website.
```
---
```
GET http://example.com/version
```
Response body JSON:
```
{
  "version": string
}
```
| Field  | Type | Description |
| ------------- | ------------- | ------------- |
| version  | string  | Version of code |
---
```
POST http://example.com/substring
```
Request body JSON:
```
{
  "string": string,
  "start": integer,
  "end": integer
}
```
| Field  | Type | Description |
| ------------- | ------------- | ------------- |
| `string`  | `string`  | (Required) The string for which we want the substring |
| `start`  | `integer`  | (Required) The start index for substring |
| `end`  | `integer`  | (Required) The end index for substring |


Response body JSON:
```
{
  "substring": string
}
```
| Field  | Type | Description |
| ------------- | ------------- | ------------- |
| `substring`  | `string`  | The substring `string[start:end]` where we follow Python indexing |

An error is thrown with response status code 400 if the condition `0 <= start <= end <= len(string)` is not satisified or if any of the fields are missing in the request.
