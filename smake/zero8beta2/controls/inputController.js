class BaseController {
    constructor(){}
    Left(p){
        if(!p instanceof Player){
            throw "BaseController.Left():incorrect Object"
        }
        p.TurnLeft();
    }
    Right(p){
        if(!p instanceof Player){
            throw "BaseController.Right():incorrect Object"
        }
        p.TurnRight();
    }
    Up(p){
        if(!p instanceof Player){
            throw "BaseController.Up():incorrect Object"
        }
        p.TurnUp();
    }
    Down(p){
        if(!p instanceof Player){
            throw "BaseController.Down():incorrect Object"
        }
        p.TurnDown();
    }
}

class ArrowsController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "ArrowUp":
                super.Up(p);
                break;
            case "ArrowLeft":
                super.Left(p);
                break;
            case "ArrowDown":
                super.Down(p);
                break;
            case "ArrowRight":
                super.Right(p);
                break;
        }
    }
}
class WasdController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "w":
            case "W":
                super.Up(p);
                break;
            case "a":
            case "A":
                super.Left(p);
                break;
            case "s":
            case "S":
                super.Down(p);
                break;
            case "d":
            case "D":
                super.Right(p);
                break;
        }
    }
}

class NumpadController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "8":
                super.Up(p);
                break;
            case "4":
                super.Left(p);
                break;
            case "5":
                super.Down(p);
                break;
            case "6":
                super.Right(p);
                break;
        }
    }
}

class UhjkController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "u":
            case "U":
                super.Up(p);
                break;
            case "h":
            case "H":
                super.Left(p);
                break;
            case "j":
            case "J":
                super.Down(p);
                break;
            case "k":
            case "K":
                super.Right(p);
                break;
        }
    }
}
//