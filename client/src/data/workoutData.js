// APEX FIT - Athletic Performance Workout Database
// 7 Muscle Groups x 4 Categories (Home, Gym, Stretching, Dumbbell)
// 20+ Detailed Exercises per Category with curated fitness photography

export const muscleGroupMeta = [
  {
    id: 'abs',
    name: 'ABS & CORE',
    emoji: '🎯',
    description: 'Deep abdominal wall, obliques & rotational spinal stability',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'biceps',
    name: 'BICEPS',
    emoji: '💪',
    description: 'Brachialis, short & long head peak development',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'back',
    name: 'BACK & LATS',
    emoji: '🏔️',
    description: 'Latissimus dorsi, rhomboids, trapezius & erector spinae',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'triceps',
    name: 'TRICEPS',
    emoji: '⚡',
    description: 'Lateral, medial & long head arm lockout power',
    image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'chest',
    name: 'CHEST & PECS',
    emoji: '🔥',
    description: 'Clavicular & sternal pectoralis mass & pressing power',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'shoulder',
    name: 'SHOULDERS',
    emoji: '🌟',
    description: 'Anterior, lateral & posterior deltoid 3D capping',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
  {
    id: 'legs',
    name: 'LEGS & GLUTES',
    emoji: '🦵',
    description: 'Quadriceps, hamstrings, gluteals & calf power',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&auto=format&fit=crop&q=80',
    color: 'from-red-600/10 to-red-900/10',
    accent: '#dc2626',
  },
];

export const categoryMeta = [
  {
    id: 'home',
    label: 'Home Workout',
    icon: '🏠',
    description: 'Bodyweight calisthenics & minimal equipment protocols',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'gym',
    label: 'Gym Workout',
    icon: '🏋️',
    description: 'Heavy barbell, cable system & machine hypertrophy',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'stretching',
    label: 'Stretching & Flow',
    icon: '🧘',
    description: 'Joint mobility, tissue decompression & active recovery',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dumbbell',
    label: 'Dumbbell Only',
    icon: '🎯',
    description: 'Free-weight unilateral balance & muscle hypertrophy',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
  },
];

// Curated movement photo pool for high visual relevance
const photoPool = {
  core: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
  ],
  arms: [
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=600&auto=format&fit=crop&q=80',
  ],
  back: [
    'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&auto=format&fit=crop&q=80',
  ],
  chest: [
    'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
  ],
  shoulders: [
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
  ],
  legs: [
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  ],
  stretch: [
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
  ]
};

