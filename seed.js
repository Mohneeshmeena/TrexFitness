require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Workout = require('./models/Workout');
const Diet = require('./models/Diet');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apexfit';

// Exercise Database Definitions for all 7 Muscle Groups across 4 Categories
// 20+ realistic exercises per combination

const exerciseDatabase = {
  abs: {
    home: [
      { name: "Standard Plank", reps: "60 sec", sets: 3, instructions: "Maintain rigid straight body line from head to heels, engage core and glutes.", targetMuscles: ["Transverse Abdominis", "Rectus Abdominis"], tips: ["Do not let hips sag", "Breathe steadily"] },
      { name: "Bicycle Crunches", reps: "20 reps each side", sets: 4, instructions: "Alternate opposite elbow to opposite knee with controlled twist.", targetMuscles: ["Obliques", "Rectus Abdominis"], tips: ["Do not pull on neck", "Full extension of legs"] },
      { name: "Mountain Climbers", reps: "45 sec", sets: 3, instructions: "Drive knees alternatively into chest at high pace while maintaining plank.", targetMuscles: ["Core", "Shoulders", "Hip Flexors"], tips: ["Keep hips down", "Hands stacked below shoulders"] },
      { name: "Lying Leg Raises", reps: "15 reps", sets: 3, instructions: "Raise straight legs to 90 degrees and lower slowly without arching lower back.", targetMuscles: ["Lower Abdominals", "Hip Flexors"], tips: ["Press lower back into floor", "Control negative descent"] },
      { name: "Russian Twists (Bodyweight)", reps: "20 twists", sets: 3, instructions: "Sit in V-shape with knees bent, rotate torso from side to side.", targetMuscles: ["Obliques", "Transverse Abdominis"], tips: ["Keep chest proud", "Follow hands with eyes"] },
      { name: "Dead Bug", reps: "12 reps per side", sets: 3, instructions: "Opposite arm and leg lower towards floor while keeping lower back flat.", targetMuscles: ["Core Stabilizers", "Transverse Abdominis"], tips: ["Move slowly", "Maintain pelvic tilt"] },
      { name: "Hollow Body Hold", reps: "35 sec", sets: 3, instructions: "Press lower back into floor, extend arms and legs, hold banana position.", targetMuscles: ["Entire Rectus Abdominis"], tips: ["Tuck chin slightly", "Squeeze thighs together"] },
      { name: "V-Ups", reps: "12 reps", sets: 3, instructions: "Simultaneously lift torso and legs to touch toes in mid-air V formation.", targetMuscles: ["Upper & Lower Abdominals"], tips: ["Explode up, control down", "Avoid swinging"] },
      { name: "Flutter Kicks", reps: "40 sec", sets: 3, instructions: "Small alternating flutter kicks with legs elevated 6 inches off ground.", targetMuscles: ["Lower Core", "Hip Flexors"], tips: ["Hands under glutes if needed", "Keep toes pointed"] },
      { name: "Reverse Crunches", reps: "15 reps", sets: 3, instructions: "Roll hips off floor curling knees towards chest, pause at top peak.", targetMuscles: ["Lower Rectus Abdominis"], tips: ["Do not use momentum", "Control descent"] },
      { name: "Plank Hip Dips", reps: "16 reps", sets: 3, instructions: "In forearm plank, rotate hips down to tap the floor on alternating sides.", targetMuscles: ["Obliques", "Deep Core"], tips: ["Keep core braced", "Pivot on toes"] },
      { name: "Side Plank Left", reps: "45 sec", sets: 3, instructions: "Stack feet and elbow directly under shoulder, hold straight line.", targetMuscles: ["Left Obliques", "Gluteus Medius"], tips: ["Elevate top hip", "Keep neck neutral"] },
      { name: "Side Plank Right", reps: "45 sec", sets: 3, instructions: "Mirror side plank position supporting right side core musculature.", targetMuscles: ["Right Obliques", "Gluteus Medius"], tips: ["Square hips forward", "Breathe through diaphragm"] },
      { name: "Toe Touches", reps: "20 reps", sets: 3, instructions: "Legs vertical at 90 degrees, reach fingertips to shoelaces.", targetMuscles: ["Upper Abdominals"], tips: ["Exhale on reaching up", "Do not jerk head"] },
      { name: "Scissor Kicks", reps: "30 sec", sets: 3, instructions: "Criss-cross legs horizontally over and under each other 6 inches off floor.", targetMuscles: ["Adductors", "Lower Abs"], tips: ["Brace pelvic floor", "Smooth rhythmic tempo"] },
      { name: "Superman Hold", reps: "40 sec", sets: 3, instructions: "Lie prone, raise chest, arms, and legs off floor engaging posterior core.", targetMuscles: ["Erector Spinae", "Glutes", "Lower Core"], tips: ["Squeeze glutes hard", "Look down at mat"] },
      { name: "Boat Pose Hold", reps: "30 sec", sets: 3, instructions: "Balance on sit bones with legs straight or bent at 45 degrees.", targetMuscles: ["Psoas", "Transverse Abdominis"], tips: ["Open chest wide", "Lengthen spine"] },
      { name: "Windshield Wipers (Floor)", reps: "12 reps", sets: 3, instructions: "Arms out to T, rotate legs slowly side to side stopping before floor.", targetMuscles: ["Internal & External Obliques"], tips: ["Keep shoulders glued to floor", "Controlled tempo"] },
      { name: "Heel Taps (Penguin Crunches)", reps: "24 taps", sets: 3, instructions: "Shoulder blades off floor, reach fingertips alternatively to lateral ankles.", targetMuscles: ["Lateral Obliques"], tips: ["Keep chin tucked", "Continuous rhythmic contraction"] },
      { name: "Plank Shoulder Taps", reps: "20 taps", sets: 3, instructions: "In push-up plank position, touch opposite shoulder minimizing hip sway.", targetMuscles: ["Anti-rotational Core", "Deltoids"], tips: ["Widen stance for stability", "Move with control"] }
    ],
    gym: [
      { name: "Cable Crunch", reps: "15 reps", sets: 4, instructions: "Kneel beneath high pulley with rope, flex spine curling elbows towards thighs.", targetMuscles: ["Upper Abdominals", "Deep Core"], tips: ["Pivot from spine, not hips", "Heavy squeeze at bottom"] },
      { name: "Hanging Leg Raise", reps: "12 reps", sets: 4, instructions: "Hang from pullup bar, raise straight legs to parallel or bar without swinging.", targetMuscles: ["Lower Abdominals", "Forearms"], tips: ["Initiate by tucking pelvis", "Slow 3-second descent"] },
      { name: "Captain's Chair Knee Tuck", reps: "15 reps", sets: 3, instructions: "Support forearms on tower, elevate knees towards chest with strict form.", targetMuscles: ["Lower Rectus Abdominis"], tips: ["Do not let shoulders shrug", "Hold 1 sec at top"] },
      { name: "Ab Roller Wheel", reps: "10 reps", sets: 4, instructions: "Kneel and roll wheel forward until chest hovers, contract abs to roll back.", targetMuscles: ["Entire Anterior Chain"], tips: ["Never allow lower back to dip", "Tuck pelvis slightly"] },
      { name: "Decline Bench Weighted Sit-Up", reps: "12 reps", sets: 3, instructions: "Hook feet on decline bench holding plate on chest, curl up under control.", targetMuscles: ["Rectus Abdominis", "Hip Flexors"], tips: ["Keep plate pinned to sternum", "Roll vertebrae down one by one"] },
      { name: "Cable Woodchopper (High to Low)", reps: "12 reps each", sets: 3, instructions: "Rotate torso diagonally downward across body using high cable.", targetMuscles: ["Rotational Obliques"], tips: ["Pivot rear foot", "Drive with core not arms"] },
      { name: "Cable Woodchopper (Low to High)", reps: "12 reps each", sets: 3, instructions: "Diagonal explosive twist from knee level up towards opposite shoulder.", targetMuscles: ["Serratus", "Obliques"], tips: ["Keep arms relatively extended", "Lock core at top"] },
      { name: "Dragon Flag", reps: "6 reps", sets: 3, instructions: "Lie on bench holding behind head, lift entire torso and legs straight as a pillar.", targetMuscles: ["Full Core Complex"], tips: ["Elite movement: keep body rigid", "Do negative reps if learning"] },
      { name: "Pallof Press (Cable)", reps: "12 reps each", sets: 3, instructions: "Stand perpendicular to cable at chest height, press handle out resisting twist.", targetMuscles: ["Transverse Abdominis", "Anti-rotation"], tips: ["Do not let cable pull your hips", "Lock core 2 sec at extension"] },
      { name: "Machine Ab Crunch", reps: "15 reps", sets: 4, instructions: "Sit locked into machine, exhale forcefully while contracting abs forward.", targetMuscles: ["Rectus Abdominis"], tips: ["Select moderate weight", "Focus on intense mind-muscle connection"] },
      { name: "GHD Sit-Up", reps: "10 reps", sets: 3, instructions: "On Glute Ham Developer, lower torso back and touch pad, contract explosively.", targetMuscles: ["Rectus Abdominis", "Hip Flexors"], tips: ["Scale depth if beginner", "Drive with quads and abs"] },
      { name: "Decline Oblique Crunch", reps: "15 reps per side", sets: 3, instructions: "Twist slightly on decline bench focusing contraction into side wall.", targetMuscles: ["Obliques"], tips: ["Do not pull on neck", "Keep twist subtle and focused"] },
      { name: "Hanging Windshield Wipers", reps: "10 reps", sets: 3, instructions: "Invert hanging leg raise and sweep legs from left to right in windshield wiper motion.", targetMuscles: ["Obliques", "Lats", "Lower Abs"], tips: ["Maintain lat engagement", "Smooth arc of motion"] },
      { name: "Stability Ball Stir the Pot", reps: "10 circles each way", sets: 3, instructions: "Forearms on exercise ball in plank, trace circular pattern with elbows.", targetMuscles: ["Deep Core Stabilizers"], tips: ["Keep hips totally motionless", "Small tight circles"] },
      { name: "Landmine Torso Twist", reps: "12 reps each", sets: 3, instructions: "Grip barbell sleeve with two hands, rotate bar in arc from hip to hip.", targetMuscles: ["Rotational Core", "Shoulders"], tips: ["Keep knees slightly soft", "Brace glutes"] },
      { name: "Rope Pull-In on Decline Bench", reps: "15 reps", sets: 3, instructions: "Anchor cable to ankles on decline, pull knees toward chest.", targetMuscles: ["Lower Core"], tips: ["Controlled eccentric phase", "Full hip extension"] },
      { name: "Weighted Plank", reps: "45 sec", sets: 3, instructions: "Standard plank with 25-45 lb bumper plate placed securely on upper back.", targetMuscles: ["Transverse Abdominis"], tips: ["Partner placement recommended", "Maintain neutral spine"] },
      { name: "Roman Chair Side Bend", reps: "15 reps per side", sets: 3, instructions: "Position on 45-degree hyperextension bench sideways, flex spine laterally.", targetMuscles: ["Quadratus Lumborum", "Obliques"], tips: ["Do not rotate forward", "Full lateral stretch"] },
      { name: "Kneeling Cable Anti-Rotation Hold", reps: "30 sec each", sets: 3, instructions: "Half kneeling stance holding cable at sternum with arms fully extended.", targetMuscles: ["Anti-rotation Obliques"], tips: ["Squeeze back glute", "Breathe steadily"] },
      { name: "Hanging Knee to Elbow Twist", reps: "12 reps", sets: 3, instructions: "Hang from bar, drive right knee to touch left elbow, alternate sides.", targetMuscles: ["Obliques", "Hip Flexors"], tips: ["Avoid swinging momentum", "Pause briefly at apex"] }
    ],
    stretching: [
      { name: "Cat-Cow Dynamic Stretch", reps: "10 cycles", sets: 2, instructions: "On all fours, alternate between arching and rounding spine synchronized with breath.", targetMuscles: ["Spine Flexors", "Abdominal Wall"], tips: ["Inhale on cow, exhale on cat", "Slow continuous flow"] },
      { name: "Cobra Pose", reps: "30 sec hold", sets: 3, instructions: "Lie prone, press hands into floor lifting chest while hips remain grounded.", targetMuscles: ["Rectus Abdominis", "Hip Flexors"], tips: ["Drop shoulders away from ears", "Lengthen neck"] },
      { name: "Upward Facing Dog", reps: "25 sec hold", sets: 3, instructions: "Tops of feet and hands ground, thighs lift off mat with open proud chest.", targetMuscles: ["Anterior Fascial Chain"], tips: ["Keep wrists below shoulders", "Gaze softly forward"] },
      { name: "Seated Spinal Twist", reps: "30 sec per side", sets: 2, instructions: "Cross leg over knee, twist torso looking past back shoulder.", targetMuscles: ["Obliques", "Erector Spinae"], tips: ["Lengthen spine on inhale", "Deepen twist on exhale"] },
      { name: "Supine Spinal Twist", reps: "45 sec per side", sets: 2, instructions: "Lie on back, let bent knees fall gently to one side with arms outstretched.", targetMuscles: ["Lower Back", "Obliques"], tips: ["Keep opposite shoulder grounded", "Let gravity do the work"] },
      { name: "Bridge Pose Hold", reps: "35 sec hold", sets: 3, instructions: "Lift hips toward ceiling pressing through heels, opening hip flexors and abs.", targetMuscles: ["Anterior Hip", "Abdominals"], tips: ["Do not let knees splay out", "Interlace fingers below"] },
      { name: "Bow Pose (Dhanurasana)", reps: "20 sec hold", sets: 3, instructions: "Lie prone, grasp ankles with hands, kick feet back to pull chest upward.", targetMuscles: ["Entire Anterior Abdominal Wall"], tips: ["Breathe into belly", "Maintain parallel knees"] },
      { name: "Camel Pose (Ustrasana)", reps: "20 sec hold", sets: 3, instructions: "Kneel tall, reach back hands to grasp heels while pushing hips forward.", targetMuscles: ["Abdominals", "Psoas", "Chest"], tips: ["Support lower back if tight", "Keep hips over knees"] },
      { name: "Extended Child's Pose with Lateral Walk", reps: "30 sec each side", sets: 2, instructions: "In child's pose, walk hands diagonally across mat to stretch side wall.", targetMuscles: ["Lats", "Quadratus Lumborum", "Obliques"], tips: ["Sink hips deep into heels", "Breathe into ribcage"] },
      { name: "Standing Crescent Moon Side Stretch", reps: "30 sec each side", sets: 2, instructions: "Stand tall with hands clasped overhead, bend laterally at the waist.", targetMuscles: ["Intercostals", "Obliques"], tips: ["Do not collapse chest", "Equal weight in both feet"] },
      { name: "Hip Flexor Kneeling Lunge Stretch", reps: "40 sec per side", sets: 2, instructions: "Low kneeling lunge, shift weight forward while tucking pelvis under.", targetMuscles: ["Psoas Major", "Iliacus", "Lower Abs"], tips: ["Squeeze rear glute", "Reach same-side arm overhead"] },
      { name: "Thread the Needle", reps: "30 sec per side", sets: 2, instructions: "From quadruped, slip one arm underneath torso until shoulder touches mat.", targetMuscles: ["Thoracic Spine", "Rear Shoulder", "Obliques"], tips: ["Keep hips centered", "Relax neck completely"] },
      { name: "Prone Scorpions", reps: "10 alternating reps", sets: 2, instructions: "Lie belly down arms in T, reach one foot across behind back toward opposite hand.", targetMuscles: ["Hip Flexors", "Abdominal Wall", "Lower Back"], tips: ["Gentle dynamic motion", "Do not force range"] },
      { name: "Standing Torso Rotations", reps: "20 gentle swings", sets: 2, instructions: "Stand shoulder-width, gently swing arms around torso allowing heels to pivot.", targetMuscles: ["Obliques", "Spinal Mobilizers"], tips: ["Completely relax arms like ropes", "Fluid motion"] },
      { name: "Lying Knee-to-Chest Decompression", reps: "45 sec hold", sets: 2, instructions: "Draw both knees into chest hugging shins, releasing lower spine tension.", targetMuscles: ["Lower Lumbar", "Sacroiliac"], tips: ["Gently rock side to side", "Keep tailbone heavy"] },
      { name: "Downward Facing Dog with Core Pulse", reps: "45 sec hold", sets: 2, instructions: "Standard inverted V position, focus on drawing navel tightly toward spine.", targetMuscles: ["Transverse Abdominis", "Hamstrings"], tips: ["Press through index knuckles", "Elevate sit bones"] },
      { name: "Sphinx Pose", reps: "45 sec hold", sets: 2, instructions: "Lie prone on forearms with elbows beneath shoulders, draw chest forward.", targetMuscles: ["Mild Abdominal Stretch", "Mid Back"], tips: ["Gentle traction of elbows backward", "Relax glutes"] },
      { name: "Side-Lying Quad & Psoas Stretch", reps: "35 sec per side", sets: 2, instructions: "Lie on side, grasp top ankle pulling heel toward glute with slight hip push.", targetMuscles: ["Psoas", "Rectus Femoris"], tips: ["Keep thighs aligned", "Avoid overarching spine"] },
      { name: "Windmill Dynamic Flow", reps: "8 reps per side", sets: 2, instructions: "Stand wide, reach opposite hand down to foot while looking at top hand.", targetMuscles: ["Hamstrings", "Obliques", "Spine"], tips: ["Push hip out to side", "Move slowly"] },
      { name: "Dead Hang from Pullup Bar", reps: "45 sec hold", sets: 2, instructions: "Simply hang from overhead bar allowing gravity to decompress spine and core.", targetMuscles: ["Spinal Decompression", "Abdominal Fascia"], tips: ["Let shoulders elevate slightly", "Breathe deeply into pelvis"] }
    ],
    dumbbell: [
      { name: "Dumbbell Russian Twist", reps: "20 twists", sets: 3, instructions: "Hold dumbbell with both hands, twist torso tapping dumbbell beside hips.", targetMuscles: ["Obliques", "Transverse Abdominis"], tips: ["Keep feet off floor if advanced", "Turn shoulders fully"] },
      { name: "Dumbbell Side Bend", reps: "12 reps per side", sets: 3, instructions: "Stand holding one dumbbell at side, bend laterally toward weight and return.", targetMuscles: ["Contralateral Obliques", "QL"], tips: ["Do not lean forward or backward", "Never use two dumbbells at once"] },
      { name: "Weighted Crunch with Dumbbell", reps: "15 reps", sets: 3, instructions: "Hold dumbbell pressed above chest on back, curl shoulder blades upward.", targetMuscles: ["Upper Rectus Abdominis"], tips: ["Keep dumbbell pointed straight up", "Avoid throwing weight forward"] },
      { name: "Dumbbell Plank Row (Renegade Row)", reps: "12 reps total", sets: 3, instructions: "In pushup position on two dumbbells, row one dumbbell to ribcage without twisting.", targetMuscles: ["Anti-rotational Core", "Lats", "Obliques"], tips: ["Widen foot stance", "Lock hips parallel to floor"] },
      { name: "Dumbbell Woodchopper", reps: "12 reps per side", sets: 3, instructions: "Hold dumbbell with both hands, swing diagonally from high shoulder to opposite knee.", targetMuscles: ["Rotational Obliques", "Deltoids"], tips: ["Pivot rear foot smoothly", "Control the downward brake"] },
      { name: "Dumbbell Overhead Carry (Waiter Walk)", reps: "40 meters per arm", sets: 3, instructions: "Lock one dumbbell directly overhead, walk forward with rock-solid vertical posture.", targetMuscles: ["Deep Core Stabilizers", "Shoulder"], tips: ["Do not lean away from weight", "Keep ribs pulled down"] },
      { name: "Dumbbell Suitcase Carry", reps: "40 meters per side", sets: 3, instructions: "Hold heavy dumbbell in one hand only, walk briskly without tilting torso.", targetMuscles: ["Contralateral Obliques", "Forearms"], tips: ["Maintain level shoulder line", "Brace core against lateral pull"] },
      { name: "Dumbbell Windmill", reps: "8 reps per side", sets: 3, instructions: "Press dumbbell overhead, pivot feet 45 degrees, hinge at hip reaching other hand down.", targetMuscles: ["Obliques", "Hamstrings", "Shoulder Stability"], tips: ["Keep eyes locked on top dumbbell", "Hinge from hip joint"] },
      { name: "Dumbbell Turkish Get-Up (Core Segment)", reps: "4 reps per side", sets: 2, instructions: "From back to elbow to hand to high bridge with dumbbell pressed overhead.", targetMuscles: ["Full Kinetic Chain", "Core"], tips: ["Move with deliberate precision", "Keep wrist straight"] },
      { name: "Weighted V-Up with Light Dumbbell", reps: "10 reps", sets: 3, instructions: "Hold light dumbbell between hands, fold into V meeting dumbbell to toes.", targetMuscles: ["Rectus Abdominis"], tips: ["Use 5-10 lbs max", "Smooth fluid tempo"] },
      { name: "Dumbbell Pullover to Crunch", reps: "12 reps", sets: 3, instructions: "Perform pullover, as dumbbell passes overhead crunch up into tight peak.", targetMuscles: ["Serratus Anterior", "Upper Abs"], tips: ["Keep slight elbow bend", "Squeeze core at peak"] },
      { name: "Dumbbell Side Plank Hip Lift", reps: "10 reps each", sets: 3, instructions: "Rest light dumbbell on top hip in side plank, lower and elevate hips.", targetMuscles: ["Obliques", "Hip Abductors"], tips: ["Hold weight securely with hand", "Full range of motion"] },
      { name: "Dumbbell Bear Crawl Hold", reps: "40 sec hold", sets: 3, instructions: "Knees hovering 1 inch off floor on dumbbells, keep flat back and tight abs.", targetMuscles: ["Transverse Abdominis", "Quads"], tips: ["Shins parallel to ground", "Push ground away"] },
      { name: "Single-Arm Dumbbell Push Press (Core Lockout)", reps: "10 reps per side", sets: 3, instructions: "Dip and drive one dumbbell overhead, bracing core to prevent spinal extension.", targetMuscles: ["Obliques", "Shoulders"], tips: ["Squeeze opposite fist", "Ribs locked down"] },
      { name: "Dumbbell Reverse Crunch Pinch", reps: "12 reps", sets: 3, instructions: "Clamp light dumbbell between feet, perform reverse hip roll off floor.", targetMuscles: ["Lower Abdominals"], tips: ["Use very light dumbbell", "Ensure tight clamp with shoes"] },
      { name: "Dumbbell Hollow Rock", reps: "25 sec", sets: 3, instructions: "Hold dumbbell overhead in hollow position, rock gently back and forth.", targetMuscles: ["Entire Core Wall"], tips: ["Small controlled rocking motion", "Lower back never leaves floor"] },
      { name: "Dumbbell T-Pushup Rotation", reps: "12 reps alternating", sets: 3, instructions: "Pushup on dumbbells, at top rotate one dumbbell into vertical T side plank.", targetMuscles: ["Obliques", "Chest", "Anterior Deltoids"], tips: ["Pivot on balls of feet", "Stack shoulders"] },
      { name: "Dumbbell Farmer's Walk", reps: "50 meters", sets: 3, instructions: "Carry two heavy dumbbells with tall proud posture and braced abdominal brace.", targetMuscles: ["Total Core", "Traps", "Forearms"], tips: ["Short brisk steps", "Do not look down"] },
      { name: "Goblet Squat Core Pulse", reps: "12 reps", sets: 3, instructions: "Hold heavy dumbbell at chest, squat deep and pulse 2 seconds before standing.", targetMuscles: ["Core", "Quads", "Glutes"], tips: ["Keep elbows inside knees", "Chest upright"] },
      { name: "Dumbbell Dead Bug Extension", reps: "10 reps each", sets: 3, instructions: "Hold light dumbbell in hands over chest, extend alternating legs while bracing.", targetMuscles: ["Anti-Extension Core"], tips: ["Lower back glued to mat", "Inhale on extension"] }
    ]
  }
};

