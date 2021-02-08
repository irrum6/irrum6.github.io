// not a clever enum implementation but I leave it there
class SnakeController{
    constructor(ctx){
        this.context = ctx;
        this.UpdateDirection(Directions.Left);
    }
    GetDirection(){
        return this.currentDirection;
    }
    UpdateDirection(d){
        if (!Directions.valid(d)){
            throw "Error: not a valid direction";
        }
        this.currentDirection = d;
    }
    Update(snake,game,food,canvas){
        // debugger;
        const poslen = snake.positions.length;        
        const current = this.GetDirection();
        const {velocity} = snake;       

        //follow head
        for (let i = poslen - 1; i > 0; i--) {
            snake.positions[i].x = snake.positions[i - 1].x;
            snake.positions[i].y = snake.positions[i - 1].y;
        }

        let {x,y} = snake.GetHeadPosition(snake);
        if (current == Directions.Right) { snake.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { snake.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { snake.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { snake.SetHeadPosition(null, y + velocity); }
        
        //free bound
        this.FreeBound(snake, game, canvas);
        {
            let { x, y } = snake.GetHeadPosition(snake);
            //eat food
            if (distance(x, y, food.x, food.y) < snake.radius * 2) {
                food.Renew(canvas);
                game.score++;
                snake.AddMass();
            }
        }
    }    
    FreeBound(snake,game,canvas){
        if (game.settings.freeBound !==true){
            this.BoundsCheck(snake,game,canvas);
            return;
        } //{return;}
        let { x, y } = snake.GetHeadPosition();
        if (x < 0) snake.SetHeadPosition(canvas.width,null);
        if (x > canvas.width) snake.SetHeadPosition(0,null);
        if (y < 0) snake.SetHeadPosition(null,canvas.height);
        if (y > canvas.height) snake.SetHeadPosition(null,0);
    }
    BoundsCheck(snake,game,canvas){
        let { x, y } = snake.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height){
            // debugger;
            game.gameover = true;
            game.score = 0;
            return;
        }
        for(let i=1,len = snake.positions.length;i<len;i++){
            let p= snake.positions[i];
            if (p.x == x && p.y == y){
                // debugger;
                game.gameover = true;
                // game.score = 0;
                return;
            }
        }
    
    }
}