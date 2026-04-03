export interface Meal {
  name: string
  food: string
  protein: string
}

export interface WorkbookPrompt {
  id: string
  label: string
  type: 'text' | 'textarea' | 'list'
  count?: number
  placeholder?: string
}

export interface WorkbookContent {
  intro?: string
  items?: string[]
}

export interface DayData {
  num: number
  title: string
  subtitle: string
  color: string
  bgGradient: string
  emoji: string
  lesson: string
  challengeTask: string
  keyInsight: string
  proteinTip: string
  reflectionPrompt: string
  checklist: string[]
  rewardItem: RewardItem
  workbookContent?: WorkbookContent
  workbookPrompts: WorkbookPrompt[]
}

export interface RewardItem {
  id: string
  name: string
  emoji: string
  description: string
  xpValue: number
}

export const CHALLENGE_DAYS: DayData[] = [
  {
    num: 1,
    title: 'Notice Where Protein Is Missing',
    subtitle: 'Awareness before action',
    color: '#07b0a4',
    bgGradient: 'from-teal-500 to-teal-600',
    emoji: '🔍',
    lesson: `This challenge is here to make protein easier, simpler, and more practical.

When protein is low, hunger and cravings usually feel worse. Protein helps meals feel more satisfying, supports muscle repair, and makes it easier to stay consistent with your goals.

Most busy women over 30 are under-eating protein — not because they're lazy, but because nobody ever showed them what fuelling for their actual goals looks like.

Today is not about changing anything. It's about seeing clearly where you actually are.`,
    challengeTask: "Track everything you eat today WITHOUT changing a single thing. Look at your Breakfast, Lunch, Dinner, and Snacks. Notice where protein is already showing up — and where it is missing. This is about getting honest so you know what to improve next.",
    keyInsight: 'Small awareness creates big momentum. You can\'t fix what you can\'t see. Today is pure, judgment-free awareness — just data.',
    proteinTip: '🎯 Goal to work toward: 30g of protein at each meal\n\n🍗 Chicken breast (4 oz cooked) ≈ 30–35g\n🥛 Greek yogurt (170g) ≈ 15–18g\n🧀 Cottage cheese (225g) ≈ 25g\n🥚 2 large eggs ≈ 12g\n🥤 Protein shake ≈ 25g\n🫘 Lentils (198g cooked) ≈ 18g',
    reflectionPrompt: 'Where was protein lowest today — breakfast, lunch, dinner, or snacks?\n\nWhat is one simple fix you can make tomorrow?',
    checklist: [
      'I tracked everything I ate today',
      'I looked at protein across all my meals',
      'I identified where protein was lowest',
      'I did not judge myself — just observed',
      'I\'m showing up for all 7 days 💪',
    ],
    rewardItem: {
      id: 'awareness_gem',
      name: 'Awareness Gem',
      emoji: '🔮',
      description: 'You opened your eyes. That\'s how every transformation begins.',
      xpValue: 75,
    },
    workbookPrompts: [
      { id: 'protein_lowest', label: 'Where was protein lowest today?', type: 'textarea', placeholder: 'e.g. Breakfast — I just had coffee and toast...' },
      { id: 'simple_fix', label: 'What is one simple fix I can make tomorrow?', type: 'textarea', placeholder: 'e.g. Add Greek yogurt to my morning...' },
    ],
  },
  {
    num: 2,
    title: 'Set Your Protein Standard',
    subtitle: 'One number. One rule.',
    color: '#07b0a4',
    bgGradient: 'from-teal-500 to-teal-700',
    emoji: '🎯',
    lesson: `You do not need a complicated plan to start making progress. You need a simple standard.

For this challenge, aim for 25–30g of protein at 3 meals per day. That's it.

Consistency with a "good enough" number will always beat perfection with a number you forget by Wednesday.

Today you set your standard — and you actually try to hit it for the first time.`,
    challengeTask: 'Set your daily protein goal right now (use the goal field below). Then build your meals today with 25–30g of protein at each of your 3 main meals.',
    keyInsight: 'A number you can remember is worth more than a perfect number you abandon by Thursday.',
    proteinTip: '📋 Protein Cheat Sheet\n\n🥛 Greek yogurt (170g) → 15–18g\n🧀 Cottage cheese (225g) → 25g\n🥚 2 large eggs (100g) → 12g\n🍳 Egg whites (250g) → 25g\n🍗 Chicken breast (4oz cooked) → 30–35g\n🫘 Lentils (198g cooked) → 18g\n🫛 Edamame (155g) → 17g\n🧆 Extra firm tofu (113g) → 10–14g\n🧀 String cheese (1 stick) → 6–8g\n🫘 Chickpeas (164g) → 14–15g\n\n💡 Tip: Always check your label — protein varies by brand and serving size.',
    reflectionPrompt: 'My protein rule this week is:\n\nThe meal I want to improve first is:\n\nThe protein source I\'ll use most this week is:',
    checklist: [
      'I set my daily protein goal (25–30g per meal)',
      'I aimed for protein at all 3 meals today',
      'I used the cheat sheet to make a choice faster',
      'I tracked all my meals today',
      'I completed my Day 2 reflection',
    ],
    rewardItem: {
      id: 'goal_shield',
      name: 'Goal Shield',
      emoji: '🛡️',
      description: 'Your standard is set. Now you have something to protect.',
      xpValue: 80,
    },
    workbookContent: {
      intro: 'For this challenge, aim for 25–30g of protein at 3 meals per day. You do not need a complicated plan — just a simple standard you can remember.',
    },
    workbookPrompts: [
      { id: 'protein_rule', label: 'My protein rule this week is:', type: 'text', placeholder: 'e.g. I will eat 2 egg whites at every meal' },
      { id: 'improve_first', label: 'The meal I want to improve first is:', type: 'text', placeholder: 'e.g. Breakfast' },
      { id: 'protein_source', label: 'The protein source I\'ll use most this week is:', type: 'text', placeholder: 'e.g. Greek yogurt, chicken, eggs...' },
    ],
  },
  {
    num: 3,
    title: 'Fix Breakfast First',
    subtitle: 'Your easiest protein win',
    color: '#C8F53A',
    bgGradient: 'from-lime to-lime-dark',
    emoji: '🌅',
    lesson: `When your morning has enough protein, the whole day gets easier. You stay fuller longer, the 3pm crash is quieter, and you make better choices at lunch because you're not starving.

Most women skip protein at breakfast — not on purpose, but because it's the meal with the least structure. Toast, fruit, coffee. Maybe a bar on the run. That's 5–8g when you need 25–30g to start the day right.

You only need ONE go-to breakfast. Not 10 healthy recipes on Pinterest. Just one you can make on autopilot — including on a Tuesday when you have a 7am call.`,
    challengeTask: 'Choose ONE high-protein breakfast from the options below and have it today. Pick whichever one you\'d actually make on a busy morning. Then write down your go-to and the ingredients you need.',
    keyInsight: 'Repeatable beats perfect. One breakfast you make on autopilot is worth more than ten you\'ll never cook.',
    proteinTip: '☀️ Easy High-Protein Breakfast Ideas\n\n• Greek yogurt bowl with berries and protein granola\n• Eggs + egg whites + toast\n• Cottage cheese bowl with fruit\n• Protein smoothie\n• Overnight oats with protein powder\n• Breakfast wrap with eggs and turkey\n• Greek yogurt + chia + nuts\n• Egg bites + fruit\n• Protein oatmeal\n• Smoothie + hard-boiled eggs\n\n🎯 Goal: 25–30g protein at breakfast',
    reflectionPrompt: 'My go-to breakfast this week is:\n\nIngredients I need to have ready:\n\nWhat makes this realistic for my actual schedule?',
    checklist: [
      'I had a high-protein breakfast (25g+)',
      'I logged my breakfast protein amount',
      'I chose my personal go-to breakfast option',
      'I know what ingredients I need to keep stocked',
      'I completed my Day 3 reflection',
    ],
    rewardItem: {
      id: 'breakfast_crown',
      name: 'Breakfast Crown',
      emoji: '👑',
      description: 'You\'re already winning before most people wake up.',
      xpValue: 85,
    },
    workbookContent: {
      items: [
        'Greek yogurt bowl with berries and protein granola',
        'Eggs + egg whites + toast',
        'Cottage cheese bowl with fruit',
        'Protein smoothie',
        'Overnight oats with protein powder',
        'Breakfast wrap with eggs and turkey',
        'Greek yogurt + chia + nuts',
        'Egg bites + fruit',
        'Protein oatmeal',
        'Smoothie + hard-boiled eggs',
      ],
    },
    workbookPrompts: [
      { id: 'goto_breakfast', label: 'My go-to breakfast this week is:', type: 'textarea', placeholder: 'The one I\'d actually make on a busy Tuesday...' },
      { id: 'ingredients', label: 'Ingredients I need:', type: 'textarea', placeholder: 'What do I need to have in my fridge/pantry...' },
    ],
  },
  {
    num: 4,
    title: 'Build Protein-First Lunches & Dinners',
    subtitle: 'The formula for every meal',
    color: '#FF6B9D',
    bgGradient: 'from-pink to-pink-dark',
    emoji: '🍽️',
    lesson: `You do not need a rigid meal plan. You need a simple formula.

Protein + Produce + Carb/Fat

That's it. Learn it once. Use it forever — at home, at a restaurant, on the road.

Every meal you build around this formula will keep you full, support your goals, and take the guesswork out of eating.`,
    challengeTask: 'Apply the Protein + Produce + Carb/Fat formula to your lunch AND dinner today. Log both below.',
    keyInsight: 'This formula works everywhere. Learn it once. Use it forever.',
    proteinTip: '🍽️ Formula Examples\n\n• Chicken + rice + broccoli\n• Edamame quinoa bowl + roasted vegetables\n• Turkey taco bowl + salsa + avocado\n• Stir-fry with chicken + veggies + rice\n• Rotisserie chicken wrap + fruit\n• Ground turkey bowl + roasted vegetables\n• Lentil taco bowl + salsa + avocado\n• Tofu + rice + vegetables\n\n🎯 Aim for 25–30g protein at lunch and dinner',
    reflectionPrompt: 'My easiest lunch option is:\n\nMy easiest dinner option is:\n\nThe protein I want to use more often is:',
    checklist: [
      'I applied the formula to lunch today',
      'I applied the formula to dinner today',
      'I know my easiest lunch and dinner options',
      'I tracked all my meals today',
      'I completed my Day 4 reflection',
    ],
    rewardItem: {
      id: 'formula_cape',
      name: 'Formula Cape',
      emoji: '🦸‍♀️',
      description: 'Every hero needs a formula. This is yours.',
      xpValue: 90,
    },
    workbookContent: {
      intro: 'You do not need a rigid meal plan. You need a simple formula: Protein + Produce + Carb/Fat',
      items: [
        'Chicken + rice + broccoli',
        'Edamame quinoa bowl + roasted vegetables',
        'Turkey taco bowl + salsa + avocado',
        'Stir-fry with chicken + veggies + rice',
        'Rotisserie chicken wrap + fruit',
        'Ground turkey bowl + roasted vegetables',
        'Lentil taco bowl + salsa + avocado',
        'Tofu + rice + vegetables',
      ],
    },
    workbookPrompts: [
      { id: 'easiest_lunch', label: 'My easiest lunch option is:', type: 'text', placeholder: 'e.g. Rotisserie chicken + salad + wrap' },
      { id: 'easiest_dinner', label: 'My easiest dinner option is:', type: 'text', placeholder: 'e.g. Sheet pan chicken + veggies + rice' },
      { id: 'protein_more', label: 'The protein I want to use more often is:', type: 'text', placeholder: 'e.g. Salmon, tofu, turkey...' },
    ],
  },
  {
    num: 5,
    title: 'Create Your Busy-Day Backup Plan',
    subtitle: 'Your plan for the hard days',
    color: '#07b0a4',
    bgGradient: 'from-teal-400 to-teal-600',
    emoji: '⚡',
    lesson: `The goal is not to eat perfectly on ideal days — it's to know what to do when life gets busy.

Most women only have a plan for the good days. The days with time, energy, a calm morning, and a stocked fridge. But what about back-to-back meetings, a full inbox, zero prep, and no real lunch break?

Without a backup plan, those days become "I'll start again Monday." Your Busy-Day Backup List is your secret weapon.

Build this list before you need it. That's the whole point.`,
    challengeTask: 'Write down your personal 5 Busy-Day Protein Backups right now. Choose options you\'d actually grab when life goes sideways. Then identify where you usually get thrown off — and what you\'ll do instead.',
    keyInsight: 'The days everything goes sideways are exactly when this list saves you. Build it before you need it.',
    proteinTip: '⚡ Easy No-Cook Backup Options\n\n• Hard-boiled eggs\n• Greek yogurt\n• Grilled chicken salad\n• Tuna packets\n• Cottage cheese\n• Protein shake\n• Roasted edamame\n• Tofu cubes or baked tofu\n• Protein bar\n• Rotisserie chicken',
    reflectionPrompt: 'My 5 busy-day protein backups are:\n1.\n2.\n3.\n4.\n5.\n\nWhere I usually get thrown off:\n\nWhat I\'ll do instead next time:',
    checklist: [
      'I wrote down my 5 busy-day protein backups',
      'I identified where I usually get thrown off',
      'I have a plan for what to do instead',
      'I tracked all my meals today',
      'I completed my Day 5 reflection',
    ],
    rewardItem: {
      id: 'backup_blade',
      name: 'Backup Blade',
      emoji: '⚔️',
      description: 'Always prepared. Never caught off guard.',
      xpValue: 90,
    },
    workbookContent: {
      intro: 'The goal is not to eat perfectly on ideal days — it\'s to know what to do when life gets busy.',
      items: [
        'Hard-boiled eggs', 'Greek yogurt', 'Grilled chicken salad',
        'Tuna packets', 'Cottage cheese', 'Protein shake',
        'Roasted edamame', 'Tofu cubes or baked tofu', 'Protein bar',
      ],
    },
    workbookPrompts: [
      { id: 'backup_1', label: 'My 5 busy-day protein backups:', type: 'list', count: 5, placeholder: 'e.g. Greek yogurt' },
      { id: 'thrown_off', label: 'Where I usually get thrown off:', type: 'textarea', placeholder: 'e.g. Back-to-back meetings with no lunch break...' },
      { id: 'instead_next', label: 'What I\'ll do instead next time:', type: 'textarea', placeholder: 'e.g. Keep a protein bar in my bag...' },
    ],
  },
  {
    num: 6,
    title: 'Prep Protein Without Overwhelm',
    subtitle: '20 minutes. That\'s it.',
    color: '#07b0a4',
    bgGradient: 'from-teal-600 to-teal-800',
    emoji: '🧪',
    lesson: `Meal prep does not have to mean spending hours in the kitchen. Here is a simple prep plan:

✅ Prep 1–2 proteins
✅ Prep 1 easy breakfast
✅ Stock 2 backup protein options
✅ Wash or prep produce
✅ Make future meals easier

That's it. Those 20 minutes carry you through the week — especially the days you have nothing left to give.

The goal: make the right choice the path of least resistance.`,
    challengeTask: 'Complete ONE protein prep session today. Set a 20-minute timer. Prep at least 1–2 protein sources and 1 easy breakfast that will make the next few days easier.',
    keyInsight: 'Prep isn\'t about perfection. It\'s about making the healthy choice the easy choice.',
    proteinTip: '⏱️ Best ROI Preps (20 min or less)\n\n🍗 Baked chicken thighs → done in 25 min, lasts 5 days\n🥚 Hard-boiled eggs (batch of 12) → 5 days of snacks\n🥣 Overnight oats with protein powder → ready in the morning\n🥛 Pre-portioned Greek yogurt cups → 30 seconds each\n🐟 Sheet pan salmon + veggies → 25 minutes, 2 meals done',
    reflectionPrompt: 'The 2 proteins I prepped today:\n1.\n2.\n\nMy breakfast prep is:\n\nMy 2 backup proteins are:\n1.\n2.\n\nWhat I can do in 20 minutes to make next week easier:',
    checklist: [
      'I completed a protein prep session (20 min)',
      'I prepped at least 1–2 protein sources',
      'I prepped or planned my breakfast',
      'I stocked 2 backup protein options',
      'I completed my Day 6 reflection',
    ],
    rewardItem: {
      id: 'prep_potion',
      name: 'Prep Potion',
      emoji: '🧪',
      description: 'A little preparation is a superpower. You\'ve got it.',
      xpValue: 95,
    },
    workbookContent: {
      intro: 'Meal prep does not have to mean hours in the kitchen. Set a 20-minute timer and do this:',
      items: [
        'Prep 1–2 proteins',
        'Prep 1 easy breakfast',
        'Stock 2 backup protein options',
        'Wash or prep produce',
        'Make future meals easier',
      ],
    },
    workbookPrompts: [
      { id: 'prep_proteins', label: 'The 2 proteins I\'ll prep:', type: 'list', count: 2, placeholder: 'e.g. Chicken thighs' },
      { id: 'breakfast_prep', label: 'My breakfast prep is:', type: 'text', placeholder: 'e.g. Overnight oats with protein powder' },
      { id: 'backup_proteins', label: 'My 2 backup proteins are:', type: 'list', count: 2, placeholder: 'e.g. Hard-boiled eggs' },
      { id: 'twenty_min', label: 'What I can do in 20 minutes to make next week easier:', type: 'textarea', placeholder: 'e.g. Batch cook chicken + portion snacks...' },
    ],
  },
  {
    num: 7,
    title: 'Reflect, Lock In the Habit & Choose Your Next Step',
    subtitle: 'The finish line is just the starting line',
    color: '#C8F53A',
    bgGradient: 'from-lime to-teal-500',
    emoji: '🏆',
    lesson: `You made it to Day 7. That matters more than it sounds — most people don't follow through. You did.

Over the past week you built awareness, set a standard, fixed breakfast, learned a meal formula, created a backup plan, and simplified your prep. That's not a 7-day transformation — that's the foundation of a sustainable habit.

What you do AFTER this challenge is where the real magic happens. Keep going with what works. Let go of what doesn't. You know more about your protein patterns than you did a week ago — and that knowledge doesn't expire.`,
    challengeTask: 'Take time today to answer all the reflection prompts below honestly. Then decide: what protein habit are you keeping next week no matter what?',
    keyInsight: 'Consistency isn\'t about being perfect every day. It\'s about having a plan that fits your real life — and coming back to it when things get messy.',
    proteinTip: '🏆 Your 3 Non-Negotiables Going Forward\n\n1. High-protein breakfast every morning (25–30g)\n2. Apply the Protein + Produce + Carb/Fat formula at every meal\n3. Keep your Busy-Day Backup List stocked\n\n🎯 Long-term goal: work toward 30g of protein at each meal',
    reflectionPrompt: 'How did the challenge go? Do you feel any different compared to 7 days ago?\n\nWhat did I learn about my eating habits this week?\n\nWhat am I most proud of from this challenge?\n\nWhere do I still need support?\n\nWhat protein habit do I want to keep next week?',
    checklist: [
      'I reviewed my meals and progress from all 7 days',
      'I answered all 5 reflection prompts',
      'I identified the protein habit I\'m keeping',
      'I know where I still need support',
      'I completed the full 7-Day Challenge 🎉',
    ],
    rewardItem: {
      id: 'champion_belt',
      name: 'Champion Belt',
      emoji: '🏆',
      description: 'Seven days. Fully earned. You are a Protein Champion.',
      xpValue: 150,
    },
    workbookPrompts: [
      { id: 'learned', label: 'What did I learn about my eating habits this week?', type: 'textarea', placeholder: 'Be honest — even the small things count...' },
      { id: 'proud_of', label: 'What am I most proud of from this challenge?', type: 'textarea', placeholder: 'Every win counts, big or small...' },
      { id: 'need_support', label: 'Where do I still need support?', type: 'textarea', placeholder: 'No judgment — just honesty...' },
      { id: 'keep_habit', label: 'What protein habit do I want to keep next week?', type: 'textarea', placeholder: 'One thing. Make it non-negotiable...' },
    ],
  },
]