// 20+ Detailed Drills for each muscle group across all categories
const drillNames = {
  abs: {
    home: [
      "Isometric Forearm Plank", "Dynamic Bicycle Crunches", "High-Tempo Mountain Climbers", "Hollow Body Rock Hold",
      "Floor Reverse Crunches", "Dead Bug Cross Extension", "V-Up Toe Touch", "Flutter Kicks Burnout",
      "Russian Torso Twists", "Side Plank Hip Pulse Left", "Side Plank Hip Pulse Right", "Lying Straight Leg Raises",
      "Scissor Kicks Protocol", "Plank Shoulder Taps", "Plank Hip Dips", "Superman Core Hold",
      "Boat Pose Equilibrium", "Floor Windshield Wipers", "Heel Touch Penguin Crunches", "Bird Dog Stability Hold"
    ],
    gym: [
      "Kneeling Cable Rope Crunch", "Hanging Straight Leg Raise", "Captain's Chair Knee Tuck", "Ab Roller Wheel Extension",
      "Decline Bench Plate Crunch", "Cable Woodchop High-to-Low", "Cable Woodchop Low-to-High", "Dragon Flag Eccentric Descent",
      "Standing Cable Pallof Press", "Plate-Loaded Ab Crunch Machine", "GHD Glute-Ham Sit-Up", "Decline Bench Oblique Twist",
      "Hanging Windshield Wipers", "Stability Ball Stir-the-Pot", "Landmine Anti-Rotation Twist", "Weighted Decline Bench Sit-Up",
      "Heavy Bumper Weighted Plank", "Roman Chair 45-Degree Side Bend", "Cable Knee-to-Chest Pull-In", "Hanging Knee-to-Elbow Touch"
    ],
    stretching: [
      "Cat-Cow Spinal Wave", "Prone Cobra Abdominal Opener", "Upward Facing Dog Arc", "Seated Torso Spinal Twist",
      "Supine Double Knee Drop", "Active Glute Bridge Hold", "Prone Bow Pose Hold", "Camel Pose Thoracic Stretch",
      "Extended Child's Pose Lateral Walk", "Standing Crescent Moon Side Bend", "Low Kneeling Psoas Lunge Stretch", "Thread the Needle Rotation",
      "Dynamic Prone Scorpions", "Standing Torso Arm Swings", "Lying Knee-to-Chest Decompression", "Downward Facing Dog Navel Pull",
      "Sphinx Pose Lumbar Relief", "Side-Lying Quad & Psoas Stretch", "Windmill Hamstring & Core Reach", "Passive Dead Hang Spinal Release"
    ],
    dumbbell: [
      "Weighted Dumbbell Russian Twist", "Single Dumbbell Lateral Side Bend", "Dumbbell Overhead Crunch", "Renegade Push-Up Row",
      "Diagonal Dumbbell Woodchopper", "Single-Arm Dumbbell Waiter Carry", "Suitcase Unilateral Carry", "Dumbbell Overhead Windmill",
      "Dumbbell Turkish Get-Up Core Phase", "Weighted V-Up with Light Dumbbell", "Dumbbell Pullover to Crunch", "Side Plank Dumbbell Hip Lift",
      "Dumbbell Bear Crawl Hold", "Single-Arm Push Press Lockout", "Dumbbell Feet-Pinch Reverse Crunch", "Weighted Hollow Body Hold",
      "Dumbbell T-Pushup Rotation", "Heavy Dumbbell Farmer's Walk", "Deep Goblet Squat Core Pulse", "Dumbbell Dead Bug Extension"
    ]
  },
  biceps: {
    home: [
      "Underhand Doorframe Inverted Row", "Underhand Chin-Up Peak", "Backpack Bicep Curl", "Towel Door Resistance Curl",
      "Isometric Wall Bicep Hold", "Resistance Band Concentration Curl", "Flexed Arm Hang Lockout", "Negative Chin-Up 5-Sec Descent",
      "Table Underhand Inverted Row", "Chair Bicep Pull-In", "Isometric Towel Curl", "Band Hammer Curl",
      "Single-Arm Door Jamb Pull", "Band Cross-Body Curl", "Reverse Bicep Dips", "Plank Bicep Pushback",
      "Band Preacher Curl on Chair", "Underhand Pull-Up Pulses", "Isometric Flexion Peak", "Dynamic Tension Arm Swings"
    ],
    gym: [
      "Barbell Bicep Curl", "Incline Dumbbell Curl", "EZ-Bar Preacher Curl", "Cable Rope Hammer Curl",
      "Concentration Curl on Bench", "Incline Spider Curl", "Standing Cable Bicep Curl", "Dumbbell Zottman Curl",
      "High Cable Double Bicep Curl", "Machine Bicep Curl", "Seated Alternating Dumbbell Curl", "Reverse Grip EZ-Bar Curl",
      "21s Bicep Protocol", "Bayesian Cable Curl", "Cross-Body Cable Curl", "Behind-the-Back Cable Curl",
      "Smith Machine Drag Curl", "Overhead Cable Bicep Curl", "Weighted Plate Waiter Curl", "Cheat Barbell Curl (Controlled Eccentric)"
    ],
    stretching: [
      "Wall Bicep Extensor Stretch", "Doorframe Arm Stretch", "Behind-the-Back Hand Clasp", "Seated Floor Palm-Down Stretch",
      "Prone Arm Extension Stretch", "Overhead Arm & Lat Sweep", "Wrist Extensor Counter Stretch", "Standing Reverse Arm Clasp",
      "Horizontal Dynamic Arm Swings", "Kneeling Bicep Palm-Down Stretch", "Table-Edge Forearm Mobilizer", "Eagle Arms Bicep Release",
      "Thread the Needle Bicep Stretch", "Standing Cross-Chest Counter", "Wall Slide Arm Flexor Release", "Band Assisted Arm Extension",
      "Downward Dog Bicep Alignment", "Side-Lying Arm Opener", "Gentle Bicep Traction Hang", "Prayer Pose Reverse Wrist Stretch"
    ],
    dumbbell: [
      "Alternating Standing Dumbbell Curl", "Incline Dumbbell Curl", "Neutral Grip Dumbbell Hammer Curl", "Seated Dumbbell Concentration Curl",
      "Dumbbell Preacher Curl", "Dumbbell Zottman Curl", "Incline Dumbbell Spider Curl", "Seated Inner-Bicep Curl",
      "Standing Dumbbell Drag Curl", "Cross-Body Dumbbell Hammer Curl", "Two-Handed Dumbbell Waiter Curl", "Single-Arm Dumbbell Scott Curl",
      "Incline Hammer Curl", "Dumbbell 21s Protocol", "Dumbbell Reverse Grip Curl", "Prone Incline Bicep Curl",
      "Offset Grip Dumbbell Curl", "Standing Supinated Dumbbell Curl", "Dumbbell Isometric Peak Hold", "Dumbbell Bicep Burnout Pulses"
    ]
  },
  back: {
    home: [
      "Wide-Grip Pull-Up", "Underhand Chin-Up", "Table Underhand Inverted Row", "Prone Back Extension (Superman)",
      "Reverse Snow Angels", "Bird Dog Stability Balance", "Doorframe Lat Rows", "Prone Y-T-W Scapular Raises",
      "Towel Floor Lat Pulldown", "Prone Swimmers Flutter", "Wall Slides Scapular Retraction", "Arch Body Prone Hold",
      "Bodyweight Good Morning", "Single-Leg Bodyweight Hinge", "Bridge Scapular Retraction", "Prone Cobra Spine Hold",
      "Backpack Bent-Over Row", "Isometric Doorway Lats Push", "Band Pull-Aparts", "Band Seated Lat Row"
    ],
    gym: [
      "Conventional Barbell Deadlift", "Bent-Over Barbell Row", "Wide-Grip Lat Pulldown", "Seated Cable Row (V-Bar)",
      "Chest-Supported T-Bar Row", "Heavy Single-Arm Dumbbell Row", "Chest-Supported Machine Row", "Barbell Rack Pull",
      "Neutral Grip Lat Pulldown", "Straight-Arm Cable Pulldown", "Meadows Row on Landmine", "Pendlay Barbell Row",
      "Assisted Pull-Up Machine", "45-Degree Hyperextension Bench", "Reverse-Grip Lat Pulldown", "High-to-Low Cable Lat Row",
      "Smith Machine Bent-Over Row", "Incline Bench Dumbbell Seal Row", "Low Cable Row with Wide Handle", "Trap Bar Deadlift (High Handles)"
    ],
    stretching: [
      "Cat-Cow Spinal Wave", "Child's Pose with Lateral Lat Reach", "Seated Spinal Twist", "Thoracic Spine Foam Rolling",
      "Doorframe Lat Stretch", "Downward Facing Dog", "Double Knee-to-Chest Hug", "Supine Spinal Twist",
      "Standing Side Bend Lat Stretch", "Thread the Needle Upper Back Stretch", "Puppy Pose Melting Heart", "Prone Cobra Back Opener",
      "Overhead Band Shoulder Dislocates", "Scapular Wall Angels", "Figure-Four Lower Back Relief", "Lying Hamstring & Lumbar Release",
      "Standing Forward Fold Decompression", "Passive Dead Hang for Spine", "Quadruped Thoracic Rotation", "Sphinx Pose Lower Lumbar Release"
    ],
    dumbbell: [
      "Single-Arm Heavy Dumbbell Row", "Two-Arm Bent-Over Dumbbell Row", "Dumbbell Romanian Deadlift", "Chest-Supported Incline Dumbbell Row",
      "Dumbbell Lat Pullover", "Dumbbell Renegade Rows", "Heavy Dumbbell Shrugs", "Incline Bench Dumbbell Y-Raise",
      "Conventional Dumbbell Deadlift", "Dumbbell Good Morning", "Incline Bench Dumbbell Seal Row", "Single-Arm Dumbbell Suitcase Deadlift",
      "Dumbbell Lawn Mower Pull", "Dumbbell High Row", "Kroc Rows High Volume", "Dumbbell Sumo Deadlift",
      "Bent-Over Dumbbell Rear Delt Fly", "Dumbbell Farmer's Carry", "Dumbbell Suitcase Deadlift", "Dumbbell Gorilla Row"
    ]
  },
  triceps: {
    home: [
      "Diamond Triangle Push-Up", "Bench / Chair Bodyweight Dip", "Bodyweight Wall Tricep Extension", "Close-Grip Military Push-Up",
      "Pike Push-Up to Extension", "Floor Tricep Dips", "Plank-to-Pushup Military Switch", "Tiger Bend Floor Push-Up",
      "Reverse Grip Push-Up", "Elevated Feet Chair Dip", "Towel Overhead Tricep Extension", "Isometric Wall Tricep Press",
      "Single-Arm Floor Tricep Extension", "Decline Close-Grip Push-Up", "Pseudo Planche Tricep Press", "Resistance Band Overhead Extension",
      "Band Tricep Pushdown", "Band Tricep Kickback", "Incline Diamond Push-Up on Couch", "Floor Skull Crusher Bodyweight"
    ],
    gym: [
      "Cable Rope Tricep Pushdown", "Close-Grip Barbell Bench Press", "Lying EZ-Bar Skull Crusher", "Overhead Cable Rope Extension",
      "Seated Overhead Heavy Dumbbell Extension", "Cable Straight Bar Pushdown", "Parallel Bar Weighted Dips", "Plate-Loaded Machine Tricep Dip",
      "Barbell JM Press", "Reverse Grip Cable Pushdown", "Single-Arm Cable Tricep Extension", "Tate Press on Flat Bench",
      "Cable Kickback with Cuff", "Dumbbell Skull Crusher on Bench", "Close-Grip Barbell Floor Press", "Incline EZ-Bar Skull Crusher",
      "Smith Machine Close-Grip Press", "Seated French Press EZ-Bar", "Overhead Rope Cable Extension", "Cross-Body Cable Extension"
    ],
    stretching: [
      "Overhead Tricep Towel Stretch", "Cross-Body Tricep Stretch", "Wall Tricep Press Stretch", "Behind-the-Neck Tricep Pull",
      "Doorframe Tricep & Lat Stretch", "Eagle Arms Scapular Stretch", "Cow Face Arms (Gomukhasana)", "Seated Tricep Arm-Behind-Back",
      "Standing Overhead Tricep Lean", "Puppy Pose with Elbows Bent", "Tabletop Reverse Arm Extension", "Downward Dog Tricep Alignment",
      "Dynamic Arm Swings Vertical", "Reverse Prayer Wrist Stretch", "Band Assisted Overhead Stretch", "Foam Roll Tricep Lateral Head",
      "Child's Pose Hands Behind Head", "Standing Wall Slide Tricep Release", "Interlaced Overhead Reach", "Gentle Elbow Flexion Mobilizer"
    ],
    dumbbell: [
      "Overhead Two-Handed Dumbbell Extension", "Single-Arm Dumbbell Tricep Kickback", "Lying Dumbbell Skull Crusher", "Close-Grip Dumbbell Flat Bench Press",
      "Single-Arm Overhead Dumbbell Extension", "Flat Bench Dumbbell Tate Press", "Incline Dumbbell Skull Crusher", "Neutral Grip Dumbbell Floor Press",
      "Dumbbell JM Press", "Prone Incline Dumbbell Kickback", "Standing Two-Handed Dumbbell Extension", "Decline Dumbbell Skull Crusher",
      "Dumbbell Rolling Tricep Extension", "Prone Kickback on Incline Bench", "Floor Dips with Dumbbell on Lap", "Hex Press Squeeze Lockout",
      "Cross-Body Dumbbell Tricep Extension", "Seated Overhead Dumbbell Press", "Dumbbell Tricep Pushback Hold", "Dumbbell Tricep Burnout Pulses"
    ]
  },
  chest: {
    home: [
      "Standard Military Push-Up", "Wide-Grip Chest Push-Up", "Diamond Chest Push-Up", "Decline Push-Up (Feet Elevated)",
      "Incline Push-Up (Hands Elevated)", "Archer Chest Push-Up", "Typewriter Lateral Push-Up", "Clapping Explosive Push-Up",
      "Slow Negative Push-Up (5 sec)", "Staggered Hand Push-Up", "Isometric Floor Chest Squeeze", "Dive Bomber Push-Up",
      "Hindu Push-Up Arc", "Single-Arm Supported Push-Up", "Wall Push-Up for High Reps", "Resistance Band Chest Press",
      "Resistance Band Chest Fly", "Bed-Sheet Chest Fly", "Isometric Prayer Squeeze", "Hover Push-Up Bottom Hold"
    ],
    gym: [
      "Flat Barbell Bench Press", "Incline Dumbbell Bench Press", "Decline Barbell Bench Press", "Standing Cable Chest Fly (Mid Pulley)",
      "Low-to-High Cable Upper Fly", "High-to-Low Cable Lower Fly", "Pec Deck Machine Fly", "Plate-Loaded Machine Chest Press",
      "Chest-Focused Parallel Bar Dips", "Incline Barbell Bench Press", "Close-Grip Barbell Bench Press", "Smith Machine Incline Press",
      "Weight Plate Svend Press", "Heavy Dumbbell Floor Press", "Landmine Angled Chest Press", "Weighted Parallel Bar Dips",
      "Incline Bench Cable Fly", "Flat Bench Dumbbell Fly", "Seated Incline Machine Press", "Smith Machine Guillotine Press"
    ],
    stretching: [
      "Doorframe Pec Stretch (90-Degree)", "Doorframe Pec Stretch (120-Degree)", "Standing Chest Clasp & Expansion", "Prone Chest T-Stretch",
      "Foam Roller Longitudinal Chest Opener", "Cobra Pose Chest Lift", "Camel Pose Heart Opener", "Bow Pose (Dhanurasana)",
      "Fish Pose (Matsyasana)", "Child's Pose with Wide Arms", "Standing Corner Chest Stretch", "Cross-Body Scapular Counter",
      "Overhead Band Chest Dislocate", "Sphinx Pose Chest Lift", "Tabletop Reverse Bridge Opener", "Seated Clasp Heart Opener",
      "Dynamic Arm Hug Swings", "Wall Angel Scapular Glides", "Side-Lying Pec Stretch", "Bridge Pose with Interlaced Fingers"
    ],
    dumbbell: [
      "Flat Dumbbell Bench Press", "Incline Dumbbell Bench Press", "Decline Dumbbell Bench Press", "Flat Dumbbell Chest Fly",
      "Incline Dumbbell Chest Fly", "Dumbbell Pullover for Ribcage", "Dumbbell Hex Press (Squeeze Press)", "Single-Arm Dumbbell Flat Press",
      "Dumbbell Floor Press", "Dumbbell Around-the-Worlds", "Decline Dumbbell Fly", "Incline Dumbbell Squeeze Press",
      "Dumbbell Svend Press", "Alternating Incline Dumbbell Press", "Neutral Grip Flat Dumbbell Press", "Dumbbell Twisting Bench Press",
      "Low Incline Dumbbell Press", "Dumbbell Push-Up to Row", "Wide-to-Narrow Dumbbell Press", "Dumbbell Fly with Static Squeeze Peak"
    ]
  },
  shoulder: {
    home: [
      "Pike Push-Up for Deltoids", "Feet-Elevated Pike Push-Up", "Wall-Assisted Handstand Hold", "Wall Handstand Push-Up",
      "Prone Y-T-W Scapular Raises", "Scapular Push-Up Protraction", "Plank to Downward Dog Press", "Doorframe Lateral Deltoid Pull",
      "Arm Circles Forward & Reverse", "Resistance Band Overhead Press", "Band Lateral Deltoid Raise", "Band Front Deltoid Raise",
      "Band Face Pulls with Squeeze", "Band Pull-Aparts", "Bear Crawl Shoulder Burnout", "Crab Walk Shoulder Mobility",
      "Plank Shoulder Taps", "Dolphin Pose Deltoid Hold", "Wall Climbs into Handstand", "Isometric Wall Deltoid Push"
    ],
    gym: [
      "Standing Barbell Overhead Press (OHP)", "Seated Dumbbell Shoulder Press", "Arnold Dumbbell Press", "Cable Lateral Deltoid Raise",
      "Cable Rope Face Pulls", "Standing Barbell Upright Row", "Reverse Pec Deck Machine (Rear Delts)", "Smith Machine Overhead Press",
      "Plate-Loaded Machine Shoulder Press", "Bumper Plate Front Raise", "Cable Single-Arm Front Raise", "High Cable Rear Delt Crossover",
      "Barbell Push Press", "Behind-the-Neck Barbell Press", "Single-Arm Landmine Shoulder Press", "Bradford Barbell Press",
      "Cable Upright Row", "Heavy Barbell Shrugs", "Incline Bench Dumbbell Rear Delt Row", "Plate Lu Raises"
    ],
    stretching: [
      "Cross-Body Deltoid Stretch", "Overhead Shoulder & Tricep Reach", "Doorframe Anterior Deltoid Stretch", "Behind-the-Back Shoulder Rotation",
      "Eagle Arms Scapular Stretch", "Thread the Needle", "Cow Face Arms (Gomukhasana)", "Child's Pose with Arm Elevation",
      "Puppy Pose Shoulder Opener", "Standing Wall Angels", "Prone T-Stretch for Shoulders", "Downward Facing Dog Shoulder Push",
      "Overhead Band Dislocates", "Foam Roller Thoracic & Rear Delt Release", "Standing Arm Swings Across Body", "Dynamic Shoulder Shrugs & Rolls",
      "Tabletop Reverse Shoulder Opener", "Bow Pose Shoulder Flexion", "Wall Overhead Slide", "Gentle Neck & Upper Trap Stretch"
    ],
    dumbbell: [
      "Seated Dumbbell Shoulder Press", "Standing Overhead Dumbbell Press", "Arnold Press", "Standing Dumbbell Lateral Raise",
      "Dumbbell Front Deltoid Raise", "Bent-Over Dumbbell Rear Delt Fly", "Dumbbell Upright Row", "Heavy Dumbbell Shrugs",
      "Single-Arm Dumbbell Push Press", "Dumbbell Cuban Press", "Incline Bench Dumbbell Rear Delt Raise", "Dumbbell 6-Way Shoulder Raises",
      "Incline Dumbbell Y-Raise", "Dumbbell Waiter Walk", "Alternating Front-to-Lateral Raise", "Dumbbell Clean and Press",
      "Dumbbell Windmill for Shoulder Stability", "Seated Lean-Away Lateral Raise", "Dumbbell Scaption Raise", "Dumbbell Shoulder Burnout Pulses"
    ]
  },
  legs: {
    home: [
      "Bodyweight Air Squats", "Explosive Jump Squats", "Walking Bodyweight Lunges", "Reverse Deficit Lunges",
      "Bulgarian Split Squats (Chair)", "Glute Bridges", "Single-Leg Glute Bridges", "Wide Stance Sumo Squats",
      "Calf Raises on Step", "Single-Leg Calf Raises", "Wall Sit Isometric Hold (60 sec)", "Assisted Pistol Squats",
      "Step-Ups on Sturdy Chair", "Curtsy Lunges", "Lateral Side Lunges", "Nordic Hamstring Curl (Assisted)",
      "Single-Leg Romanian Bodyweight Hinge", "Donkey Kicks & Fire Hydrants", "Jump Split Lunges", "Bottom Squat Pulses"
    ],
    gym: [
      "Barbell Back Squat", "Barbell Front Squat", "45-Degree Leg Press", "Barbell Romanian Deadlift",
      "Leg Extension Machine", "Lying Leg Curl Machine", "Seated Leg Curl Machine", "Barbell Hip Thrust on Bench",
      "Hack Squat Machine", "Standing Calf Raise Machine", "Seated Calf Raise Machine", "Walking Barbell Lunges",
      "Sumo Barbell Deadlift", "Barbell Good Mornings", "Hip Adductor Machine", "Hip Abductor Machine",
      "Smith Machine Squat", "Glute-Ham Developer (GHD) Raise", "Safety Bar Squat", "Trap Bar Deadlift (Leg Focused)"
    ],
    stretching: [
      "Standing Quad Stretch", "Seated Forward Bend Hamstring Stretch", "Lizard Pose Deep Hip Opener", "Pigeon Pose Glute Stretch",
      "Butterfly Pose Adductor Stretch", "Figure-Four Glute Stretch (Supine)", "Downward Facing Dog Calf Stretch", "Standing Calf Stretch at Wall",
      "Half-Kneeling Hip Flexor Stretch", "Frog Pose Deep Groin Stretch", "IT Band Standing Cross Stretch", "Lying Hamstring Stretch with Strap",
      "Reclined Bound Angle Pose", "Low Lunge with Quad Pull", "Couch Stretch for Rectus Femoris", "Seated Wide-Leg Straddle Fold",
      "Happy Baby Pose", "Deep Asian Squat Mobility Hold", "Ankle Joint Dorsiflexion Mobilizer", "Foam Rolling IT Band & Quads"
    ],
    dumbbell: [
      "Goblet Squat with Heavy Dumbbell", "Dumbbell Romanian Deadlift", "Dumbbell Bulgarian Split Squat", "Dumbbell Walking Lunges",
      "Dumbbell Sumo Squats", "Dumbbell Step-Ups", "Dumbbell Hip Thrust on Bench", "Single-Leg Dumbbell Deadlift",
      "Dumbbell Lateral Lunges", "Dumbbell Reverse Lunges", "Dumbbell Calf Raises (Both Legs)", "Single-Leg Dumbbell Calf Raise",
      "Dumbbell Front Squat (Shoulder Racked)", "Dumbbell Curtsy Lunges", "Dumbbell Hamstring Curl (Lying)", "Dumbbell Glute Bridge with Plate",
      "Dumbbell Box Squat", "Dumbbell Jump Squats", "Dumbbell Suitcase Squat", "Dumbbell 1.5 Rep Squat Protocol"
    ]
  }
};

