echo `date -I'minutes'`

# rm app.min.js

# printf "try {\n" >> app.min.js
# cat utils.js > echo >> app.min.js
# printf "\n\n" >> app.min.js
# # cat controller.js > echo >> app.min.js

# printf "\n\n}catch(e){\n\tconsole.log(e);\n}\n\n" >> app.min.js

# printf "//Build Date : $(date -I'minutes')" >> app.min.js

rm app.templates.js
dir="components"
cat $dir/pop.js $dir/new_game_dialog.js $dir/dialog.js $dir/radiobox.js $dir/colorbox.js > app.templates.js

rm app.entities.js
cat entities/snake.js entities/food.js > app.entities.js

rm app.min.js
cat player.js keyboard.js inputController.js uicontroller.js snakegame.js indexjs.js > app.min.js

printf "//Build Date : $(date -I'minutes')" >> app.min.js