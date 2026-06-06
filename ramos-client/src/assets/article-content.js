import consoleImg from './console.jpg';
import esportsImg from './esports.jpg';
import hardwareImg from './hardware.jpg';
import retroImg from './retro.jpg';

const articles = [
  {
    slug: 'optimize-pc-max-fps',

    title:
      'How to Optimize Your PC for Max FPS',

      preview:
      "Tired of lag ruining your gaming experience? Optimizing your PC for maximum FPS can make a world of difference. From tweaking in-game settings to updating drivers and managing background processes, we’ve got you covered with the ultimate guide to boosting your gaming performance.",

    content: [
      'Stop dropping frames in team fights...',
      'First, we need to dive into your NVIDIA...',
      'Next, we will look at Windows Game Mode...'
    ],

    image: hardwareImg
  },

  {
    slug: 'next-gen-console-war',

    title:
      'The Next-Gen Console War: What We Know',

      preview:
      "The next generation of consoles is on the horizon, and the battle for gaming supremacy is heating up. With Sony and Microsoft both promising groundbreaking features and exclusive titles, gamers are eager to see who will come out on top. Here's what we know so far about the next-gen console war.",

    content: [
      'Rumors are swirling...',
      'Leaked developer documents...',
      'But the real wildcard is Nintendo...'
    ],

    image: consoleImg
  },

  {
    slug: 'top-10-indie-games',

    title:
      'Top 10 Indie Games You Missed This Year',

      preview:
      "Take a break from massive open worlds and triple-A titles. This year, indie developers have been pushing the boundaries of creativity and storytelling. From pixel art adventures to innovative gameplay mechanics, here are the top 10 indie games that flew under the radar but deserve your attention.",

    content: [
      'Take a break from massive open worlds...',
      'While AAA studios were busy...',
      'Our number one pick this year...'
    ],

    image: retroImg
  },

  {
    slug:
      'understanding-ranked-meta',

    title:
      'Understanding the New Ranked Meta',

       preview:
       "The ranked meta has shifted dramatically with the latest patch, leaving many players confused about which champions to pick and how to adapt their strategies. In this article, we break down the key changes and offer tips on how to climb the ranks in this new environment.",

    content: [
      'The latest patch completely flipped...',
      'The recent nerfs to mobility...',
      'If you are playing solo queue...'
    ],

    image: esportsImg
  }
];

export default articles;