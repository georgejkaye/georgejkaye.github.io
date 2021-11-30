#!/bin/bash

for f in * ; do
    filename=$(basename -- "$f")
    basename="${filename%.*}"
    extension="${filename##*.}"
    if [ "$extension" == "jpg" ] ; then
        cwebp $f -o "$basename.webp"
        rm $f
    fi
done
