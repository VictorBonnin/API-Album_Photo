# API Albums-Photos

## Overview
The API allows users to retrieve all of the users of the application in micro service through a REST architecture. This API will be mainly used for registed Accounts.

It will also create own users to recover data to the platform but is in no way related to the users collected via the crawling of profiles on Social Networks.

### [POST] Create Albums/Photos
Allows the creation of a single album/photo.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : POST → albums/
* HTTP request : POST → photos/:idAlbum

#### Parameters Albums:
```javascript
{
  'Title': String, // Non Optional
  'Description': String, // Optional
  'Photos': Tableau // Optional
}
```

#### Parameters Photos:
```javascript
{
  'Title': String, // Non Optional
  'Url': String, // Non Optional
  'Description': String, // Optional
  'Album': String // Non Optional
}
```
#### Response Album:
```javascript
{
  Title: String,
  Description: String,
  Photos: Tableau
}
```

#### Response Photo:
```javascript
  {
  Title: String,
  Url: String,
  Description: String,
  Album: String
  }
```
### [GET] Delete Albums/Photos
Allows show a single album/photo.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : GET → albums/:id
* HTTP request : GET → photos/:id

### [PUT] Update Albums/Photos
Allows to uptdate a single album/photo.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : PUT → albums/:id
* HTTP request : PUT → photos/:id

### [DELETE] Delete Albums/Photos
Allows to delete a single album/photo.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : DELETE → albums/:id
* HTTP request : DELETE → photos/:id

### Requirements
* node 18
* npm or yarn or pnpm
* git
* mongodb (please configure config.js for link mongodb)
* pm2

### Install
```npm i```

### Production mode
```npm run prod```

### Dev mode
```npm run dev```

### Lunch with monitoring
```pm2 start process.json```