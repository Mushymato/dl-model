import { PureComponent } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { fbxSource } from "./App";
import { CAM_PARAMS, DEFAULT_FACE_IDX } from "./consts";
import {
    directSetMatParams,
    matColorParams,
    materialCommonParams,
    materialExtraParams,
    incompatibleModels,
} from "./consts";
import {
    createInvisibleFloor,
    calculateTextureOffset,
    calculateIdxOffset,
    getModelPath,
    analyzeWeaponCode,
    analyzeChainCode,
    loadModel,
    applyEyeTexture,
    applyMouthTexture,
    applyEyeOffset,
    applyMouthOffset,
    disposeItem,
    createOutline,
    applyOutlineSettings,
    changeMaterial,
    createGradientMap,
    getFaceChangesArray,
} from "./viewerHelpers";

import { isBlade } from "./helpers";

class ModelViewer extends PureComponent {
    async componentDidMount() {
        window.app = this;
        this.initScene();
        this.props.setIsLoading(true);

        // Load the models
        const [main, weaponRight, weaponLeft] = await this.initLoad();

        // save references to models
        this.models = { main, weaponRight, weaponLeft };

        // basic viewer for incompatible assets
        const modelId = this.props.model.id;
        const isSimpleViewer =
            !modelId.startsWith("c") ||
            modelId.endsWith("_h") ||
            incompatibleModels.has(modelId);

        if (isSimpleViewer) {
            if (isBlade(modelId)) {
                const { materialType } = this.props.model;
                const { texturePath } = analyzeWeaponCode(`${modelId}n`);
                changeMaterial({ target: main, materialType, texturePath });
            }
            this.basicMainProcessing();
            // loading finished
            this.props.setIsLoading(false);
            return;
        }

        this.initMainModel();
        this.initAllWeapons();
        this.attachAllWeapons();

        this.applyMaterialSettings();

        // loading finished
        this.props.setIsLoading(false);

        // Add animation
        const { code: aniCode, timeScale } = this.props.animation;
        this.addAnimation(aniCode, timeScale);
    }

    async componentDidUpdate(prev) {
        const current = this.props;

        // // print updated props to console
        // console.log("Updated");
        // Object.keys(prev).forEach(key => {
        //     const oldValue = prev[key];
        //     const currentValue = this.props[key];
        //     const subkeys = Object.keys(oldValue);
        //     if (subkeys.length === 0 || typeof oldValue === "string") {
        //         if (oldValue !== currentValue) {
        //             console.log(
        //                 `${key}: ${JSON.stringify(
        //                     oldValue
        //                 )} to ${JSON.stringify(currentValue)}`
        //             );
        //         }
        //     } else {
        //         subkeys.forEach(subkey => {
        //             if (oldValue[subkey] !== currentValue[subkey]) {
        //                 console.log(
        //                     `${key}.${subkey}: ${JSON.stringify(
        //                         oldValue[subkey]
        //                     )} to ${JSON.stringify(currentValue[subkey])}`
        //                 );
        //             }
        //         });
        //     }
        // });

        this.updateViewport(prev.viewport, current.viewport);

        this.updateModel(prev.model, current.model);

        this.updateAnimation(prev.animation, current.animation);

        this.updateOutline(prev.outline, current.outline);

        this.updateMaterial(prev, current);

        this.updateLights(prev.lights, current.lights);

        this.updateAscii(prev.ascii, current.ascii);

        // Update background color
        if (prev.bgColor !== current.bgColor) {
            this.bgColor = current.bgColor;
        }

        // Capture
        if (current.capture.enable && !prev.capture.enable) {
            this.captureAnimation();
        }

        // Update Anti Aliasinng
        this.AA = current.antiAliasing;
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        disposeItem(this.scene);
        this.mixer = null;
        this.clock = null;
        this.camera = null;
        this.controls = null;
        this.scene = null;
        this.renderer = null;
        this.rendererAA.renderLists.dispose();
        this.rendererAA.dispose();
        this.rendererAA = null;
        this.rendererNoAA.renderLists.dispose();
        this.rendererNoAA.dispose();
        this.rendererNoAA = null;
    }