// Generic factory to populate real exercises across all muscle groups & categories
const muscleGroups = ['abs', 'biceps', 'back', 'triceps', 'chest', 'shoulder', 'legs'];
const categories = ['home', 'gym', 'stretching', 'dumbbell'];

// High-quality catalog templates for other muscle groups
const exerciseCatalog = {
  biceps: {
    home: ["Chin-Ups", "Doorframe Underhand Rows", "Towel Inverted Curl", "Backpack Bicep Curls", "Isometric Bicep Wall Hold", "Resistance Band Concentration Curl", "Flexed Arm Hang", "Negative Chin-Ups (5-sec descent)", "Bed-Sheet Underhand Row", "Chair Bicep Pull-Ins", "Underhand Table Rows", "Band Hammer Curls", "Isometric Towel Curl", "Single-Arm Door Jamb Pull", "Band Cross-Body Curl", "Bicep Bodyweight Dips (hands backward)", "Plank to Bicep Pushback", "Band Preacher Curl on Chair", "Underhand Grip Inverted Rows", "Dynamic Flexion Isometric Pulse"],
    gym: ["Barbell Bicep Curl", "Incline Dumbbell Curl", "Preacher Curl with EZ Bar", "Cable Rope Hammer Curl", "Concentration Curl on Bench", "Spider Curl on Incline Bench", "Cable Bicep Curl", "Zottman Curls", "High Cable Bicep Curls", "Machine Bicep Curl", "Seated Alternating Dumbbell Curl", "Reverse Grip EZ Bar Curl", "21s Bicep Curl", "Bayesian Cable Curl", "Cross-Body Cable Curl", "Behind-the-Back Cable Curl", "Smith Machine Drag Curl", "Overhead Cable Bicep Curl", "Waiter Curl with Plate", "Cheat Barbell Curl (Controlled Negative)"],
    stretching: ["Wall Bicep Stretch", "Doorframe Arm Extensor Stretch", "Behind-the-Back Clasp", "Seated Bicep Floor Stretch", "Prone Arm Extension Stretch", "Overhead Bicep & Lat Sweep", "Wrist Extensor Counter-Stretch", "Standing Reverse Arm Clasp", "Dynamic Arm Swings Horizontal", "Kneeling Bicep Palm-Down Stretch", "Table-Edge Forearm & Bicep Stretch", "Eagle Pose Arms Bicep Relief", "Thread the Needle Bicep Release", "Standing Cross-Chest Counter Stretch", "Wall Slide Arm Flexor Release", "Band Assisted Arm Extension", "Downward Dog Bicep Alignment", "Side-Lying Arm Opener", "Gentle Bicep Traction Hang", "Prayer Pose Reverse Wrist Stretch"],
    dumbbell: ["Alternating Dumbbell Curl", "Incline Dumbbell Curl", "Dumbbell Hammer Curl", "Concentration Curl", "Dumbbell Preacher Curl", "Dumbbell Zottman Curl", "Dumbbell Spider Curl", "Seated Inner-Bicep Curl", "Standing Dumbbell Drag Curl", "Cross-Body Dumbbell Hammer Curl", "Dumbbell Waiter Curl", "Single-Arm Dumbbell Scott Curl", "Incline Hammer Curl", "Dumbbell 21s Protocol", "Dumbbell Reverse Curl", "Prone Incline Bicep Curl", "Offset Grip Dumbbell Curl", "Standing Supinated Dumbbell Curl", "Dumbbell ISO Peak Curl Hold", "Dumbbell Bicep Burnout Pulses"]
  },
  back: {
    home: ["Wide-Grip Pull-Ups", "Chin-Ups", "Inverted Rows Under Table", "Prone Back Extension (Supermans)", "Reverse Snow Angels", "Bird-Dog Core & Back Balance", "Doorframe Lat Rows", "Prone Y-T-W Raises", "Towel Lat Pulldown on Floor", "Swimmers (Prone Alternating Flutter)", "Wall Slides for Scapular Retraction", "Arch Body Prone Hold", "Bodyweight Good Mornings", "Single-Leg Romanian Bodyweight Hinge", "Bridge Scapular Retractions", "Prone Cobra Pose Hold", "Backpack Bent-Over Row", "Isometric Lats Doorway Push", "Resistance Band Pull-Aparts", "Band Seated Rows"],
    gym: ["Barbell Deadlift", "Barbell Bent-Over Row", "Lat Pulldown (Wide Grip)", "Seated Cable Row (V-Bar)", "T-Bar Row", "Single-Arm Dumbbell Row", "Chest-Supported Machine Row", "Rack Pulls", "Neutral Grip Lat Pulldown", "Straight-Arm Cable Pulldown", "Meadows Row on Landmine", "Pendlay Row", "Assisted Pull-Up Machine", "Hyperextension Bench (Weighted)", "Reverse Grip Lat Pulldown", "High-to-Low Cable Lat Row", "Smith Machine Bent-Over Row", "Seal Row on Incline Bench", "Low Cable Row with Wide Handle", "Trap Bar Deadlift (High Handles)"],
    stretching: ["Cat-Cow Spinal Wave", "Child's Pose with Lat Reach", "Seated Spinal Twist", "Thoracic Spine Foam Rolling", "Doorframe Lat Stretch", "Downward Facing Dog", "Knee to Chest Double Hug", "Supine Twist Back Relief", "Standing Side Bend Lat Stretch", "Thread the Needle Upper Back Stretch", "Puppy Pose (Melting Heart)", "Prone Cobra Back Opener", "Overhead Band Dislocates", "Scapular Wall Angels", "Figure-Four Piriformis & Lower Back Stretch", "Lying Hamstring & Lower Back Release", "Standing Forward Fold Spinal Decompression", "Passive Dead Hang for Spinal Relief", "Quadruped Thoracic Rotation", "Sphinx Pose Back Release"],
    dumbbell: ["Single-Arm Dumbbell Row", "Two-Arm Bent-Over Dumbbell Row", "Dumbbell Romanian Deadlift", "Chest-Supported Incline Dumbbell Row", "Dumbbell Pullover", "Dumbbell Renegade Rows", "Dumbbell Shrugs", "Dumbbell Incline Y-Raise", "Dumbbell Deadlift", "Dumbbell Good Morning", "Dumbbell Seal Row", "Single-Arm Dumbbell Deadlift", "Dumbbell Lawn Mower Pull", "Dumbbell High Row", "Kroc Rows (Heavy Dumbbell)", "Dumbbell Sumo Deadlift", "Dumbbell Rear Delt & Upper Back Fly", "Dumbbell Farmer's Carry", "Dumbbell Suitcase Deadlift", "Dumbbell Gorilla Row"]
  },
  triceps: {
    home: ["Diamond Push-Ups", "Bench / Chair Dips", "Bodyweight Tricep Extensions on Wall", "Close-Grip Push-Ups", "Pike Push-Ups", "Floor Tricep Dips", "Plank to Push-Up (Military Plank)", "Tiger Bend Push-Ups", "Reverse Grip Push-Ups", "Chair Dip with Feet Elevated", "Towel Overhead Tricep Extension", "Isometric Tricep Wall Press", "Single-Arm Floor Tricep Extension", "Decline Close-Grip Push-Ups", "Pseudo Planche Tricep Press", "Band Overhead Tricep Extension", "Band Tricep Pushdown", "Band Tricep Kickbacks", "Incline Diamond Push-Up on Couch", "Floor Skull Crusher Bodyweight"],
    gym: ["Cable Tricep Rope Pushdown", "Close-Grip Barbell Bench Press", "Skull Crushers (EZ-Bar)", "Overhead Cable Tricep Extension", "Seated Overhead Dumbbell Extension", "Cable Straight Bar Pushdown", "Parallel Bar Dips (Weighted)", "Machine Tricep Dip", "JM Press with Barbell", "Reverse Grip Cable Pushdown", "Single-Arm Cable Tricep Extension", "Tate Press on Flat Bench", "Cable Kickbacks with Cuff", "Dumbbell Skull Crusher on Bench", "Floor Press (Close Grip)", "Incline EZ-Bar Skull Crusher", "Smith Machine Close-Grip Press", "French Press (Seated EZ Bar)", "Overhead Tricep Extension with Rope", "Cross-Body Cable Extension"],
    stretching: ["Overhead Tricep Towel Stretch", "Cross-Body Tricep Stretch", "Wall Tricep Press Stretch", "Behind-the-Neck Tricep Pull", "Doorframe Tricep & Lat Stretch", "Eagle Arms Stretch", "Cow Face Pose (Gomukhasana)", "Seated Tricep Hand-Behind-Back", "Standing Overhead Tricep Lean", "Puppy Pose with Elbows Bent", "Tabletop Reverse Arm Extension", "Downward Dog with Tricep Focus", "Dynamic Arm Swings Vertical", "Reverse Prayer Stretch", "Band Assisted Overhead Stretch", "Foam Roll Tricep Lateral Head", "Child's Pose Hands Behind Head", "Standing Wall Slide Tricep Release", "Interlaced Overhead Reach", "Gentle Elbow Flexion Mobilizer"],
    dumbbell: ["Overhead Dumbbell Tricep Extension", "Dumbbell Tricep Kickback", "Lying Dumbbell Skull Crusher", "Close-Grip Dumbbell Bench Press", "Single-Arm Overhead Dumbbell Extension", "Dumbbell Tate Press", "Incline Dumbbell Skull Crusher", "Dumbbell Floor Press with Neutral Grip", "Dumbbell JM Press", "Single-Arm Dumbbell Kickback", "Two-Handed Standing Dumbbell Extension", "Dumbbell Decline Skull Crusher", "Dumbbell Rolling Tricep Extension", "Prone Dumbbell Kickbacks on Incline Bench", "Dumbbell Dip on Floor with Weight on Lap", "Hex Press (Tricep & Chest Squeeze)", "Dumbbell Cross-Body Tricep Extension", "Seated Two-Arm Overhead Dumbbell Press", "Dumbbell Tricep Pushback Hold", "Dumbbell Tricep Burnout Extensions"]
  },
  chest: {
    home: ["Standard Push-Ups", "Wide-Grip Push-Ups", "Diamond Push-Ups", "Decline Push-Ups (Feet Elevated)", "Incline Push-Ups (Hands Elevated)", "Archer Push-Ups", "Typewriter Push-Ups", "Clapping Explosive Push-Ups", "Slow Negative Push-Ups (5 sec)", "Staggered Hand Push-Ups", "Floor Chest Squeeze (Isometric)", "Pike-to-Cobra Dive Bomber Push-Ups", "Hindu Push-Ups", "Single-Arm Supported Push-Ups", "Wall Push-Ups for High Volume", "Resistance Band Chest Press", "Resistance Band Chest Fly", "Bed-Sheet Chest Fly", "Isometric Prayer Squeeze", "Hover Push-Up Hold"],
    gym: ["Barbell Bench Press (Flat)", "Incline Dumbbell Bench Press", "Decline Barbell Bench Press", "Cable Chest Fly (Mid Pulley)", "Low-to-High Cable Fly", "High-to-Low Cable Fly", "Pec Deck Machine", "Machine Chest Press", "Dips for Lower Chest", "Incline Barbell Bench Press", "Close-Grip Barbell Bench Press", "Smith Machine Incline Press", "Svend Press with Weight Plates", "Dumbbell Floor Press", "Landmine Chest Press", "Weighted Parallel Bar Dips", "Incline Cable Fly", "Floor Fly with Dumbbells", "Seated Machine Incline Press", "Guillotine Press on Smith Machine"],
    stretching: ["Doorframe Pec Stretch (90 Degrees)", "Doorframe Pec Stretch (120 Degrees)", "Standing Chest Clasp & Expansion", "Prone Chest T-Stretch", "Foam Roller Longitudinal Chest Opener", "Cobra Pose Chest Lift", "Camel Pose Chest Opener", "Bow Pose (Dhanurasana)", "Fish Pose (Matsyasana)", "Child's Pose with Wide Arms", "Standing Corner Chest Stretch", "Cross-Body Scapular Counter Stretch", "Overhead Band Chest Dislocate", "Sphinx Pose Chest Lift", "Tabletop Reverse Bridge Chest Opener", "Seated Clasp Heart Opener", "Dynamic Arm Hug Swings", "Wall Angel Scapular Glides", "Side-Lying Pec Stretch", "Bridge Pose with Interlaced Fingers"],
    dumbbell: ["Flat Dumbbell Bench Press", "Incline Dumbbell Bench Press", "Decline Dumbbell Bench Press", "Flat Dumbbell Chest Fly", "Incline Dumbbell Chest Fly", "Dumbbell Pullover", "Dumbbell Squeeze Press (Hex Press)", "Single-Arm Dumbbell Bench Press", "Dumbbell Floor Press", "Dumbbell Around the Worlds", "Decline Dumbbell Fly", "Incline Dumbbell Squeeze Press", "Dumbbell Svend Press", "Alternating Incline Dumbbell Press", "Dumbbell Neutral-Grip Flat Press", "Dumbbell Twisting Bench Press", "Low Incline Dumbbell Press", "Dumbbell Push-Up to Row", "Wide-to-Narrow Dumbbell Press", "Dumbbell Fly with Static Squeeze Peak"]
  },
  shoulder: {
    home: ["Pike Push-Ups", "Elevated Pike Push-Ups", "Handstand Hold against Wall", "Handstand Push-Ups (Wall-Assisted)", "Prone Y-T-W Raises", "Scapular Push-Ups", "Plank to Downward Dog Shoulder Press", "Doorframe Lateral Deltoid Pulls", "Arm Circles (Forward & Reverse)", "Resistance Band Overhead Press", "Band Lateral Raises", "Band Front Raises", "Band Face Pulls", "Band Pull-Aparts", "Bear Crawl Shoulder Burnout", "Crab Walk Shoulder Mobility", "Plank Shoulder Taps", "Dolphin Pose Hold", "Wall Climbs into Handstand", "Isometric Wall Deltoid Push"],
    gym: ["Barbell Overhead Press (OHP)", "Seated Dumbbell Shoulder Press", "Arnold Press", "Cable Lateral Raise", "Cable Face Pulls with Rope", "Barbell Upright Row", "Rear Delt Fly Machine (Reverse Pec Deck)", "Smith Machine Overhead Press", "Machine Shoulder Press", "Plate Front Raise", "Cable Front Raise", "High Cable Rear Delt Crossover", "Barbell Push Press", "Behind-the-Neck Barbell Press", "Landmine Single-Arm Shoulder Press", "Bradford Press", "Cable Upright Row", "Barbell Shrugs (Heavy)", "Incline Bench Dumbbell Rear Delt Row", "Lu Raises with Small Plates"],
    stretching: ["Cross-Body Shoulder Stretch", "Overhead Shoulder & Tricep Reach", "Doorframe Anterior Deltoid Stretch", "Behind-the-Back Shoulder Internal Rotation", "Eagle Arms Scapular Stretch", "Thread the Needle", "Cow Face Arms (Gomukhasana)", "Child's Pose with Arm Elevation", "Puppy Pose Shoulder Opener", "Standing Wall Angels", "Prone T-Stretch for Shoulders", "Downward Facing Dog Shoulder Push", "Overhead Band Dislocates", "Foam Roller Thoracic & Rear Delt Release", "Standing Arm Swings Across Body", "Dynamic Shoulder Shrugs & Rolls", "Tabletop Reverse Shoulder Opener", "Bow Pose Shoulder Flexion", "Wall Overhead Slide", "Gentle Neck & Upper Trap Stretch"],
    dumbbell: ["Seated Dumbbell Shoulder Press", "Standing Dumbbell Overhead Press", "Arnold Press", "Dumbbell Lateral Raise", "Dumbbell Front Raise", "Bent-Over Dumbbell Rear Delt Fly", "Dumbbell Upright Row", "Dumbbell Shrugs", "Single-Arm Dumbbell Push Press", "Dumbbell Cuban Press", "Incline Bench Dumbbell Rear Delt Raise", "Dumbbell 6-Way Shoulder Raises", "Dumbbell Y-Raise on Incline Bench", "Dumbbell Waiter Walk", "Alternating Front-to-Lateral Dumbbell Raise", "Dumbbell Clean and Press", "Dumbbell Windmill for Shoulder Stability", "Seated Lean-Away Dumbbell Lateral Raise", "Dumbbell Scaption Raise", "Dumbbell Shoulder Burnout Pulses"]
  },
  legs: {
    home: ["Bodyweight Air Squats", "Jump Squats", "Walking Lunges", "Reverse Lunges", "Bulgarian Split Squats (Foot on Chair)", "Glute Bridges", "Single-Leg Glute Bridges", "Sumo Squats", "Calf Raises on Step", "Single-Leg Calf Raises", "Wall Sit Hold (60 sec)", "Pistol Squats (Assisted)", "Step-Ups on Sturdy Chair", "Curtsy Lunges", "Lateral Side Lunges", "Nordic Hamstring Curl (Assisted)", "Single-Leg Romanian Deadlift (Bodyweight)", "Donkey Kicks & Fire Hydrants", "Jump Lunges (Split Switch)", "Squat Pulses in Bottom Position"],
    gym: ["Barbell Back Squat", "Barbell Front Squat", "Leg Press (45 Degree)", "Romanian Deadlift (Barbell)", "Leg Extension Machine", "Lying Leg Curl Machine", "Seated Leg Curl Machine", "Barbell Hip Thrust", "Hack Squat Machine", "Standing Calf Raise Machine", "Seated Calf Raise Machine", "Walking Barbell Lunges", "Sumo Deadlift", "Good Mornings (Barbell)", "Adductor Machine", "Abductor Machine", "Smith Machine Squat", "Glute Ham Developer (GHD) Raise", "Safety Bar Squat", "Trap Bar Deadlift (Leg Focused)"],
    stretching: ["Standing Quad Stretch", "Seated Forward Bend Hamstring Stretch", "Lizard Pose Deep Hip Opener", "Pigeon Pose Glute Stretch", "Butterfly Pose Adductor Stretch", "Figure-Four Glute Stretch (Supine)", "Downward Facing Dog Calf Stretch", "Standing Calf Stretch at Wall", "Half-Kneeling Hip Flexor Stretch", "Frog Pose Deep Groin Stretch", "IT Band Standing Cross Stretch", "Lying Hamstring Stretch with Strap", "Reclined Bound Angle Pose", "Low Lunge with Quad Pull", "Couch Stretch for Rectus Femoris", "Seated Wide-Leg Straddle Fold", "Happy Baby Pose", "Deep Asian Squat Mobility Hold", "Ankle Joint Dorsiflexion Mobilizer", "Foam Rolling IT Band & Quads"],
    dumbbell: ["Goblet Squat with Dumbbell", "Dumbbell Romanian Deadlift", "Dumbbell Bulgarian Split Squat", "Dumbbell Walking Lunges", "Dumbbell Sumo Squats", "Dumbbell Step-Ups", "Dumbbell Hip Thrust on Bench", "Single-Leg Dumbbell Deadlift", "Dumbbell Lateral Lunges", "Dumbbell Reverse Lunges", "Dumbbell Calf Raises (Both Legs)", "Single-Leg Dumbbell Calf Raise", "Dumbbell Front Squat (Shoulder Racked)", "Dumbbell Curtsy Lunges", "Dumbbell Hamstring Curl (Lying)", "Dumbbell Glute Bridge with Plate/Weight", "Dumbbell Box Squat", "Dumbbell Jump Squats", "Dumbbell Suitcase Squat", "Dumbbell 1.5 Rep Squat Protocol"]
  }
};

