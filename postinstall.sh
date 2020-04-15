#!/bin/bash

#===============================================================================
#
#          FILE:  postinstall.sh
#
#         USAGE:  ./postinstall.sh --type=patch
#
#   DESCRIPTION: Copies gent_styleguide build assets to the static/images folder.
#
#       OPTIONS:  ---
#  REQUIREMENTS:  ---
#          BUGS:  ---
#         NOTES:  ---
#       AUTHORS:  
#                 Bart Delrue bart.delrue@digipolis.gent
#                 Robbie Verdurme robbie.verdurme@digipolis.gent
#       COMPANY:  Digipolis Gent
#       VERSION:  1.0
#       CREATED:  14/04/2020
#      REVISION:  ---
#===============================================================================

#
# Create the necessary directories and move files to them after npm install or yarn install is run.
#
if [ -d "node_modules/gent_styleguide/build/styleguide" ]; then
echo "Copy styleguide assets/img/favicon/build/cyan to ~/static/images"

  rm -rf static/images/cyan;

  cp -R node_modules/gent_styleguide/build/styleguide/img/favicon/build/cyan static/images;

echo "Copy styleguide assets/img/svg to ~/static/images"
  rm -rf static/images/svg;

  cp -R node_modules/gent_styleguide/build/styleguide/img/svg static/images;

fi