function getPoolPhoto(muscle, category, idx) {
  if (category === 'stretching') {
    return photoPool.stretch[idx % photoPool.stretch.length];
  }
  if (muscle === 'abs') return photoPool.core[idx % photoPool.core.length];
  if (muscle === 'biceps' || muscle === 'triceps') return photoPool.arms[idx % photoPool.arms.length];
  if (muscle === 'back') return photoPool.back[idx % photoPool.back.length];
  if (muscle === 'chest') return photoPool.chest[idx % photoPool.chest.length];
  if (muscle === 'shoulder') return photoPool.shoulders[idx % photoPool.shoulders.length];
  return photoPool.legs[idx % photoPool.legs.length];
}

import exerciseFrames from './exerciseFrames.json';

// High-performance animated exercise GIFs mapped specifically for biomechanical accuracy
export const exerciseGifs = {
  plank: 'https://media.giphy.com/media/3o6Zt6ML6Bkl5NZ44M/giphy.gif',
  crunch: 'https://media.giphy.com/media/3o7TKDkDbzvU984n9C/giphy.gif',
  climber: 'https://media.giphy.com/media/3o7TKqgqY96e6z167u/giphy.gif',
  leg_raise: 'https://media.giphy.com/media/l2SpZkQ0XT1XtKus0/giphy.gif',
  v_up: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
  ab_roller: 'https://media.giphy.com/media/3o7TKU8Evm275003EQ/giphy.gif',
  pushup: 'https://media.giphy.com/media/l4KibWpBGWchSqCRy/giphy.gif',
  diamond_pushup: 'https://media.giphy.com/media/26FPnsRww5znZY236/giphy.gif',
  bench_press: 'https://media.giphy.com/media/3o7TKW5n33kL4O60Te/giphy.gif',
  curl: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
  hammer_curl: 'https://media.giphy.com/media/3o7TKN9twDT0cGoxmk/giphy.gif',
  dip: 'https://media.giphy.com/media/xT5LMB37bTq5Mg1j8I/giphy.gif',
  tricep_pushdown: 'https://media.giphy.com/media/3o7TKMwJ39ddIs8V4k/giphy.gif',
  pullup: 'https://media.giphy.com/media/3o6Zt8iJ600Z56Bw88/giphy.gif',
  row: 'https://media.giphy.com/media/3o7TKxOzW457cbvye4/giphy.gif',
  superman: 'https://media.giphy.com/media/3o7TKv6MgQFDwkkGyQ/giphy.gif',
  squat: 'https://media.giphy.com/media/3o7TKMEJ055D0l0d56/giphy.gif',
  lunge: 'https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif',
  swing: 'https://media.giphy.com/media/3o85xAYQLOhSrmINJS/giphy.gif',
  stretch: 'https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif',
  warmup: 'https://media.giphy.com/media/l0HlADMMQFBKhoGVW/giphy.gif'
};

