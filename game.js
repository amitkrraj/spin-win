let prizes_config={
    count:12,
    prize_names:["3000 Credits","35% OFF","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% OFF","Amazon Voucher","2 Extra Spin","CB T-Shirt","CB Book"]
}
let stope=true;

let musicConfig = {
    mute:false,
    volume:0.5,
    rate:1,
    detune:0,
    seek:0,
    loop:false,
    duration:6000,
    
}

let config={
    type : Phaser.AUTO,
    width : 620,
    height : 300,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,  //Map with preload function
        create : create,
        update : update,
    }
    
}; 
    
let game = new Phaser.Game(config);

//when a particular scene is getting started, this function is called only once
function preload(){
    this.load.image('background','back.jpg');
    this.load.image('wheel','wheel.png');
    this.load.image('pin','pin.png');
    this.load.image('stand','stand.png');
    this.load.audio('audio','track.mp3');
}

function create(){
    console.log(this);
    
//background image setting
    
    let w=game.config.width;
    let h=game.config.height;
    bg = this.add.sprite(300,250,'background');
    bg.setPosition(w/2,h/2);
    bg.setScale(.2);
    
//wheel image
    
    wheel=this.add.sprite(w/2,h/2+25,'wheel');
    wheel.setScale(.09);
    wheel.depth=1;
    wheel.angle-=0.5;
    
//pin
    let pin = this.add.sprite(w/2,75,'pin');
    pin.setScale(.15);
    pin.depth=1;
    
//stand
    let stand=this.add.sprite(w/2,281,'stand');
    stand.setScale(.115);
    stand.depth=0;
    
    
//audio
    audio=this.sound.add('audio');
  
//event listner
    if(stope){
        this.input.on('pointerdown',spinwheel,this)
    }
window.stope=false;    
    
//text object creating
    font_style={
        font:"bold 30px Elephant",
        align:"center",
        color:"red",
    }
    msg=this.add.text(140,12,'Welcome To Spin-Win',font_style);
}


//game loop
function update(){
    console.log("inside update");
    bg.angle+=1;
}

function spinwheel(){
    msg.setText("Spinning Started Just Wait");
    audio.play(musicConfig);
    
    let rounds=Phaser.Math.Between(3,4);
    let degrees=Phaser.Math.Between(0,11)*30;
    let total_angle=rounds*360 + degrees;
    
    idx=prizes_config.count - 1- Math.floor(degrees/(360/prizes_config.count));
    
    tween=this.tweens.add({
        targets:wheel,
        angle: total_angle,
        ease : "Cubic.easeOut",
        duration:6000,
        onComplete:function(){
            msg.setText("         "+prizes_config.prize_names[idx]);
            
        },
    });
}