# Auto package and publish extension into Marketplace

The `create.sh` file would auto package this extenstion then publish the extension into your marketplace. 

This file assumes that some environment variables has been set up properly prior executing this file. The environment variables is stored in the `.env` file. `.env` file has the following variables that needs to filled in.
   1.  `AZDO_TOKEN` - PAT token of your AZDO. Make sure this token is configured to have `Organization` setting set to `All accessible organizations`.
   1. `AZDO_ORGANIZATION` - organization where the extension would be shared to.
   1. `AZDO_PUBLISHER_ID` - publisher id.
   1. `AZDO_EXTENSION_ID` - extension id.

Once the `.env` is set, excute `source .env` to set the environment variables prior to executing the `./create.sh` command.

This file would do the following:
1. Bump the extension's version. This would take the latest `version` value of `/publishhtmlreport/task.json`. This would bump the following file's version numbers:
    1. `./publishhtmlreport/task.json`
    1. `./vss-extension.json`
    1. `./package.json`
    1. `./publishhtmlreport/package.json`
1. Execute `./bootstrap.sh`
1. Compile `publishhtmlreport` (`tsc`) and the extension (`npm run build`)
1. Publish the `vsix` to the marketplace.

## First time publishing the extension
There is a validation problem when first time publishing, it would complain that there are more than 1000 files validation error. To overcome this, for the first time, we have to delete the `node_modules` folder. Executing `./create.sh` with an argument (any argument) would delete the `node_modules` folder - e.g. `./create.sh true`. Then on subsequent run, there is no need for the argument, just execute `./create.sh`