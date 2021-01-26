// not a clever enum implementation but I leave it there
const Directions = {
    Left:1,
    Right:2,
    Up:3,
    Down:4,
    valid: function (d) {
        return d === this.Left || d === this.Right || d === this.Up || d === this.Down;
    }
};
Object.freeze(Directions);

class SnakeController{
    constructor(_snake,ctx,m){
        if (!_snake instanceof Snake) {
            throw "invalid instance: Not a Snake";
        }
        this.context = ctx;
        this.mode = m;
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
        let {x,y} = snake.GetHeadPosition(snake);
        if (current == Directions.Right) { snake.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { snake.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { snake.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { snake.SetHeadPosition(null, y + velocity); }

        //follow head
        for(let i = poslen-1;i>0;i--){
            snake.positions[i].x= snake.positions[i-1].x;
            snake.positions[i].y= snake.positions[i-1].y;
        }

        let x1 = snake.positions[0].x;
        let y1 = snake.positions[0].y;
        //eat food
        if(distance(x1,y1,food.x,food.y)<snake.radius*2){
            food.Renew(canvas);
            game.score++;
            snake.AddMass();
        }
        //free bound
        this.FreeBound(snake,game,canvas);
    }    
    FreeBound(snake,game,canvas){
        if (game.settings.free_bound !==true); //{return;}
        let { x, y } = snake.GetHeadPosition();
        if (x < 0) snake.SetHeadPosition(canvas.width,null);
        if (x > canvas.width) snake.SetHeadPosition(0,null);
        if (y < 0) snake.SetHeadPosition(null,canvas.height);
        if (y > canvas.height) snake.SetHeadPosition(null,0);
    }
}