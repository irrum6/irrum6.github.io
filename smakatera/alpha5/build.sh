echo `date -I'minutes'`

rm app.min.js

printf "try {\n" >> app.min.js
cat utils.js > echo >> app.min.js
printf "\n\n" >> app.min.js
cat controller.js > echo >> app.min.js

printf "\n\n}catch(e){\n\tconsole.log(e);\n}\n\n" >> app.min.js

printf "//Build Date : $(date -I'minutes')" >> app.min.js