export interface Meal {
  name: string
  food: string
  protein: string
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
    title: 'The Protein Wake-Up Call',
    subtitle: 'Awareness before action',
    color: '#07b0a4',
    bgGradient: 'from-teal-500 to-teal-600',
    emoji: '🔍',
    lesson: `Most busy women over 30 are under-eating protein without even realising it — not because they're lazy, but because nobody ever taught them what fuelling for their actual goals looks like.

Today is not about changing anything. It's about seeing clearly where you actually are.

The average woman needs 90–120g of protein per day. Most are getting 40–60g. That gap is exactly why cravings feel out of control, energy crashes by 3pm, and the scale won't budge even when you're "being good."

Nothing is wrong with you. You've just been running your car on half a tank and wondering why it keeps sputtering.`,
    challengeTask: 'Track everything you eat today WITHOUT changing a single thing. Just observe. At the end of the day, add up how much protein you got in — even a rough estimate counts.',
    keyInsight: 'You can\'t fix what you can\'t see. Today is pure, judgment-free awareness — just data.',
    proteinTip: '🍗 Chicken breast (4 oz) ≈ 35g  ·  🥛 Greek yogurt (1 cup) ≈ 17g  ·  🥚 2 whole eggs ≈ 12g  ·  🥤 Protein shake ≈ 25g',
    reflectionPrompt: 'Where did your day fall short on protein — breakfast, lunch, dinner, or snacks? Be honest with yourself. No judgment here! 💙',
    checklist: [
      'I tracked everything I ate today',
      'I estimated my total protein for today',
      'I identified my biggest protein gap',
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
  },
  {
    num: 2,
    title: 'Set Your Protein Standard',
    subtitle: 'One number. One rule.',
    color: '#07b0a4',
    bgGradient: 'from-teal-500 to-teal-700',
    emoji: '🎯',
    lesson: `You don't need a complicated macro calculator. You need one number you can actually remember.

Here's the simple rule: aim for 0.7–1g of protein per pound of your goal bodyweight. Not sure of that number? Use 100g as your baseline right now. That is a realistic, achievable target for most women over 30 who want to support muscle and fat-loss goals.

Consistency with a "good enough" number will always beat perfection with a number you forget by Wednesday.

Today you set your standard — and you actually try to hit it for the first time.`,
    challengeTask: 'Set your daily protein goal right now (write it in the goal field below). Then build your meals today with that target in mind. Don\'t stress about hitting it perfectly — just aim.',
    keyInsight: 'A number you can remember is worth more than a perfect number you abandon by Thursday.',
    proteinTip: '100g protein day example 👇\nBreakfast: 2 eggs + Greek yogurt = 29g\nLunch: Chicken salad = 35g\nDinner: Salmon = 30g\nSnack: String cheese = 6g\nTotal = 100g ✓',
    reflectionPrompt: 'What would need to change in your current meals to consistently hit your protein goal? Name one small thing you\'d actually do differently.',
    checklist: [
      'I set my daily protein goal',
      'I aimed for my protein goal today',
      'I know my "protein first" meal rule',
      'I tracked all my meals',
      'I completed my Day 2 reflection',
    ],
    rewardItem: {
      id: 'goal_shield',
      name: 'Goal Shield',
      emoji: '🛡️',
      description: 'Your standard is set. Now you have something to protect.',
      xpValue: 80,
    },
  },
  {
    num: 3,
    title: 'Fix Breakfast First',
    subtitle: 'Your easiest protein win',
    color: '#C8F53A',
    bgGradient: 'from-lime to-lime-dark',
    emoji: '🌅',
    lesson: `When your morning has enough protein, the whole day gets easier. You stay fuller longer, the 3pm crash is quieter, and you make better choices at lunch because you're not starving.

Most women skip protein at breakfast — not on purpose, but because it's the meal with the least structure. Toast, fruit, coffee. Maybe a bar on the run. That's 5–8g when you need 25–35g to start the day right.

You only need ONE go-to breakfast. Not 10 healthy recipes on Pinterest. Just one you can make on autopilot — including on a Tuesday when you have a 7am call.`,
    challengeTask: 'Choose ONE high-protein breakfast from the options in your tip below and have it today. Pick whichever one you\'d actually make on a busy morning.',
    keyInsight: 'Repeatable beats perfect. One breakfast you make on autopilot is worth more than ten you\'ll never cook.',
    proteinTip: '☀️ Option 1: Full-fat Greek yogurt + berries + nut butter ≈ 25–30g\n☀️ Option 2: 2 whole eggs + 2 egg whites scrambled ≈ 22g\n☀️ Option 3: Protein smoothie (1 scoop powder + milk + banana) ≈ 28g\n\nAll under 10 minutes. All repeatable.',
    reflectionPrompt: 'Which breakfast option will you use as your go-to? What makes it realistic for your actual schedule?',
    checklist: [
      'I had a high-protein breakfast (25g+)',
      'I logged my breakfast protein amount',
      'I chose my personal go-to breakfast option',
      'I tracked all my meals today',
      'I completed my Day 3 reflection',
    ],
    rewardItem: {
      id: 'breakfast_crown',
      name: 'Breakfast Crown',
      emoji: '👑',
      description: 'You\'re already winning before most people wake up.',
      xpValue: 85,
    },
  },
  {
    num: 4,
    title: 'Build Protein-First Meals',
    subtitle: 'The formula for every meal',
    color: '#FF6B9D',
    bgGradient: 'from-pink to-pink-dark',
    emoji: '🍽️',
    lesson: `You don't need a different meal plan for every day of the week. You need one formula you can apply to every single meal — at home, at a restaurant, on the road.

Here it is: Protein + Produce + Smart Carb or Fat.

That's it. Chicken + roasted veggies + rice. Salmon + salad + roasted potato. Greek yogurt + fruit + granola. Eggs + spinach + avocado toast.

Every meal you build around this formula will keep you full, support your goals, and take the guesswork out of eating. Learn it once. Use it forever.`,
    challengeTask: 'Apply the Protein + Produce + Carb/Fat formula to every single meal today — breakfast, lunch, AND dinner. Log what you have in each slot below.',
    keyInsight: 'This formula works at restaurants, at home, on the road. Learn it once. Use it forever.',
    proteinTip: '🍳 Breakfast anchors: eggs, Greek yogurt, cottage cheese, protein shake\n🥗 Lunch anchors: chicken, tuna, turkey, tofu\n🐟 Dinner anchors: salmon, lean beef, shrimp, legumes\n🧀 Snack anchors: string cheese, edamame, hard-boiled eggs',
    reflectionPrompt: 'Which meal is hardest for you to apply the formula to? What\'s one small change that would make it easier?',
    checklist: [
      'I applied the formula to breakfast',
      'I applied the formula to lunch',
      'I applied the formula to dinner',
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
  },
  {
    num: 5,
    title: 'Busy Day Backup Plan',
    subtitle: 'Your plan for the hard days',
    color: '#07b0a4',
    bgGradient: 'from-teal-400 to-teal-600',
    emoji: '⚡',
    lesson: `Your nutrition plan should work on your WORST day — not just your best one.

Most women only have a plan for the good days. The days with time, energy, a calm morning, and a stocked fridge. But what about back-to-back meetings, a full inbox, zero prep, and no real lunch break?

Without a backup plan, those days become "I'll start again Monday." Your Busy-Day Backup List is your secret weapon — the 5–10 foods you can always reach for when life gets away from you, with zero cooking required.

Build this list before you need it. That's the whole point.`,
    challengeTask: 'Build your personal Busy-Day Backup List right now. Write down at least 5 easy, high-protein options you can grab without cooking. These are your go-to items on chaotic days.',
    keyInsight: 'The days everything goes sideways are exactly when this list saves you. Build it before you need it.',
    proteinTip: '⚡ Easy no-cook protein options:\nRotisserie chicken · Greek yogurt cups · String cheese · Hard-boiled eggs · Protein bars · Cottage cheese · Canned tuna packets · Deli turkey · Edamame · Protein shake',
    reflectionPrompt: 'What usually throws you completely off track on busy days? How does your new backup list solve that specific problem?',
    checklist: [
      'I built my Busy-Day Backup List (5+ options)',
      'I know my top 3 easiest grab-and-go proteins',
      'I planned ahead for at least one busy day this week',
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
  },
  {
    num: 6,
    title: 'Prep Without Overwhelm',
    subtitle: '20 minutes. One protein source. Done.',
    color: '#07b0a4',
    bgGradient: 'from-teal-600 to-teal-800',
    emoji: '🧪',
    lesson: `You don't need to spend Sunday in the kitchen to be consistent. You need 20 minutes and a plan.

Protein prep isn't about cooking seven perfect meals in matching containers. It's about reducing the number of decisions you make when you're tired and hungry.

Bake a batch of chicken thighs. Hard-boil a dozen eggs. Portion out your Greek yogurt cups. That's it. Those 20 minutes carry you through the entire week — especially the days you have nothing left to give.

The goal: make the right choice the path of least resistance.`,
    challengeTask: 'Complete ONE protein prep session today. Set a 20-minute timer. Prep at least one protein source that will make tomorrow easier.',
    keyInsight: 'Prep isn\'t about perfection. It\'s about making the healthy choice the easy choice.',
    proteinTip: '⏱️ Best ROI preps:\n🍗 Baked chicken thighs → done in 25 min, lasts 5 days\n🥚 Hard-boiled eggs (batch of 12) → 5 days of snacks\n🥣 Overnight oats with protein powder → ready in the morning\n🥛 Pre-portioned Greek yogurt cups → 30 seconds each',
    reflectionPrompt: 'What one prep habit would make the biggest difference in your week if you did it consistently every Sunday?',
    checklist: [
      'I completed a protein prep session (20 min)',
      'I prepped at least one protein source',
      'I set up easy backup options for the week',
      'I tracked all my meals today',
      'I completed my Day 6 reflection',
    ],
    rewardItem: {
      id: 'prep_potion',
      name: 'Prep Potion',
      emoji: '🧪',
      description: 'A little preparation is a superpower. You\'ve got it.',
      xpValue: 95,
    },
  },
  {
    num: 7,
    title: 'Lock In the Habit',
    subtitle: 'The finish line is just the starting line',
    color: '#C8F53A',
    bgGradient: 'from-lime to-teal-500',
    emoji: '🏆',
    lesson: `You made it to Day 7. That matters more than it sounds — most people don't follow through. You did.

Over the past week you built awareness, set a standard, fixed breakfast, learned a meal formula, created a backup plan, and simplified your prep. That's not a 7-day transformation — that's the foundation of a sustainable habit.

The goal now is to keep going with what works and let go of what doesn't. You know more about your protein patterns than you did a week ago. That knowledge doesn't expire.

What you do AFTER this challenge is where the real magic happens.`,
    challengeTask: 'Write your going-forward protein plan. What habits from this week will you keep? What will you improve? What does your next 30 days actually look like for you?',
    keyInsight: 'Consistency isn\'t about being perfect every day. It\'s about having a plan that fits your real life — and coming back to it when things get messy.',
    proteinTip: '🏆 Your 3 non-negotiables going forward:\n1. High-protein breakfast every morning\n2. Apply the Protein + Produce + Carb/Fat formula at every meal\n3. Keep your Busy-Day Backup List stocked',
    reflectionPrompt: 'What is your single biggest win from this entire challenge? And what\'s the ONE thing you\'ll commit to keeping — no matter what?',
    checklist: [
      'I reviewed my protein logs from all 7 days',
      'I identified my single biggest win',
      'I wrote my going-forward protein plan',
      'I tracked all my meals today',
      'I completed my final Day 7 reflection 🎉',
    ],
    rewardItem: {
      id: 'champion_belt',
      name: 'Champion Belt',
      emoji: '🏆',
      description: 'Seven days. Fully earned. You are a Protein Champion.',
      xpValue: 150,
    },
  },
]

export const FACEBOOK_BONUS_ITEM: RewardItem = {
  id: 'social_wings',
  name: 'Social Wings',
  emoji: '🦋',
  description: 'You showed up AND showed out. Community is everything.',
  xpValue: 50,
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
