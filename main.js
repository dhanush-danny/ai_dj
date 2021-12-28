song = "";

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on("pose", get_result);
}

function model_loaded() {
    console.log("model loadel successfuly")
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("black");
    if (left_wrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        left_wrist_y_volume = floor(Number(left_wrist_y));
        Volume_value = (left_wrist_y / 500).toFixed(1);
        console.log(Volume_value);
        song.setVolume(Volume_value);
        document.getElementById("volume").innerHTML = "Volume : " + Volume_value;
    }
    if (right_wrist_score >= 0.1) {
        circle(right_wrist_x, right_wrist_y, 20);
        if (right_wrist_y > 0 && right_wrist_y <= 100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed : 0.5x";
        }
        else if (right_wrist_y > 100 && right_wrist_y <= 200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed : 1x";
        }

        else if (right_wrist_y > 200 && right_wrist_y <= 300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed : 2x";
        }

        else if (right_wrist_y > 300 && right_wrist_y <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed : 3x";
        }

        else if (right_wrist_y > 400 && right_wrist_y <= 500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed : 3x";
        }

    }
}

left_wrist_x = "";
left_wrist_y = "";
right_wrist_x = "";
right_wrist_y = "";
left_wrist_score = "";
right_wrist_score = "";

function get_result(pose_array) {
    if (pose_array.length > 0) {
        left_wrist_x = pose_array[0].pose.leftWrist.x;
        left_wrist_y = pose_array[0].pose.leftWrist.y;
        right_wrist_x = pose_array[0].pose.rightWrist.x;
        right_wrist_y = pose_array[0].pose.rightWrist.y;
        left_wrist_score = pose_array[0].pose.leftWrist.confidence;
        right_wrist_score = pose_array[0].pose.rightWrist.confidence;
    }

}

function play_music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("play_song").style.display = "none";
    document.getElementById("pause").style.display = "inline-block";
}

function pause_music() {
    song.pause();
    document.getElementById("pause").style.display = "none";
    document.getElementById("play_song").style.display = "inline-block";
}