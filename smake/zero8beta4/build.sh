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

rm app.preload.js
cat utils.js app.templates.js app.entities.js app.controls.js  app.game.js > app.preload.js
printf "//Build Date : $(date -I'minutes')" >> app.preload.js

echo `date -I'minutes'`