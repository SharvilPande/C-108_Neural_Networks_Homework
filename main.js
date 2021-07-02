prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 355,
    height: 355,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("live").value;

Webcam.attach('#live');

function take_picture() {
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML="<img id='picture' src='"+data_uri+"'>";
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JE8gGVcHG/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first gesture prediction is" + prediction_1;
    speak_data_2 = "And the second gesture prediction is" + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(UtterThis);
}

function identify() {
    img = document.getElementById("picture");
    classifier.classify(img , gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_name_1").innerHTML = result[0].label;
        document.getElementById("result_name_2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if (result[0].label == "Thumbs Up") {
            document.getElementById("result_emoji_1").innerHTML = "&#128077;";
        }
        if (result[0].label == "Rock N' Roll") {
            document.getElementById("result_emoji_1").innerHTML = "&#129304;";
        }
        if (result[0].label == "Hello") {
            document.getElementById("result_emoji_1").innerHTML = "&#128075;";
        }
        if (result[0].label == "Peace") {
            document.getElementById("result_emoji_1").innerHTML = "&#9996;";
        }
        if (result[0].label == "Classic") {
            document.getElementById("result_emoji_1").innerHTML = "&#128076;";
        }
        if (result[1].label == "Thumbs Up") {
            document.getElementById("result_emoji_2").innerHTML = "&#128077;";
        }
        if (result[1].label == "Rock N' Roll") {
            document.getElementById("result_emoji_2").innerHTML = "&#129304;";
        }
        if (result[1].label == "Hello") {
            document.getElementById("result_emoji_2").innerHTML = "&#128075;";
        }
        if (result[1].label == "Peace") {
            document.getElementById("result_emoji_2").innerHTML = "&#9996;";
        }
        if (result[1].label == "Classic") {
            document.getElementById("result_emoji_2").innerHTML = "&#128076;";
        }
    }
}


       