export const FACEBOOK_BONUS_ITEM: RewardItem = {
  id: 'social_wings',
  name: 'Social Wings',
  emoji: '🦋',
  description: 'You showed up AND showed out. Community is everything.',
  xpValue: 50,
}

export const RECIPES = {
  breakfast: [
    {
      name: 'Turkey, Egg & Cheese Muffins',
      image: '🧁',
      servings: 2,
      prepTime: '10 min',
      cookTime: '20 min',
      protein: 45,
      calories: 389,
      carbs: 6,
      fat: 20,
      ingredients: [
        '4 large eggs',
        '6 large egg whites',
        '½ red bell pepper, diced',
        '½ small onion, diced',
        '70g mozzarella cheese',
        '2 tbsp chives, chopped',
        '85g roast turkey, diced',
        'Non-stick spray',
      ],
      steps: [
        'Preheat oven to 350°F (175°C).',
        'Whisk together eggs and egg whites in a large bowl.',
        'Chop turkey, pepper, onion, and chives into small pieces.',
        'Spray muffin tin with non-stick spray. Place about 1 tbsp each of turkey, peppers, and onions into each tin.',
        'Pour the egg mix into each tin. Sprinkle with cheese and chives.',
        'Bake for 20–25 minutes. Let cool before removing.',
      ],
    },
    {
      name: 'Berry Protein Yogurt Bowl',
      image: '🍓',
      servings: 1,
      prepTime: '5 min',
      cookTime: '0 min',
      protein: 45,
      calories: 380,
      carbs: 34,
      fat: 8,
      ingredients: [
        '170g Greek yogurt',
        '1 scoop vanilla protein powder',
        '½ cup berries',
        '2 tbsp granola',
        '1 tbsp chia seeds',
      ],
      steps: [
        'Add Greek yogurt to a bowl.',
        'Stir in protein powder until smooth.',
        'Top with berries, granola, and chia seeds.',
        'Serve immediately.',
      ],
    },
    {
      name: 'Egg & Turkey Breakfast Wrap',
      image: '🌯',
      servings: 1,
      prepTime: '5 min',
      cookTime: '7 min',
      protein: 42,
      calories: 400,
      carbs: 25,
      fat: 15,
      ingredients: [
        '2 whole eggs',
        '½ cup egg whites',
        '2 oz sliced turkey',
        '1 whole wheat wrap',
        'Handful of spinach',
        'Salt and pepper',
      ],
      steps: [
        'Scramble eggs and egg whites in a pan.',
        'Add spinach and turkey and cook until warmed through.',
        'Place mixture into wrap.',
        'Roll and serve.',
      ],
    },
  ],
  lunch: [
    {
      name: 'Chicken Rice Power Bowl',
      image: '🍱',
      servings: 1,
      prepTime: '5 min',
      cookTime: '5 min',
      protein: 42,
      calories: 515,
      carbs: 45,
      fat: 19,
      ingredients: [
        '4 oz cooked chicken breast',
        '½–¾ cup cooked rice',
        '1 cup steamed broccoli',
        '1 tbsp olive oil or dressing',
        'Salt, pepper, garlic powder',
      ],
      steps: [
        'Add rice, broccoli, and chicken to a bowl.',
        'Drizzle with olive oil or dressing.',
        'Season to taste.',
        'Serve warm.',
      ],
    },
    {
      name: 'Lentil Taco Bowl',
      image: '🌮',
      servings: 1,
      prepTime: '5 min',
      cookTime: '10 min',
      protein: 22,
      calories: 440,
      carbs: 71,
      fat: 9,
      ingredients: [
        '1 cup cooked lentils',
        '½ cup cooked rice',
        '¼ avocado',
        'Salsa',
        'Shredded lettuce',
        'Taco seasoning',
      ],
      steps: [
        'Warm lentils with taco seasoning.',
        'Add rice, lettuce, salsa, and avocado to a bowl.',
        'Top with lentils.',
        'Serve.',
      ],
    },
  ],
  dinner: [
    {
      name: 'Sheet Pan Salmon & Veggies',
      image: '🐟',
      servings: 2,
      prepTime: '10 min',
      cookTime: '25 min',
      protein: 29,
      calories: 380,
      carbs: 20,
      fat: 21,
      ingredients: [
        '2 salmon fillets',
        '2 cups green beans',
        '1 cup baby potatoes, halved',
        '1 tbsp olive oil',
        'Salt, pepper, garlic powder',
      ],
      steps: [
        'Preheat oven to 400°F.',
        'Place salmon, green beans, and potatoes on a sheet pan.',
        'Drizzle with olive oil and season.',
        'Bake for 20–25 minutes until salmon is cooked through.',
      ],
    },
    {
      name: 'Tofu Stir-Fry',
      image: '🥢',
      servings: 2,
      prepTime: '10 min',
      cookTime: '12 min',
      protein: 36,
      calories: 406,
      carbs: 36,
      fat: 14,
      ingredients: [
        '8 oz extra-firm tofu, cubed',
        '2 cups mixed vegetables',
        '1 cup cooked rice',
        '1 tbsp soy sauce',
        '1 tsp sesame oil',
        'Garlic or ginger to taste',
      ],
      steps: [
        'Cook tofu in a pan until lightly browned.',
        'Add vegetables and cook until tender.',
        'Stir in soy sauce and sesame oil.',
        'Serve over rice.',
      ],
    },
    {
      name: 'Steak Bowl',
      image: '🥩',
      servings: 1,
      prepTime: '5 min',
      cookTime: '20 min',
      protein: 33,
      calories: 448,
      carbs: 49,
      fat: 15,
      ingredients: [
        '4 oz sirloin steak, sliced thin',
        '½ large russet potato, chopped',
        '½ cup red peppers, chopped',
        '1 cup mushrooms, chopped',
        '1 small shallot, chopped',
        '¼ tbsp ghee',
        '1 tbsp nutritional yeast',
        'Salt, pepper, green onions to garnish',
      ],
      steps: [
        'Toss potatoes, pepper, mushrooms, and shallots with ghee, salt, and pepper.',
        'Bake at 400°F for 20 minutes (or air fry at 390°F).',
        'Cook steak on medium heat for 5–7 minutes. Slice thin.',
        'Add potato and vegetable mix to a bowl.',
        'Top with steak, nutritional yeast, and green onions.',
      ],
    },
  ],
  vegan: [
    {
      name: 'Edamame Quinoa Power Bowl',
      image: '🫛',
      servings: 1,
      prepTime: '5 min',
      cookTime: '5 min',
      protein: 28,
      calories: 420,
      carbs: 48,
      fat: 10,
      ingredients: [
        '½ cup cooked quinoa (microwave pouch)',
        '1 cup shelled edamame (frozen, thawed)',
        '1 cup baby spinach',
        '1 tbsp tahini',
        '1 tbsp lemon juice',
        '1 tsp soy sauce',
        'Sesame seeds to top',
      ],
      steps: [
        'Heat quinoa per packet instructions (90 seconds).',
        'Thaw edamame in warm water for 2 minutes.',
        'Mix tahini, lemon juice, and soy sauce as dressing.',
        'Combine quinoa, edamame, and spinach in a bowl.',
        'Drizzle with dressing and top with sesame seeds.',
      ],
    },
    {
      name: 'Plant Protein Smoothie Bowl',
      image: '🫐',
      servings: 1,
      prepTime: '5 min',
      cookTime: '0 min',
      protein: 30,
      calories: 350,
      carbs: 38,
      fat: 7,
      ingredients: [
        '1 scoop plant-based protein powder (vanilla)',
        '1 cup unsweetened almond milk',
        '½ frozen banana',
        '½ cup frozen mixed berries',
        '1 tbsp chia seeds',
        '2 tbsp granola to top',
      ],
      steps: [
        'Blend protein powder, almond milk, banana, and berries until thick and smooth.',
        'Pour into a bowl (should be thick — use less milk if needed).',
        'Top with chia seeds and granola.',
        'Serve immediately.',
      ],
    },
    {
      name: 'Tofu Scramble with Spinach',
      image: '🥬',
      servings: 1,
      prepTime: '3 min',
      cookTime: '7 min',
      protein: 26,
      calories: 280,
      carbs: 10,
      fat: 14,
      ingredients: [
        '200g firm tofu, crumbled',
        '1 cup baby spinach',
        '1 tbsp nutritional yeast',
        '½ tsp turmeric',
        '½ tsp garlic powder',
        '1 tsp olive oil',
        'Salt and pepper',
      ],
      steps: [
        'Crumble tofu with your hands into chunky pieces.',
        'Heat olive oil in a pan on medium-high.',
        'Add tofu and season with turmeric, garlic powder, salt, and pepper.',
        'Cook 5 minutes, stirring occasionally, until lightly golden.',
        'Add spinach and nutritional yeast, stir for 1–2 minutes until wilted.',
        'Serve immediately. Optional: add salsa or hot sauce.',
      ],
    },
  ],
}

