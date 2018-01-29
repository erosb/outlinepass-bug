var THREE = require("three");
var ColladaLoader = require("three-collada-loader-2");

var loader = new ColladaLoader();


var camera, scene, renderer;
var geometry, material, mesh, mixer, action, playFrom, playUntil;
var clock = new THREE.Clock(); 

var models = {
    "knight": "./knight/knight_low_collada.DAE",
    "scorpid": "./scorpid/scorpid_collada.DAE"
}

var modelId = document.location.search.substring(1);
var modelPath = models[modelId] || models.knight;
 
function init() {
    
    loader.load(modelPath, function ( collada ) {
        console.log(collada)
        var mesh = collada.scene;
        var sc = 0.15;
        mesh.scale.set(sc, sc, sc);
        mesh.position.z = -0.5;
        if (modelId === "scorpid") {
            mesh.rotation.z = Math.PI;
        }
        mixer = new THREE.AnimationMixer(mesh);
        action = mixer.clipAction(collada.animations[0]);
        scene.add( mesh );
                    
    });
 
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
 
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
}

function animate() {
 
    requestAnimationFrame( animate );
 
    renderer.render( scene, camera );
    
    if (mixer && playUntil) {
        var delta = clock.getDelta();
        
        if (clock.elapsedTime >= (playUntil - playFrom)) {
            console.log("stopping");
            action.stop();
            clock = new THREE.Clock(true);
            mixer.time = action.time = clock.time = playFrom;
            action.play();
        }
        mixer.update(delta);
    }
}

var anims = {};

anims.scorpid = {
    "walk": [0, 72],
    "strafe left": [72, 120],
    "strafe right": [120, 168],
    "attack 1": [168, 220],
    "death 1": [220, 292],
    "attack 2": [292, 350],
    "attack 3": [350, 440],
    "death 2": [440, 576],
    "death 3": [580, 650],
    "idle 1": [660, 760],
    "idle 2": [761, 849],
    "gethit 1": [850, 880],
    "gethit 2": [880, 950],
    "jump": [951, 1015]
}

window.playAnim = function(name) {
    var anim = anims[modelId][name];
    if (!anim) {
        console.error("not found", name);
        return;
    }
    var baseFPS=30.0;
    action.stop();
    clock = new THREE.Clock(true);
    action.time = mixer.time = clock.time = playFrom = anim[0] / baseFPS;
    playUntil = anim[1] / baseFPS;
    console.log(playFrom, playUntil);
    action.play();
    
}

init();
animate();
