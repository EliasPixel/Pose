let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    console.log(poses); // positie in console
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye; //recht oog
    let eyeL = pose.leftEye; //links oog
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    for (let i = 0; i < pose.keypoints.length; i++) {
      var x = pose.keypoints[i].position.x;//pos x
      var y = pose.keypoints[i].position.y;//pos y
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      var a = skeleton[i][0]; //elboog
      var b = skeleton[i][1]; //wrists 
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
      
       }
       
       
   
  }
}