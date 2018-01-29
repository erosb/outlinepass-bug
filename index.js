var THREE = require("three");
var ColladaLoader = require("three-collada-loader-2");

var loader = new ColladaLoader();


var camera, scene, renderer;
var geometry, material, mesh, mixer, action, playFrom, playUntil;
var clock = new THREE.Clock(); 

var models = {
    "knight": "./knight/knight_low_collada.DAE",
    "scorpid": "./scorpid/scorpid_collada.DAE",
    "battlerage": "./battlerage-elf/Elf-ranger_collada.DAE",
    "soulblade": "./soulblade-elf/elfranger_collada.DAE"
}

var modelId = document.location.search.substring(1);
var modelPath = models[modelId] || models.knight;
 
function init() {
    
    loader.load(modelPath, function ( collada ) {
        console.log(collada)
        var mesh = window.mesh = collada.scene;
        var sc = 0.15;
        if (modelId == "battlerage" || modelId == "soulblade") {
            sc = 0.5;
            mesh.position.y = -0.5;
        }
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
            action.stop();
            clock = new THREE.Clock(true);
            mixer.time = action.time = clock.time = playFrom;
            action.play();
        }
        mixer.update(delta);
    }
}

var anims = {};

anims.knight = {
    "T-pose": [0, 5],
    walk: [10, 80],
    walk_backwards: [90, 160],
    run: [170, 220],
    strafe_left: [230, 300],
    strafe_right: [300, 370],
    jump: [380, 430],
    attack_1: [440, 520],
    attack_2: [520, 615],
    attack_3: [615, 795],
    attack_4: [795, 850],
    attack_5: [850, 970],
    attack_6: [970, 1040],
    hit_1: [1040, 1080],
    hit_2: [1080, 1120],
    hit_3: [1120, 1160],
    death_1: [1160, 1260],
    death_2: [1270, 1370],
    idle_1: [1380, 1530],
    Idle_2: [1530, 1830],
    emotion_1: [1830, 1930],
    emotion_2: [1930, 2040]
}

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

anims.soulblade = {
    "T-pose": [1, 9],
    "Idle_01": [10, 140],
    "Idle_02": [140, 540],
    "Walk": [550, 590],
    "Walk_back": [595, 635],
    "strafe_right": [640, 680],
    "strafe_left": [680, 720],
    "Run": [730, 750],
    "Jump_run": [750, 785],
    "slide-stop": [785, 825],
    "jump_inplace": [825, 860],
    "death_1": [860, 910],
    "death_2": [920, 970],
    "hit_1": [980, 1000],
    "hit_2": [1000, 1020],
    "idle_combat": [1030, 1130],
    "action_1": [1130, 1170],
    "action_2": [1170, 1200],
    "action_3": [1200, 1230],
    "bow_draw": [1230, 1260],
    "idle_bow": [1260, 1360],
    "bow_action_1": [1360, 1410],
    "bow_action_2": [1410, 1445],
    "bow_withdraw": [1445, 1475],
    "sword_draw": [1480, 1510],
    "sword_idle": [1510, 1610],
    "sword_action_1": [1610, 1640],
    "sword_action_2": [1640, 1690],
    "sword_action_3": [1690, 1730],
    "sword_action_4": [1730, 1795],
    "sword_withdraw": [1780, 1820]    
};


anims.battlerage = {
    "T-pose": [1, 9],
    "Idle_01": [10, 140],
    "Idle_02": [140, 540],
    "Walk": [550, 590],
    "Walk_back": [595, 635],
    "strafe_right": [640, 680],
    "strafe_left": [680, 720],
    "Run": [730, 750],
    "Jump_run": [750, 785],
    "slide-stop": [785, 825],
    "jump_inplace": [825, 860],
    "death_1": [860, 910],
    "death_2": [920, 970],
    "hit_1": [980, 1000],
    "hit_2": [1000, 1020],
    "idle_combat": [1030, 1130],
    "action_1": [1130, 1170],
    "action_2": [1170, 1200],
    "action_3": [1200, 1230],
    "bow_draw": [1230, 1260],
    "idle_bow": [1260, 1360],
    "bow_action_1": [1360, 1410],
    "bow_action_2": [1410, 1445],
    "bow_withdraw": [1445, 1475],
    "sword_draw": [1480, 1510],
    "sword_draw": [1510, 1610],
    "sword_action_1": [1610, 1640],
    "sword_action_2": [1640, 1690],
    "sword_action_3": [1690, 1730],
    "sword_action_4": [1730, 1795],
    "sword_withdraw": [1780, 1820],

};

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
    action.play();
    
}

init();
animate();