export const COACH_TONE_SYSTEM_PROMPT = `You are the coach behind Grind Lab Fitness — warm, real, enthusiastic, and deeply encouraging. You work especially with women over 30 who are building better nutrition habits.

Your voice:
- Super warm and direct ("Ok yes!", "Listen,", "Hey girl!")
- Genuinely excited when participants make progress ("yay!!!", "I am SO proud of you!!")
- You celebrate every small win loudly
- You simplify everything — always one thing at a time
- You normalise the journey ("all these people on Instagram started exactly where you are — they just kept going")
- You never shame or guilt-trip — ever
- At the end of your responses, you naturally and warmly mention 1-on-1 coaching as an option

Example of your voice:
"Ok yes that's a great question! I am so glad you asked. Listen — keep it simple. The goal is to do only one thing at a time. All those people you see on Instagram started very small — it's just that they've been doing the same thing repeatedly for so long, that it looks like they were born with it. You are heading in the right direction. Yay!!! Look at that! I am so proud of you!! Have you thought about 1-1 coaching? I can help you with that and you will be SO PLEASED!!!"

The participant is doing a 7-Day Protein Jumpstart Challenge. Answer their specific question about protein, nutrition, or their challenge tasks. Be warm, practical, and keep it under 120 words. Always end with one clear action they can take right now.`
