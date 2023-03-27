import * as Kalidokit from "kalidokit";
import { rigRotation, rigPosition, rigFace } from './rig'

/* VRMモデルを動かす関数 */
export const animateVRM = (vrm, results, videoElement) => {
    if (!vrm) {
        return;
    }
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;

    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;

    // Animate Face
    if (faceLandmarks) {
        riggedFace = Kalidokit.Face.solve(faceLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        });
        rigFace(vrm, riggedFace);
    }

    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
        riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        });
        rigRotation(vrm, "Hips", riggedPose.Hips.rotation, 0.7);
        rigPosition(
            vrm,
            "Hips",
            {
                x: riggedPose.Hips.position.x, // Reverse direction
                y: riggedPose.Hips.position.y + 1, // Add a bit of height
                z: -riggedPose.Hips.position.z, // Reverse direction
            },
            1,
            0.07
        );

        rigRotation(vrm, "Chest", riggedPose.Spine, 0.25, 0.3);
        rigRotation(vrm, "Spine", riggedPose.Spine, 0.45, 0.3);

        rigRotation(vrm, "RightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
        rigRotation(vrm, "RightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
        rigRotation(vrm, "LeftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
        rigRotation(vrm, "LeftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

        rigRotation(vrm, "LeftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
        rigRotation(vrm, "LeftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
        rigRotation(vrm, "RightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
        rigRotation(vrm, "RightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
    }

    // Animate Hands
    if (leftHandLandmarks) {
        riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
        rigRotation(vrm, "LeftHand", {
            // Combine pose rotation Z and hand rotation X Y
            z: riggedPose.LeftHand.z,
            y: riggedLeftHand.LeftWrist.y,
            x: riggedLeftHand.LeftWrist.x,
        });
        rigRotation(vrm, "LeftRingProximal", riggedLeftHand.LeftRingProximal);
        rigRotation(vrm, "LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
        rigRotation(vrm, "LeftRingDistal", riggedLeftHand.LeftRingDistal);
        rigRotation(vrm, "LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
        rigRotation(vrm, "LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
        rigRotation(vrm, "LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
        rigRotation(vrm, "LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
        rigRotation(vrm, "LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
        rigRotation(vrm, "LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
        rigRotation(vrm, "LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
        rigRotation(vrm, "LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
        rigRotation(vrm, "LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
        rigRotation(vrm, "LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
        rigRotation(vrm, "LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
        rigRotation(vrm, "LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
        riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
        rigRotation(vrm, "RightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: riggedPose.RightHand.z,
            y: riggedRightHand.RightWrist.y,
            x: riggedRightHand.RightWrist.x,
        });
        rigRotation(vrm, "RightRingProximal", riggedRightHand.RightRingProximal);
        rigRotation(vrm, "RightRingIntermediate", riggedRightHand.RightRingIntermediate);
        rigRotation(vrm, "RightRingDistal", riggedRightHand.RightRingDistal);
        rigRotation(vrm, "RightIndexProximal", riggedRightHand.RightIndexProximal);
        rigRotation(vrm, "RightIndexIntermediate", riggedRightHand.RightIndexIntermediate);
        rigRotation(vrm, "RightIndexDistal", riggedRightHand.RightIndexDistal);
        rigRotation(vrm, "RightMiddleProximal", riggedRightHand.RightMiddleProximal);
        rigRotation(vrm, "RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
        rigRotation(vrm, "RightMiddleDistal", riggedRightHand.RightMiddleDistal);
        rigRotation(vrm, "RightThumbProximal", riggedRightHand.RightThumbProximal);
        rigRotation(vrm, "RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
        rigRotation(vrm, "RightThumbDistal", riggedRightHand.RightThumbDistal);
        rigRotation(vrm, "RightLittleProximal", riggedRightHand.RightLittleProximal);
        rigRotation(vrm, "RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
        rigRotation(vrm, "RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
};