export function getExerciseGif(name, muscle, category) {
  const n = (name || '').toLowerCase();
  if (category === 'stretching' || n.includes('stretch') || n.includes('twist') || n.includes('pose') || n.includes('cat-cow') || n.includes('dog') || n.includes('release') || n.includes('mobil')) {
    return exerciseGifs.stretch;
  }
  if (n.includes('plank') || n.includes('hold') || n.includes('hollow') || n.includes('tuck') || n.includes('dead bug')) return exerciseGifs.plank;
  if (n.includes('crunch') || n.includes('twist') || n.includes('woodchop') || n.includes('pallof') || n.includes('heel touch')) return exerciseGifs.crunch;
  if (n.includes('climber') || n.includes('mountain') || n.includes('bear crawl')) return exerciseGifs.climber;
  if (n.includes('leg raise') || n.includes('flutter') || n.includes('scissor') || n.includes('wiper') || n.includes('leg pull')) return exerciseGifs.leg_raise;
  if (n.includes('v-up') || n.includes('toe touch') || n.includes('sit-up') || n.includes('sit up')) return exerciseGifs.v_up;
  if (n.includes('roller') || n.includes('wheel') || n.includes('stir-the-pot')) return exerciseGifs.ab_roller;
  if (n.includes('diamond push') || n.includes('close-grip') || n.includes('pseudo planche')) return exerciseGifs.diamond_pushup;
  if (n.includes('push-up') || n.includes('push up') || n.includes('pushup')) return exerciseGifs.pushup;
  if (n.includes('bench press') || n.includes('chest press') || n.includes('dumbbell fly') || n.includes('cable fly') || n.includes('incline press') || n.includes('pec deck')) return exerciseGifs.bench_press;
  if (n.includes('hammer curl')) return exerciseGifs.hammer_curl;
  if (n.includes('curl') || n.includes('preacher') || n.includes('zottman') || n.includes('spider') || n.includes('21s') || n.includes('bayesian') || n.includes('scott')) return exerciseGifs.curl;
  if (n.includes('dip') || n.includes('skull crusher')) return exerciseGifs.dip;
  if (n.includes('pushdown') || n.includes('kickback') || n.includes('tricep extension') || n.includes('overhead extension')) return exerciseGifs.tricep_pushdown;
  if (n.includes('pull-up') || n.includes('chin-up') || n.includes('pulldown') || n.includes('lat pull') || n.includes('inverted row')) return exerciseGifs.pullup;
  if (n.includes('row') || n.includes('deadlift') || n.includes('shrug') || n.includes('good morning') || n.includes('rack pull')) return exerciseGifs.row;
  if (n.includes('superman') || n.includes('hyperextension') || n.includes('swimmer') || n.includes('angel') || n.includes('bird dog') || n.includes('bridge')) return exerciseGifs.superman;
  if (n.includes('squat') || n.includes('jump squat') || n.includes('box squat') || n.includes('goblet') || n.includes('hack squat') || n.includes('leg press')) return exerciseGifs.squat;
  if (n.includes('lunge') || n.includes('split squat') || n.includes('step-up') || n.includes('calf raise') || n.includes('curtsy')) return exerciseGifs.lunge;
  if (n.includes('swing') || n.includes('clean') || n.includes('snatch') || n.includes('farmer') || n.includes('carry')) return exerciseGifs.swing;
  
  if (muscle === 'abs') return exerciseGifs.crunch;
  if (muscle === 'biceps') return exerciseGifs.curl;
  if (muscle === 'triceps') return exerciseGifs.tricep_pushdown;
  if (muscle === 'chest') return exerciseGifs.pushup;
  if (muscle === 'back') return exerciseGifs.row;
  if (muscle === 'shoulder') return exerciseGifs.bench_press;
  if (muscle === 'legs') return exerciseGifs.squat;
  return exerciseGifs.warmup;
}

