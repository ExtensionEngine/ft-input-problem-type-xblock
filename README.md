# Kauffman FastTrack input problem XBlock

This is custom XBlock for simple user input. Input data is stored per user and question is stored for all instances.

## How to install this XBlock

Create folder 'xblocks' in edx-platform
```
edx-platfom/xblocks/
```

Clone this repository inside of xblocks folder. You should have something like this
```
edx-platform/xblocks/ftinputxblock
```

As edxapp user, from the folder 'xblocks' run following command
```
/edx/bin/pip.edxapp install --upgrade --no-deps ftinputxblock/
```

After reinstalling servers you should be able to add this xblock in studio. From within wanted course follow these steps:
settings -> advanced settings -> advanced modules list

add it to list.
```
[
    "ftinputxblock"
]
```
