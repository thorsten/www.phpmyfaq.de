# www.phpmyfaq.de

## Installation

    $ git clone https://github.com/thorsten/www.phpmyfaq.de.git
    $ cd www.phpmyfaq.de
    $ npm install
    $ bower install
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

## Testing

n/a

## Bugs

n/a

## License

n/a

(c) 2014-2015 Thorsten Rinne