#!/bin/bash

for f in * ; do
    filename=$(basename -- "$f")
    filename="${filename%.*}"
    cwebp $f -o "$filename.webp"
done
