function gen_vel() {
    var possibs = [-6, -5, -4, -3, 3, 4, 5, 6];
    return possibs[Math.round(Math.random() * 7)];
}
class Ball {
    constructor(yval, xval, elem) {
        this.yval = yval;
        this.xval = xval;
        this.yvel = gen_vel();
        this.xvel = gen_vel();
        this.elem = elem;
        this.elem.classList.add('ball');
        document.body.appendChild(this.elem);
    }
    update() {
        this.yval += this.yvel;
        this.xval += this.xvel;
        this.elem.style.left = `${this.xval}px`;
        this.elem.style.top = `${this.yval}px`;
        if (this.yval <= 50 || this.yval >= visualViewport.height - 50) {
            this.yvel *= -1;
        }
        if (this.xval <= 50 || this.xval >= visualViewport.width - 50) {
            this.xvel *= -1;
        }
    }
}
var ball_list = [];
var mposx = 0;
var mposy = 0;

var click = document.getElementById('click');

document.addEventListener('mousemove', (event) => {
    mposx = event.clientX;
    mposy = event.clientY;
});
document.addEventListener('click', () => {
    try {
        document.body.removeChild(click);
        delete click;
    } catch (err) {
        console.log(err);
    }
    var newBall = new Ball(mposy, mposx, document.createElement('div'));
    ball_list.push(newBall);
});
function run() {
    setTimeout(() => {
        for (var i = 0; i < ball_list.length; i++) {
            ball_list[i].update();
        }
        run();
    }, 16);
}
run();
