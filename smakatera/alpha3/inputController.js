class BaseInputController {
    constructor (snc){
        if(!snc instanceof SnakeController){
            throw "invalid instance: Not a SnakeController";
        }
        this.snakec = snc;
    }
    TurnLeft(){
        let current = this.snakec.GetDirection();
        if(current !==Directions.Left && current !==Directions.Right){
            this.snakec.UpdateDirection(Directions.Left);
        }
    }
    TurnRight(){
        let current = this.snakec.GetDirection();
        if(current !==Directions.Left && current !==Directions.Right){
            this.snakec.UpdateDirection(Directions.Right);
        }
    }
    TurnUp(){
        let current = this.snakec.GetDirection();
        if(current !==Directions.Up && current !==Directions.Down){
            this.snakec.UpdateDirection(Directions.Up);
        }
    }
    TurnDown(){
        let current = this.snakec.GetDirection();
        if(current !==Directions.Up && current !==Directions.Down){
            this.snakec.UpdateDirection(Directions.Down);
        }
    }
}

class KeyboardController extends BaseInputController {
    constructor(snc){
        super(snc);
    }
    Setup(){
        // document.body[on]("keydown",this.OnKeyDown.bind(this));
        document[on]("keydown",this.OnKeyDown.bind(this));
    }
    OnKeyDown(e){
        switch(e.key){
            case "ArrowUp" :
                super.TurnUp();
                break;
            case "ArrowRight":
                super.TurnRight();
                break;
            case "ArrowDown" :
                super.TurnDown();
                break;
            case "ArrowLeft":
                super.TurnLeft();
                break;
        }        
    }
}

class OnScreenArrowsController extends BaseInputController {
    constructor(snc){
        super(snc);
    }
    Setup(){
        query("#left_pad")[on]("click",this.OnArrowPress.bind(this));
        query("#right_pad")[on]("click",this.OnArrowPress.bind(this));
        query("#up_pad")[on]("click",this.OnArrowPress.bind(this));
        query("#down_pad")[on]("click",this.OnArrowPress.bind(this));
    }
    OnArrowPress(e){
        let direction = e.target.getAttribute("data-direction");
        // console.log(direction);
        switch(direction) {
            case "up" :
                super.TurnUp();
                break;
            case "right":
                super.TurnRight();
                break;
            case "down" :
                super.TurnDown();
                break;
            case "left":
                super.TurnLeft();
                break;
        }
    }
}