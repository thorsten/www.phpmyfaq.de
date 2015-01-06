# www.phpmyfaq.de

## Installation

    $ git clone https://github.com/thorsten/www.phpmyfaq.de.git
    $ cd www.phpmyfaq.de
    $ npm install
    $ bower install
    $ grunt build
    $ grunt serve
    
## Build

### Development

    $ grunt fetchVersions
    $ grunt fetchDownloadInfos
    $ grunt
    
The site will be generated inside the folder ./dist with http://localhost:9000 as domain. Usually you only need the
"grunt serve" task during development.

### Staging

    $ grunt fetchVersions
    $ grunt fetchDownloadInfos
    $ grunt -env=staging

The site will be generated inside the folder ./dist with http://staging.phpmyfaq.de as domain.

### Production

    $ grunt fetchVersions
    $ grunt fetchDownloadInfos
    $ grunt -env=production
    
The site will be generated inside the folder ./dist with http://www.phpmyfaq.de as domain.

## Deployment

First, generate a JSON file with the name **.ftppass** in the root folder of this project. The file contains your FTP 
username and password:

    {
      "production": {
        "username": "your-ftp-username",
        "password": "your-ftp-password"
      }
    }

### Staging

The deployment endpoint is defined in ./data/staging/deployment.json, then just simply deploy with this command:

    $ grunt deploy -env=staging

### Production

The deployment endpoint is defined in ./data/production/deployment.json, then just simply deploy with this command:

    $ grunt deploy -env=production

## Testing

n/a

## Bugs

n/a

## License

Mozilla Public License 2.0, see LICENSE.md for more information.

© 2014-2015 Thorsten Rinne