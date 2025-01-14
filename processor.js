let video;
let img;
let poseNet;
let pose;
let pixelsGrid = []




function setup() {
  createCanvas(620, 440);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}


console.log('pixels grid loaded')


function gotPoses(poses) {
  if (poses.length > 0) {
      pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}


function draw() {
  // background(VIDEO);
  
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);

  let spacing = 3
  noStroke()
  if (video) {

    // image(capture.get(),0,0)

    console.log('video available')

    for (var x = 0; x < video.width; x += spacing) {

        for (var y = 0; y < video.height; y += spacing) {

            let col = video.get(x, y)

            let dx = x - mouseX
            let dy = y - mouseY

            let offX = dx / 5
            let offY = dy / 5

            let d = dist(mouseX, mouseY, x, y)

            let radius = width/5

            if (d < radius) {

                let alpha = (1-d/radius)*255

                let circleRadius = (1-d/radius)*50

                // stroke(255)

                fill(brightness(col)*2,alpha)
                circle(x + offX+cx, y + offY + sin(frameCount/100)*height/4, circleRadius)



            }
          }
        }
      }
      
  
   if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

        //Outer Eye
        fill(0);
        ellipse(eyeR.x,eyeR.y,d/2, (d/2));
        ellipse(eyeL.x,eyeR.y,d/2, d/2);

        // Inner Eye
        fill(255);
        ellipse(eyeR.x + 8,eyeR.y + 8, d/15, d/15);
        ellipse(eyeR.x - 8,eyeR.y - 8, d/15, d/15);
        ellipse(eyeR.x - 8,eyeR.y + 8, d/15, d/15);
        ellipse(eyeR.x + 8,eyeR.y - 8, d/15, d/15);

        ellipse(eyeL.x + 8,eyeR.y + 8, d/15, d/15);
        ellipse(eyeL.x - 8,eyeR.y - 8, d/15, d/15);
        ellipse(eyeL.x - 8,eyeR.y + 8, d/15, d/15);
        ellipse(eyeL.x + 8,eyeR.y - 8, d/15, d/15);

  
    }

}
  

 