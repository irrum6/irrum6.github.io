dir="scripts"
cat $dir/query.js $dir/lib.js $dir/convert.js $dir/translate.js > app.tools.js
cat $dir/pop.js  $dir/inputbox.js > app.templates.js
cat $dir/helper.js  $dir/presenter.js $dir/main.js > app.min.js

cat styles/main.css styles/dark.css > app.min.css

cat styles/pop.css styles/pop_dark.css > styles/pop.all.css

cat styles/box.css styles/box_dark.css > styles/box.all.css