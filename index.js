var THREE = require("three");
var ColladaLoader = require("three-collada-loader-2");

var loader = new ColladaLoader();


var camera, scene, renderer;
var geometry, material, mesh;
 
init();
animate();
 
function init() {
    
    loader.load( './knight/knight_low_collada.DAE', function ( collada ) {
        console.log(collada)
					var mesh = collada.scene;
                    var sc = 0.15;
                    mesh.scale.set(sc, sc, sc);
                    mesh.position.z = -0.5;
					mixer = new THREE.AnimationMixer(mesh);
					console.log(collada.animations);
                    mixer.update(0.1);
                    
                    
					mixer.clipAction(collada.animations[0]).play();

					/*object.traverse( function ( child ) {

						if ( child instanceof THREE.SkinnedMesh ) {

							var clip = THREE.AnimationClip.parseAnimation( child.geometry.animation, child.geometry.bones );
                            var action = mixer.clipAction( clip, child );
                            if (action != null)
                                action.play();

						}

					});*/

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
    if (mixer) mixer.update(0.1)
}
