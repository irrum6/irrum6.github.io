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
dir="entities"
cat $dir/snake.js $dir/food.js > app.entities.js

rm app.controls.js
dir="controls"
cat  $dir/keyboard.js  $dir/inputController.js  $dir/uicontroller.js > app.controls.js

rm app.game.js
dir="game"
cat  $dir/enumer.js  $dir/player.js  $dir/snakegame.js  $dir/translate.js > app.game.js

printf "//Build Date : $(date -I'minutes')" >> app.min.js