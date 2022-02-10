status_of_cocossd = "";
objects = [];
var synth = window.speechSynthesis;
voices = synth.getVoices();

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
canvas.position(250,350)
    video.hide();
} 
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
object_name = document.getElementById("object_name").value;
}
function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }
function modelLoaded(){
    console.log("model loaded");
    status_of_cocossd = true;
}
function draw(){
    image(video, 0,0);
    if(status_of_cocossd != ""){
        objectDetector.detect(video, gotResult);
        
  
    r =  random(255);
    g =  random(255);
    b =  random(255);      
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           
            if(objects[i].label == object_name)
            {
              document.getElementById("number_of_objects").innerHTML = object_name + " Found";
              console.log("object found");
              var utterThis = new SpeechSynthesisUtterance(object_name + " Found.");
              synth.speak(utterThis);

            }
            else
            {
              document.getElementById("number_of_objects").innerHTML = "Object Not Found";
              console.log("not found"); 
            synth.cancel();

            }

        }
    }
}