    // set up initial scene
    initScene = () => {
        this.models = {};
        this.modelInfo = {
            main: this.props.model.id,
            weaponLeft: analyzeWeaponCode(this.props.model.weaponLeft),
            weaponRight: analyzeWeaponCode(this.props.model.weaponRight),
        };
        this.materials = [];

        // save reference and specifications for outlines
        this.outlines = {};
        this.outlineParams = { ...this.props.outline };

        // viewport
        this.viewport = this.props.viewport || {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        // clock
        this.clock = new THREE.Clock();

        // Scene
        this.scene = new THREE.Scene();
        this.bgColor = this.props.bgColor;

        // Floor for auto rotate
        this.floor = createInvisibleFloor();
        this.scene.add(this.floor);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            CAM_PARAMS.angle,
            this.viewport.width / this.viewport.height,
            CAM_PARAMS.near,
            CAM_PARAMS.far
        );
        this.cameraPosition = this.props.cameraPosition || [2, 0, 10];
        this.camera.position.set(...this.cameraPosition);
        this.camera.updateProjectionMatrix();

        // Controls
        this.controls = new OrbitControls(this.camera, this.mount);
        this.controlsPosition = this.props.controlsPosition || [0, 0, 0];
        this.controls.target.set(...this.controlsPosition);
        this.controls.update();

        // Light
        const { lights } = this.props;
        this.addLights(lights);

        // effects
        this.fxConstructors = new Map();

        // Renderer
        this.rendererAA = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.rendererAA.outputEncoding = THREE.sRGBEncoding;

        this.rendererNoAA = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
        });
        this.rendererNoAA.outputEncoding = THREE.sRGBEncoding;

        const AAEnabled = this.props.antiAliasing;
        this._AA = AAEnabled;

        this.renderer = AAEnabled ? this.rendererAA : this.rendererNoAA;

        this.finalRenderer = this.renderer;
        this.canvas = this.finalRenderer.domElement;
        this.finalRenderer.setSize(this.viewport.width, this.viewport.height);
        this.mount.appendChild(this.canvas);

        this.animate();
    };

    set AA(enabled) {
        if (enabled === this._AA) return;
        this._AA = enabled;

        const currentSize = new THREE.Vector2();
        this.renderer.getSize(currentSize);
        // switch renderer
        this.renderer = enabled ? this.rendererAA : this.rendererNoAA;
        this.renderer.setSize(currentSize.x, currentSize.y);

        if (this.props.ascii.enable) return;

        this.finalRenderer = this.renderer;

        const { canvas } = this;
        const newCanvas = this.renderer.domElement;
        this.replaceCanvas(canvas, newCanvas);
        this.canvas = newCanvas;
    }

    addLights = lights => {
        this.lights = [];
        lights.forEach(({ enable, type, color, intensity, ...params }) => {
            if (!enable) return;
            const constructor = `${type}Light`;
            const light = new THREE[constructor](color, intensity);

            for (const [key, value] of Object.entries(params)) {
                switch (key) {
                    case "position":
                        const setValue = value.map(v => v || 0);
                        light.position.set(...setValue);
                        break;
                    default:
                        light[key] = value;
                }
            }
            this.scene.add(light);
            this.lights.push(light);
        });
    };

    removeLights = () => this.lights.forEach(light => this.scene.remove(light));

    // Promise to load all models at initialize
    initLoad = () => {
        const modelId = this.modelInfo.main;
        const modelPath = getModelPath(modelId);
        const loadMain = loadModel(modelPath);

        const weaponRight = this.modelInfo.weaponRight?.modelPath;
        const loadWeaponR = loadModel(weaponRight);

        const weaponLeft = this.modelInfo.weaponLeft?.modelPath;
        const loadWeaponL = loadModel(weaponLeft);

        return Promise.all([loadMain, loadWeaponR, loadWeaponL]);
    };

    addToScene = model => this.floor.add(model);

    basicMainProcessing = () => {
        const model = this.models.main;
        // Add outline
        this.outlines.main = createOutline(model, this.outlineParams);
        // change material type
        const { materialType } = this.props.model;
        changeMaterial({ target: model, materialType });

        this.addToScene(model);
    };

    initMainModel = () => {
        const model = this.models.main;
        // Basic processing
        this.basicMainProcessing();
        this.initFace();
        // Save initial position and rotation
        model.initPos = model.position.clone();
        model.initRot = model.rotation.clone();
    };

    initFace = () => {
        const modelId = this.props.model.id;
        this._eyeIdx = this._mouthIdx = DEFAULT_FACE_IDX;
        const defaultFaceParams = {
            mouthTexture: modelId,
            mouthIdx: DEFAULT_FACE_IDX,
            eyeTexture: modelId,
            eyeIdx: DEFAULT_FACE_IDX,
        };
        this.updateFace(defaultFaceParams, this.props.model);
    };

    initAllWeapons = () => {
        const { materialType } = this.props.model;
        ["Right", "Left"].forEach(side => {
            const key = `weapon${side}`;
            const weaponModel = this.models[key];
            if (!weaponModel) return;

            const weaponInfo = this.modelInfo[key];
            const { texturePath, flipped } = weaponInfo;
            changeMaterial({
                target: weaponModel,
                materialType,
                texturePath,
            });
            // flip weapon if needed
            if (flipped) weaponModel.rotation.y += Math.PI;
            // add outline
            this.outlines[key] = createOutline(weaponModel, this.outlineParams);
        });
    };

    attachWeapon = (weapon, side) => {
        const boneName = `jWeapon${side[0]}`;
        this.models.main.traverse(child => {
            if (child.name === boneName && child.children.length === 0) {
                child.add(weapon);
            }
        });
    };

    attachAllWeapons = () => {
        ["Right", "Left"].forEach(side => {
            const key = `weapon${side}`;
            const weapon = this.models[key];
            if (!weapon) return;

            this.attachWeapon(weapon, side);
        });
    };

    detachWeapon = side => {
        const key = `weapon${side}`;
        const model = this.models[key];
        if (!model) return;
        model.parent.remove(model);
    };

    detachAllWeapons = () =>
        ["Right", "Left"].forEach(side => this.detachWeapon(side));

    playNextAni = () => {
        const { nAni } = this;
        // if capturing and finished recording current chain, stop capturing and set capture flag back to false
        const finishedRecording =
            this.props.capture.enable && this._aniIdx === nAni - 1;
        if (finishedRecording) {
            this.mediaRecorder.stop();
            this.props.toggleCapture();
        }
        const newIdx = (this._aniIdx + 1) % nAni;
        this.aniIdx = newIdx;
    };

    addAnimation = async (aniCode, timeScale) => {
        if (!aniCode) return;

        const model = this.models.main;
        const [fileList, animationList] = analyzeChainCode(aniCode);
        this.nAni = animationList.length;

        this.props.setIsLoading(true);

        model.mixer = new THREE.AnimationMixer(model);
        this.mixer = model.mixer;

        this._aniIdx = 0;
        model.mixer.timeScale = timeScale; // Global timeScale
        model.mixer.addEventListener("finished", this.playNextAni);
        this.aniSettings = animationList.map(ani => ({
            timeScale: ani.timeScale,
            repetitions: ani.repetitions,
            faceChanges: ani.faceChanges,
        }));

        const batchLoader = fileList.map(file => {
            const path = `${fbxSource}/fbx/${file}.fbx`;
            return loadModel(path);
        });

        // load all animation files
        const animFiles = await Promise.all(batchLoader);

        this.animations = [];
        animationList.forEach(anim => {
            const { fileIdx, aniName } = anim;
            const animation = aniName
                ? animFiles[fileIdx].animations.find(
                      ani => ani.name === aniName
                  )
                : animFiles[fileIdx].animations[0];
            this.animations.push(animation);
        });
        // play first animation
        this.aniIdx = 0;
        this.props.setIsLoading(false);
    };

    // this.aniIdx = n => play animation with index n
    set aniIdx(newIdx) {
        this._aniIdx = newIdx;
        const { mixer } = this;
        const anim = this.animations[newIdx];
        mixer.stopAllAction();
        const action = mixer.clipAction(anim);
        const currentAniSettings = this.aniSettings[newIdx];
        const { timeScale, repetitions, faceChanges } = currentAniSettings;
        this.faceChanges = getFaceChangesArray(faceChanges, repetitions);

        action.setLoop(THREE.LoopRepeat, repetitions);
        action.clampWhenFinished = true;
        action.timeScale = timeScale;
        action.time = 0;

        mixer.setTime(0);
        this.currentClipDuration = anim.duration;
        action.play();
    }

    updateViewport = (prev, current) => {
        const { width, height } = current;
        if (prev.width === width && prev.height === height) return;

        this.finalRenderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    captureAnimation = () => {
        this.chunks = [];
        this.videoStream = this.canvas.captureStream(30);

        if (!this.mediaRecorder) {
            this.mediaRecorder = new MediaRecorder(this.videoStream, {
                mimeType: this.props.capture.codec,
            });
            this.mediaRecorder.ondataavailable = event =>
                this.chunks.push(event.data);
            this.mediaRecorder.onstop = () => {
                this.props.setIsLoading(false);
                const superBuffer = new Blob(this.chunks, {
                    type: "video/webm",
                });
                var url = URL.createObjectURL(superBuffer);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = "animation.webm";
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }
        // disable user input
        this.props.setIsLoading(true);
        // Reset facial expression
        this.eyeIdx = this.props.model.eyeIdx;
        this.mouthIdx = this.props.model.mouthIdx;
        // play first animation and start capturing
        this.aniIdx = 0;
        this.mediaRecorder.start();
    };

    updateEyeTexture = (prev, current) => {
        const currentTexture = current.eyeTexture;
        const prevTexture = prev.eyeTexture;

        if (currentTexture === prevTexture) return false;

        const { materialType } = current;
        applyEyeTexture({
            target: this.models.main,
            materialType,
            textureId: currentTexture,
        });
        const offset = calculateTextureOffset(currentTexture, prevTexture);
        applyEyeOffset({
            target: this.models.main,
            offset,
        });
        return true;
    };

    set eyeIdx(newIdx) {
        if (!newIdx) return;

        const oldIdx = this._eyeIdx;
        if (newIdx === oldIdx) return;

        const offset = calculateIdxOffset(newIdx, oldIdx);
        applyEyeOffset({
            target: this.models.main,
            offset,
        });
        this._eyeIdx = newIdx;
    }

    updateMouthTexture = (prev, current) => {
        const currentTexture = current.mouthTexture;
        const prevTexture = prev.mouthTexture;

        if (currentTexture === prevTexture) return false;

        const { materialType } = current;
        applyMouthTexture({
            target: this.models.main,
            materialType,
            textureId: currentTexture,
        });
        const offset = calculateTextureOffset(currentTexture, prevTexture);
        applyMouthOffset({
            target: this.models.main,
            offset,
        });
        return true;
    };

    set mouthIdx(newIdx) {
        if (!newIdx) return;

        const oldIdx = this._mouthIdx;
        if (newIdx === oldIdx) return;

        const offset = calculateIdxOffset(newIdx, oldIdx);
        applyMouthOffset({
            target: this.models.main,
            offset,
        });
        this._mouthIdx = newIdx;
    }

    updateFaceTexture = (prev, current) => {
        const eyeUpdate = this.updateEyeTexture(prev, current);
        const mouthUpdate = this.updateMouthTexture(prev, current);
        if (eyeUpdate || mouthUpdate) {
            this.applyMaterialSettings();
        }
    };

    updateFaceOffset = current => {
        this.eyeIdx = current.eyeIdx;
        this.mouthIdx = current.mouthIdx;
    };

    updateFace = (prev, current) => {
        this.updateFaceTexture(prev, current);
        this.updateFaceOffset(current);
    };

    updateMainModel = async (prev, current) => {
        const modelId = current.id;
        if (prev.id !== modelId) {
            this.props.setIsLoading(true);
            const modelPath = getModelPath(modelId);
            // load new model
            const model = await loadModel(modelPath);

            this.detachAllWeapons();

            // remove and dispose old model
            this.floor.remove(this.models.main);
            disposeItem(this.models.main);

            this.models.main = model;

            this.initMainModel();

            this.attachAllWeapons();

            this.applyMaterialSettings();

            // Add animation to new model
            const { code: aniCode, timeScale } = this.props.animation;
            this.addAnimation(aniCode, timeScale);

            this.props.setIsLoading(false);
            return;
        }
        // Update face when main model not changed
        this.updateFace(prev, current);
    };

    updateWeapons = async (prev, current) => {
        ["Right", "Left"].forEach(async side => {
            const key = `weapon${side}`;
            // if not changed, return
            if (prev[key] === current[key]) return;
            // Update weapon
            this.detachWeapon(side); // remove old weapon
            disposeItem(this.models[key]); // dispose old weapon
            // if current weapon is empty (weapon removed)
            if (!current[key]) {
                this.models[key] = null;
                this.modelInfo[key] = "";
                // remove reference to outline
                this.outlines[key] = null;
                return;
            }
            // load new weapon
            this.props.setIsLoading(true);

            this.modelInfo[key] = analyzeWeaponCode(this.props.model[key]);
            const { modelPath, texturePath } = this.modelInfo[key];

            // load new model
            const model = await loadModel(modelPath);
            this.models[key] = model;

            // process new weapon
            const { materialType } = current;
            changeMaterial({
                target: this.models[key],
                materialType,
                texturePath,
            });

            if (this.modelInfo[key].flipped) {
                this.models[key].rotation.y = Math.PI;
            }
            // add outline to new weapon
            this.outlines[key] = createOutline(model, this.outlineParams);
            // attach new weapon to main model
            this.attachWeapon(model, side);

            this.applyMaterialSettings();

            this.props.setIsLoading(false);
        });
    };

    updateModel = async (prev, current) => {
        const updated = Object.keys(prev).some(
            key => prev[key] !== current[key]
        );
        if (!updated) return;

        await this.updateMainModel(prev, current);
        this.updateWeapons(prev, current);
    };

    updateAnimation = (prev, current) => {
        const { code, timeScale } = current;
        if (prev.code !== code) {
            const mainModel = this.models.main;
            if (prev.code) {
                mainModel.mixer.stopAllAction();

                // Reset position and rotation to initial value
                const { initPos, initRot } = mainModel;
                mainModel.position.copy(initPos);
                mainModel.rotation.copy(initRot);

                // Reset facial expression
                this.eyeIdx = this.props.model.eyeIdx;
                this.mouthIdx = this.props.model.mouthIdx;

                this.mixer = null;
                this.animations = [];
            }
            // Add new animation
            this.addAnimation(code, timeScale);
            return;
        }
        // Update timeScale if animation not changed
        if (prev.timeScale !== timeScale) {
            this.mixer.timeScale = timeScale;
        }
    };

    updateOutlineParams = update => {
        const keys = Object.keys(this.outlines).filter(
            key => this.outlines[key]
        );
        const outlines = keys.map(key => this.outlines[key]).flat();
        outlines.forEach(outline => {
            applyOutlineSettings(outline, update);
        });
    };

    updateOutline = (prev, current) => {
        if (prev === current) return;

        this.outlineParams = current;
        const updatedKeys = Object.keys(current).filter(
            key => prev[key] !== current[key]
        );
        if (updatedKeys.length === 0) return;

        const update = new Map(updatedKeys.map(key => [key, current[key]]));
        this.updateOutlineParams(update);
    };

    saveMaterialReference = () => {
        this.materials = [];
        const mainModel = this.models.main;
        mainModel.traverse(child => {
            if (!child.isMesh || child.name === "outline") return;

            const { material } = child;

            if (Array.isArray(material)) {
                this.materials = this.materials.concat(material);
                return;
            }
            this.materials.push(material);
        });
    };

    applyMaterialParams = () => {
        const { materialType } = this.props.model;
        const current = this.props.materialParams;
        const { materials } = this;
        const paramsList = [
            ...materialCommonParams,
            ...materialExtraParams[materialType],
        ];

        materials.forEach(mat => {
            directSetMatParams.forEach(param => {
                if (!paramsList.includes(param)) return;
                mat[param] = current[param];
            });

            matColorParams.forEach(param => {
                if (!paramsList.includes(param)) return;
                const currentColor = current[param];
                const matColor = new THREE.Color(currentColor);
                mat[param] = matColor;
            });

            if (!current.useTexture) {
                if (mat.map) mat.backupMap = mat.map;
                mat.map = null;
            }

            if (current.flatShading) {
                mat.flatShading = current.flatShading;
                mat.needsUpdate = true;
            }

            if (materialType === "Toon" && current.gradientMap !== "none") {
                let newMap = null;
                const nTones = parseInt(current.gradientMap);
                newMap = createGradientMap(nTones);

                materials.forEach(mat => {
                    mat.gradientMap = newMap;
                    mat.needsUpdate = true;
                });
            }
        });
    };

    applyMaterialSettings = () => {
        this.saveMaterialReference();
        this.applyMaterialParams();
    };

    updateMaterialParams = (prev, current) => {
        const { materialType } = this.props.model;
        const { useTexture, flatShading, gradientMap } = current;
        const { materials } = this;
        const paramsList = [
            ...materialCommonParams,
            ...materialExtraParams[materialType],
        ];

        directSetMatParams.forEach(param => {
            if (!paramsList.includes(param) || prev[param] === current[param])
                return;
            materials.forEach(mat => (mat[param] = current[param]));
        });

        matColorParams.forEach(param => {
            if (!paramsList.includes(param) || prev[param] === current[param])
                return;
            const currentColor = current[param];
            const matColor = new THREE.Color(currentColor);
            materials.forEach(mat => (mat[param] = matColor));
        });

        if (prev.useTexture !== useTexture) {
            if (!useTexture) {
                materials.forEach(mat => {
                    mat.backupMap = mat.map;
                    mat.map = null;
                    mat.needsUpdate = true;
                });
            } else {
                materials.forEach(mat => {
                    mat.map = mat.backupMap;
                    delete mat.backupMap;
                    mat.needsUpdate = true;
                });
            }
        }

        if (prev.flatShading !== flatShading) {
            materials.forEach(mat => {
                mat.flatShading = flatShading;
                mat.needsUpdate = true;
            });
        }

        if (prev.gradientMap !== gradientMap) {
            let newMap = null;
            if (gradientMap !== "none") {
                const nTones = parseInt(gradientMap);
                newMap = createGradientMap(nTones);
            }

            materials.forEach(mat => {
                mat.gradientMap = newMap;
                mat.needsUpdate = true;
            });
        }
    };

    updateMaterial = (prev, current) => {
        // update material type
        if (prev.model.materialType !== current.model.materialType) {
            const { materialType } = current.model;
            changeMaterial({ target: this.models.main, materialType });

            this.applyMaterialSettings();
            return;
        }

        this.updateMaterialParams(prev.materialParams, current.materialParams);
    };

    updateLights = (prev, current) => {
        if (prev !== current) {
            this.removeLights();
            this.addLights(current);
        }
    };

    updateAscii = async (prev, current) => {
        const updated = Object.keys(prev).some(
            key => prev[key] !== current[key]
        );
        if (!updated) return;

        const { enable } = current;
        if (!enable) {
            this.finalRenderer = this.renderer;
            const { canvas } = this;
            const newCanvas = this.renderer.domElement;
            this.replaceCanvas(canvas, newCanvas);
            this.canvas = newCanvas;
            return;
        }

        if (!this.fxConstructors.has("ascii")) {
            const { AsciiEffect } = await import(
                "three/examples/jsm/effects/AsciiEffect"
            );
            this.fxConstructors.set("ascii", AsciiEffect);
            this.showAscii();
        } else this.showAscii();

        this.finalRenderer.setSize(this.viewport.width, this.viewport.height);
    };

    showAscii = () => {
        const { charSet, color, bgColor, invert } = this.props.ascii;
        const AsciiEffect = this.fxConstructors.get("ascii");

        this.effect = new AsciiEffect(this.renderer, charSet, { invert });
        this.effect.setSize(this.viewport.width, this.viewport.height);

        const newCanvas = this.effect.domElement;
        const currentCanvas = this.canvas;
        newCanvas.style.color = color;
        newCanvas.style.background = bgColor;

        this.replaceCanvas(currentCanvas, newCanvas);
        this.canvas = newCanvas;
        this.finalRenderer = this.effect;
    };

    set bgColor(color) {
        this.scene.background =
            color !== "transparent" ? new THREE.Color(color) : null;
    }

    replaceCanvas = (oldCanvas, newCanvas) => {
        this.mount.removeChild(oldCanvas);
        this.mount.appendChild(newCanvas);
    };

    animate = () => {
        this.frameId = requestAnimationFrame(this.animate);
        const dt = this.clock.getDelta();
        // Rotate the floor
        const { rotateSpeed } = this.props;
        if (rotateSpeed) this.floor.rotateY((rotateSpeed * dt * Math.PI) / 2);

        if (this.mixer) this.mixer.update(dt);

        if (this.faceChanges && this.faceChanges.length > 0) {
            const elapsedTime = this.mixer.time;
            const nextFaceChangeTime =
                (this.faceChanges[0].time * this.currentClipDuration) / 100;
            if (elapsedTime >= nextFaceChangeTime) {
                const currentFaceChange = this.faceChanges.shift();
                const { eyeIdx, mouthIdx } = currentFaceChange;
                this.eyeIdx = eyeIdx;
                this.mouthIdx = mouthIdx;
            }
        }

        this.finalRenderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div
                ref={el => {
                    this.mount = el;
                }}
            />
        );
    }
}

export default ModelViewer;
