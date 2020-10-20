echo `date -I'minutes'`

dir=/var/www/html

dir2=`pwd`

cd $dir
rm -R ./sandbox
mkdir sandbox

cd $dir2

cat ./styles/colors.css ./styles/style_normal.css ./styles/style_dark.css > style.css
cp ./scripts/main.js app.js

echo "//@`date -I'minutes'`" >> app.js

cp -R ./ $dir/sandbox


