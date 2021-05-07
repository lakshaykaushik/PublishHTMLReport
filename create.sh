#!/bin/bash
removenodemodules=$1
# bump the version

# Get the current version
currentversion=$(cat ./publishhtmlreport/task.json | grep "Patch" | tr -dc '0-9')
echo "Current version: $currentversion"
# Bump the version
newversion=$(($currentversion+1))
echo "Bumped version: $newversion"

# Patch versions
#   MACOS `sed` has a different a parameter it requires a `""`
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Patching ./publishhtmlreport/task.json"
    sed -i "" "s/\"Patch\":.*/\"Patch\": $newversion/g" "./publishhtmlreport/task.json"

    echo "Patching ./vss-extension.json"
    sed -i "" "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./vss-extension.json"

    echo "Patching package.json"
    sed -i "" "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./package.json"
    sed -i "" "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./publishhtmlreport/package.json"
else
    echo "Patching ./publishhtmlreport/task.json"
    sed -i "s/\"Patch\":.*/\"Patch\": $newversion/g" "./publishhtmlreport/task.json"

    echo "Patching ./vss-extension.json"
    sed -i "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./vss-extension.json"

    echo "Patching package.json"
    sed -i "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./package.json"
    sed -i "s/\"version\":.*/\"version\": \"1.2.$newversion\",/g" "./publishhtmlreport/package.json"
fi

# 3. run ./boostrap.sh 
./bootstrap.sh 
# cd  publishhtmlreport -> tsc
cd publishhtmlreport && tsc
if [ ! -z "$removenodemodules" ]; then
    rm -fr ./node_modules
fi

# cd <back> -> npm run build
cd .. && npm run build

# Publish to market place
tfx extension publish --vsix "$AZDO_PUBLISHER_ID.$AZDO_EXTENSION_ID-1.2.$newversion.vsix" --share-with $AZDO_ORGANIZATION --token $AZDO_TOKEN

echo "Done >>>>> Published $AZDO_PUBLISHER_ID.$AZDO_EXTENSION_ID-1.2.$newversion.vsix"