const photoMap = {
  abs: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
  biceps: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
  back: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=600&auto=format&fit=crop&q=80',
  triceps: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=600&auto=format&fit=crop&q=80',
  chest: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&auto=format&fit=crop&q=80',
  shoulder: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80',
  legs: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
  stretching: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
  dumbbell: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80'
};

function generateExercises(muscle, category) {
  const chosenPhoto = category === 'stretching' ? photoMap.stretching : (category === 'dumbbell' ? photoMap.dumbbell : (photoMap[muscle] || photoMap.chest));

  // Check if explicit list exists in abs
  if (exerciseDatabase[muscle] && exerciseDatabase[muscle][category]) {
    return exerciseDatabase[muscle][category].map((ex, idx) => ({
      name: ex.name,
      reps: ex.reps || "12-15 reps",
      sets: ex.sets || 3,
      duration: "45-60 sec",
      restTime: 60,
      imageUrl: chosenPhoto,
      gifUrl: chosenPhoto,
      instructions: ex.instructions || `Perform ${ex.name} with focused contraction and full range of motion.`,
      targetMuscles: ex.targetMuscles || [muscle.toUpperCase()],
      tips: ex.tips || ["Maintain core tension", "Control eccentric movement"]
    }));
  }

  // Fallback to catalog
  const names = (exerciseCatalog[muscle] && exerciseCatalog[muscle][category]) || [];
  return names.map((name, i) => ({
    name: name,
    reps: category === 'stretching' ? "30-45 sec hold" : (i % 2 === 0 ? "10-12 reps" : "12-15 reps"),
    sets: category === 'stretching' ? 2 : (i < 4 ? 4 : 3),
    duration: category === 'stretching' ? "45 sec" : "60 sec",
    restTime: category === 'stretching' ? 30 : 60,
    imageUrl: chosenPhoto,
    gifUrl: chosenPhoto,
    instructions: `Execute ${name} with pristine posture. Emphasize target muscle contraction at peak, then control the lowering phase for 2-3 seconds.`,
    targetMuscles: [muscle.toUpperCase(), `${muscle.toUpperCase()} Stabilizers`],
    tips: [
      `Keep spine strictly neutral throughout ${name}`,
      "Exhale forcefully on exertion, inhale on recovery",
      "Do not sacrifice proper form for heavier loads"
    ]
  }));
}

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // 1. Seed Demo User
    console.log('Seeding Demo User...');
    let user = await User.findOne({ email: 'demo@apexfit.com' });
    if (!user) {
      user = new User({
        name: 'Alex Mercer',
        email: 'demo@apexfit.com',
        password: 'Demo1234!',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        stats: {
          completedWorkouts: 24,
          currentStreak: 6,
          longestStreak: 14,
          totalCaloriesBurned: 8450,
          totalMinutesWorked: 520
        },
        achievements: [
          { id: 'first_workout', name: 'First Rep', description: 'Completed first workout', unlockedAt: new Date(Date.now() - 14 * 86400000), icon: '🏆' },
          { id: 'week_streak', name: 'Week Warrior', description: 'Maintained 7 day streak', unlockedAt: new Date(Date.now() - 7 * 86400000), icon: '🔥' },
          { id: 'calorie_crusher', name: 'Calorie Crusher', description: 'Burned over 5,000 total calories', unlockedAt: new Date(Date.now() - 3 * 86400000), icon: '⚡' }
        ]
      });
      await user.save();
      console.log('Demo user created (demo@apexfit.com / Demo1234!)');
    } else {
      console.log('Demo user already exists.');
    }

    // 2. Seed Workouts
    console.log('Seeding 28 Workout Categories (7 groups x 4 categories)...');
    await Workout.deleteMany({});

    const workoutDocs = [];
    for (const muscle of muscleGroups) {
      for (const cat of categories) {
        const exercises = generateExercises(muscle, cat);
        const nameMap = {
          home: 'Bodyweight Mastery',
          gym: 'Hypertrophy Machine & Barbell',
          stretching: 'Mobility & Recovery Flow',
          dumbbell: 'Dumbbell Power Circuit'
        };

        workoutDocs.push({
          muscleGroup: muscle,
          category: cat,
          name: `${muscle.toUpperCase()} — ${nameMap[cat]}`,
          description: `Elite ${cat} protocol specifically optimized for high-performance ${muscle} hypertrophy, functional strength, and tissue longevity.`,
          difficulty: cat === 'stretching' ? 'beginner' : (cat === 'gym' ? 'advanced' : 'intermediate'),
          duration: cat === 'stretching' ? 25 : 50,
          caloriesBurn: cat === 'stretching' ? 120 : (cat === 'gym' ? 420 : 340),
          exercises: exercises
        });
      }
    }

    const insertedWorkouts = await Workout.insertMany(workoutDocs);
    console.log(`Inserted ${insertedWorkouts.length} Workout Plans (each with 20+ detailed exercises)!`);

    // 3. Seed Diets
    console.log('Seeding 3 Comprehensive Diet Plans (Veg, Non-Veg, Creative)...');
    await Diet.deleteMany({});

    const dietsData = [
      {
        planType: 'veg',
        name: 'Apex Pure Green Hypertrophy (Vegetarian)',
        description: 'Plant-powered muscle-building fuel engineered with complete amino acid profiles, high-leucine legumes, Greek yogurt, and complex carbohydrates.',
        targetGoal: 'bulking',
        dailyCalories: 2750,
        macros: { protein: 175, carbs: 320, fats: 75 },
        healthBenefits: [
          'High dietary fiber promoting optimal gut microbiome & nutrient uptake',
          'Rich in polyphenols and antioxidants for expedited DOMS recovery',
          'Zero saturated animal fats for pristine cardiovascular health'
        ],
        meals: [
          {
            mealTime: '07:30 AM — Breakfast',
            name: 'High-Protein Power Oats & Chia Bowl',
            preparation: 'Cook steel-cut oats with almond milk. Stir in plant protein powder, chia seeds, and top with banana slices, crushed almonds, and organic peanut butter.',
            macros: { protein: 38, carbs: 72, fats: 18, calories: 590 },
            ingredients: [
              { item: 'Steel Cut Rolled Oats', amount: '80g', calories: 300 },
              { item: 'Vegan Pea/Rice Protein Powder', amount: '35g', calories: 130 },
              { item: 'Chia Seeds & Almond Butter', amount: '2 tbsp', calories: 160 }
            ]
          },
          {
            mealTime: '11:00 AM — Mid-Morning Snack',
            name: 'Greek Yogurt Parfait with Mixed Berries',
            preparation: 'Layer zero-fat Greek yogurt with blueberries, organic honey drizzle, and crushed pumpkin seeds for zinc and magnesium.',
            macros: { protein: 26, carbs: 28, fats: 6, calories: 270 },
            ingredients: [
              { item: 'Zero-Fat Greek Yogurt', amount: '220g', calories: 130 },
              { item: 'Organic Blueberries', amount: '75g', calories: 50 },
              { item: 'Pumpkin Seeds & Honey', amount: '15g', calories: 90 }
            ]
          },
          {
            mealTime: '02:00 PM — Lunch',
            name: 'Crispy Tempeh & Quinoa Power Bowl',
            preparation: 'Pan-sear marinated tempeh in sesame oil. Serve over warm fluffy quinoa with steamed broccoli, edamame, and tahini lemon dressing.',
            macros: { protein: 44, carbs: 80, fats: 22, calories: 690 },
            ingredients: [
              { item: 'Organic Tempeh', amount: '180g', calories: 320 },
              { item: 'Cooked Quinoa', amount: '180g', calories: 220 },
              { item: 'Shelled Edamame & Broccoli', amount: '100g', calories: 150 }
            ]
          },
          {
            mealTime: '05:30 PM — Pre-Workout Snack',
            name: 'Banana Rice Cakes with Dark Chocolate & Almonds',
            preparation: 'Top organic brown rice cakes with mashed banana, cacao nibs, and a pinch of pink Himalayan sea salt.',
            macros: { protein: 12, carbs: 55, fats: 8, calories: 340 },
            ingredients: [
              { item: 'Brown Rice Cakes', amount: '3 cakes', calories: 110 },
              { item: 'Medium Banana', amount: '1 whole', calories: 105 },
              { item: 'Almond Butter & Himalayan Salt', amount: '15g', calories: 125 }
            ]
          },
          {
            mealTime: '08:30 PM — Dinner',
            name: 'Paneer / Tofu Tikka Masala with Brown Rice',
            preparation: 'Saute cubes of pressed firm tofu or paneer in spiced aromatic tomato-garlic gravy. Garnish with fresh cilantro over brown basmati.',
            macros: { protein: 42, carbs: 68, fats: 19, calories: 610 },
            ingredients: [
              { item: 'High-Protein Paneer or Firm Tofu', amount: '200g', calories: 340 },
              { item: 'Brown Basmati Rice', amount: '150g cooked', calories: 170 },
              { item: 'Spiced Tomato Cashew Gravy', amount: '120g', calories: 100 }
            ]
          }
        ]
      },
      {
        planType: 'non-veg',
        name: 'Apex Pro Shred & Build (Non-Vegetarian)',
        description: 'Championship-grade athletic nutrition loaded with lean poultry, wild-caught salmon, egg whites, and strategic complex carbohydrate refeeds.',
        targetGoal: 'cutting',
        dailyCalories: 2250,
        macros: { protein: 215, carbs: 185, fats: 55 },
        healthBenefits: [
          'High bioavailable leucine trigger accelerating Muscle Protein Synthesis (MPS)',
          'Omega-3 EPA/DHA fatty acids reducing system inflammation & protecting joints',
          'High zinc and iron supporting red blood cell oxygenation during heavy training'
        ],
        meals: [
          {
            mealTime: '07:30 AM — Breakfast',
            name: 'Whole Eggs & Egg White Omelet with Sourdough',
            preparation: 'Whisk 2 whole organic eggs with 4 liquid egg whites and spinach. Cook in olive oil spray and serve with toasted artisanal sourdough.',
            macros: { protein: 42, carbs: 36, fats: 14, calories: 440 },
            ingredients: [
              { item: 'Whole Eggs + Liquid Whites', amount: '2 whole + 4 whites', calories: 230 },
              { item: 'Artisanal Sourdough Toast', amount: '2 slices (70g)', calories: 160 },
              { item: 'Baby Spinach & Cherry Tomatoes', amount: '50g', calories: 50 }
            ]
          },
          {
            mealTime: '12:30 PM — Lunch',
            name: 'Grilled Herb Chicken Breast & Roasted Sweet Potatoes',
            preparation: 'Season chicken breast with paprika, oregano, and garlic. Grill until internal temp reaches 165°F. Pair with baked sweet potato cubes and asparagus.',
            macros: { protein: 55, carbs: 52, fats: 11, calories: 530 },
            ingredients: [
              { item: 'Boneless Skinless Chicken Breast', amount: '220g', calories: 260 },
              { item: 'Roasted Sweet Potato', amount: '200g', calories: 180 },
              { item: 'Grilled Asparagus in Olive Oil', amount: '120g', calories: 90 }
            ]
          },
          {
            mealTime: '04:30 PM — Post-Workout Anabolic Shake',
            name: 'Whey Isolate Blast with Blueberries & Creatine',
            preparation: 'Blend pure whey isolate with cold water or skim milk, 5g creatine monohydrate, and frozen wild blueberries.',
            macros: { protein: 35, carbs: 25, fats: 2, calories: 260 },
            ingredients: [
              { item: '100% Whey Protein Isolate', amount: '35g', calories: 130 },
              { item: 'Frozen Blueberries', amount: '100g', calories: 60 },
              { item: 'Creatine Monohydrate', amount: '5g', calories: 0 },
              { item: 'Unsweetened Almond Milk', amount: '300ml', calories: 70 }
            ]
          },
          {
            mealTime: '07:45 PM — Dinner',
            name: 'Pan-Seared Wild Alaskan Salmon & Jasmine Rice',
            preparation: 'Sear salmon skin-down in cast iron until crispy. Serve with steamed fragrant jasmine rice and stir-fried zucchini.',
            macros: { protein: 48, carbs: 48, fats: 18, calories: 550 },
            ingredients: [
              { item: 'Wild Alaskan Salmon Fillet', amount: '200g', calories: 310 },
              { item: 'Steamed Jasmine Rice', amount: '140g cooked', calories: 180 },
              { item: 'Zucchini & Lemon Herb Butter', amount: '100g', calories: 60 }
            ]
          },
          {
            mealTime: '10:00 PM — Nighttime Recovery',
            name: 'Micellar Casein Pudding with Walnuts',
            preparation: 'Mix micellar casein powder with cold water into a thick pudding consistency. Top with crushed raw walnuts.',
            macros: { protein: 32, carbs: 8, fats: 9, calories: 240 },
            ingredients: [
              { item: 'Micellar Casein Powder', amount: '35g', calories: 130 },
              { item: 'Crushed Raw Walnuts', amount: '15g', calories: 100 },
              { item: 'Cinnamon Dusting', amount: '1 pinch', calories: 10 }
            ]
          }
        ]
      },
      {
        planType: 'creative',
        name: 'Apex Keto-Anabolic Hybrid Matrix',
        description: 'Elite ketogenic carb-cycling protocol designed to induce deep nutritional ketosis on rest days while fueling peak neurological drive with healthy fats.',
        targetGoal: 'keto',
        dailyCalories: 2100,
        macros: { protein: 155, carbs: 30, fats: 150 },
        healthBenefits: [
          'Dual-fuel metabolic flexibility utilizing clean ketones and fatty acids',
          'Elimination of insulin spikes for laser focus and sustained mental clarity',
          'Significant cellular autophagy and reduction of systemic oxidative stress'
        ],
        meals: [
          {
            mealTime: '08:00 AM — Breakfast',
            name: 'Bulletproof Keto Omelet with Hass Avocado',
            preparation: 'Cook 3 pasture-raised eggs in grass-fed ghee with baby spinach and aged white cheddar. Serve with half a sliced avocado.',
            macros: { protein: 32, carbs: 6, fats: 42, calories: 530 },
            ingredients: [
              { item: 'Pasture-Raised Whole Eggs', amount: '3 whole', calories: 210 },
              { item: 'Grass-Fed Ghee', amount: '1 tbsp', calories: 120 },
              { item: 'Aged Sharp White Cheddar', amount: '30g', calories: 110 },
              { item: 'Fresh Hass Avocado', amount: '1/2 fruit', calories: 90 }
            ]
          },
          {
            mealTime: '01:00 PM — Lunch',
            name: 'Grass-Fed Beef Burger Bowl with MCT Olive Oil',
            preparation: 'Grill 85/15 grass-fed beef patties. Plate over mixed leafy greens, sliced cucumber, kalamata olives, and drizzle with extra virgin olive oil.',
            macros: { protein: 45, carbs: 8, fats: 48, calories: 640 },
            ingredients: [
              { item: 'Grass-Fed Ground Beef (85/15)', amount: '200g', calories: 420 },
              { item: 'Mixed Greens & Cucumber', amount: '150g', calories: 35 },
              { item: 'Kalamata Olives & Extra Virgin Olive Oil', amount: '2 tbsp', calories: 185 }
            ]
          },
          {
            mealTime: '04:30 PM — Afternoon Sustenance',
            name: 'Macadamia & Dark Cacao Power Crunch',
            preparation: 'Handful of roasted dry macadamia nuts paired with two squares of 90% dark lindt chocolate and unsweetened black espresso.',
            macros: { protein: 8, carbs: 5, fats: 32, calories: 340 },
            ingredients: [
              { item: 'Dry Roasted Macadamia Nuts', amount: '35g', calories: 250 },
              { item: '90% Dark Artisanal Chocolate', amount: '20g', calories: 120 }
            ]
          },
          {
            mealTime: '08:00 PM — Dinner',
            name: 'Pan-Roasted Sea Bass with Garlic Butter & Asparagus',
            preparation: 'Sear sea bass or rainbow trout in grass-fed garlic herb butter. Serve beside charred asparagus spears and cauliflower puree.',
            macros: { protein: 42, carbs: 7, fats: 34, calories: 500 },
            ingredients: [
              { item: 'Fresh Sea Bass Fillet', amount: '220g', calories: 240 },
              { item: 'Grass-Fed Butter & Crushed Garlic', amount: '20g', calories: 150 },
              { item: 'Cauliflower Mash & Asparagus', amount: '150g', calories: 110 }
            ]
          }
        ]
      }
    ];

    const insertedDiets = await Diet.insertMany(dietsData);
    console.log(`Inserted ${insertedDiets.length} Complete Diet Plans!`);

    console.log('----------------------------------------------------');
    console.log('APEX FIT MERN DATABASE SEEDING COMPLETE!');
    console.log(`Workouts: ${insertedWorkouts.length} documents (20+ exercises per doc)`);
    console.log(`Diets: ${insertedDiets.length} documents`);
    console.log('Demo Account: demo@apexfit.com / Demo1234!');
    console.log('----------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
