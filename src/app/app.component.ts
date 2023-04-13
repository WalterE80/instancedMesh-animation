import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Clock,
  Vector3,
  VectorKeyframeTrack,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(30, 30, 20);
    scene.add(light);

    const light2 = new THREE.PointLight(0xffffff, 1);
    light2.position.set(-30, -30, -20);
    scene.add(light2);

    const clock = new Clock();
    const clip = this.setAnimation();
    const mixer = new AnimationMixer(cube);
    const action = mixer.clipAction(clip);
    //action.clampWhenFinished = true;
    action.loop = THREE.LoopPingPong;

    const animate = function () {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      controls.update();
      renderer.render(scene, camera);
    };

    camera.position.x = 15;
    camera.position.y = 15;
    camera.position.z = 15;
    renderer.render(scene, camera);
    animate();
    action.play();
  }

  setAnimation(): any {
    const times = [0, 5, 10];
    const positions = [5, 5, 5, 0, 0, 5, -5, 5, 5];

    const positionKF = new VectorKeyframeTrack('.position', times, positions);

    const tracks = [positionKF];
    const length = -1;

    const clip = new AnimationClip('cameraMove', length, tracks);
    clip.results;
    return clip;
  }
}