// Generate the full matrix of 28 workout documents (7 muscle groups x 4 categories)
export const fallbackWorkouts = {};

const muscleList = ['abs', 'biceps', 'back', 'triceps', 'chest', 'shoulder', 'legs'];
const catList = ['home', 'gym', 'stretching', 'dumbbell'];

muscleList.forEach((muscle) => {
  fallbackWorkouts[muscle] = {};
  catList.forEach((category) => {
    const names = (drillNames[muscle] && drillNames[muscle][category]) || [];
    
    fallbackWorkouts[muscle][category] = {
      name: `${muscle.toUpperCase()} — ${category.toUpperCase()} PROTOCOL`,
      description: `Comprehensive athletic ${category} programming for peak ${muscle} activation and hypertrophy.`,
      difficulty: category === 'stretching' ? 'beginner' : (category === 'gym' ? 'advanced' : 'intermediate'),
      duration: category === 'stretching' ? 25 : (category === 'gym' ? 55 : 45),
      caloriesBurn: category === 'stretching' ? 120 : (category === 'gym' ? 450 : 340),
      exercises: names.map((name, i) => {
        const photo = getPoolPhoto(muscle, category, i);
        const animGif = getExerciseGif(name, muscle, category);
        const frames = (exerciseFrames[muscle] && exerciseFrames[muscle][category] && exerciseFrames[muscle][category][name]) || [photo, photo];
        return {
          name,
          reps: category === 'stretching' ? '30-45 sec hold' : (i % 2 === 0 ? '10-12 reps' : '12-15 reps'),
          sets: category === 'stretching' ? 2 : (i < 4 ? 4 : 3),
          duration: category === 'stretching' ? '45 sec' : '60 sec',
          restTime: category === 'stretching' ? 20 : (category === 'gym' ? 75 : 45),
          imageUrl: frames[0] || photo,
          gifUrl: animGif,
          frames: frames,
          staticFallback: photo,
          instructions: `Perform ${name} with strict biomechanical control. Focus on full stretch at bottom, peak target contraction, and a controlled 2-3 second lowering phase.`,
          targetMuscles: [muscle.toUpperCase(), `${muscle.toUpperCase()} Stabilizers`],
          tips: [
            `Maintain strict posture throughout ${name}`,
            'Exhale on exertion, inhale during the controlled negative',
            'Avoid momentum or compensation from secondary muscle groups'
          ]
        };
      })
    };
  });
});

export const exerciseFallbackData = fallbackWorkouts;
