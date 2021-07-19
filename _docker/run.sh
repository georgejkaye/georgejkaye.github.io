#!/bin/bash

set -e

site_dir="/srv/jekyll" # Note: This must match the other _docker scripts, and the Github Actions workflow
css_dst_dir=$site_dir/public/css

chmod 777 $site_dir
chmod a+w $site_dir/Gemfile.lock

cd $site_dir
jekyll build --future --trace

chown -R `stat -c "%u:%g" $site_dir` $site_dir/_site
