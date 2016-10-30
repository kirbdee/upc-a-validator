##UPC-A Validator

**Tech Used**
- react
- create-react-app https://github.com/facebookincubator/create-react-app
    - to help with create the initial build / environment
- bootstrap

**Features**
-UPC-A Validator checks the validity of the UPC-A format ( https://en.wikipedia.org/wiki/Universal_Product_Code ) before trying to submit the request to the server
-Validation is done on the fly, and the user can see live updates of the validity of their input
-It tries to figure out some possible values if its potentially missing the leading number or the checksum, or has an extra number.
