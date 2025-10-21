"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ResourceCard } from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { BookOpen, Headphones, Beaker, Hammer, ChefHat, Cpu, Package, FileText, Book } from "lucide-react"

const categories = [
  { id: "all", name: "All Categories", icon: null },
  { id: "podcasts", name: "Podcasts", icon: Headphones },
  { id: "magazines", name: "Magazines", icon: FileText },
  { id: "kids-books", name: "Kids Books", icon: Book },
  { id: "parenting-books", name: "Parenting Books", icon: BookOpen },
  { id: "stem-activities", name: "STEM Activities", icon: Cpu },
  { id: "cooking-activities", name: "Cooking Activities", icon: ChefHat },
  { id: "science-activities", name: "Science Activities", icon: Beaker },
  { id: "diy-building", name: "DIY Building Activities", icon: Hammer },
  { id: "subscription-boxes", name: "Subscription Boxes", icon: Package },
]

const ageRanges = ["All Ages", "Ages 5-6", "Ages 7-8", "Ages 9-10"]

const resources = [
  {
    id: 1,
    title: "The Whole-Brain Child",
    description:
      "Revolutionary strategies to nurture your child's developing mind by Daniel J. Siegel and Tina Payne Bryson",
    image: "/book-cover-whole-brain-child.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://www.amazon.com/Whole-Brain-Child-Revolutionary-Strategies-Developing/dp/0553386697",
  },
  {
    id: 2,
    title: "How to Talk So Kids Will Listen",
    description: "Time-tested communication strategies that strengthen parent-child relationships by Adele Faber",
    image: "/book-cover-how-to-talk.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://www.amazon.com/How-Talk-Kids-Will-Listen/dp/1451663889",
  },
  {
    id: 3,
    title: "Positive Discipline",
    description: "Effective strategies for raising responsible, respectful children by Jane Nelsen",
    image: "/book-cover-positive-discipline.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://www.amazon.com/Positive-Discipline-Jane-Nelsen-Ed-D/dp/0345487672",
  },
  {
    id: 4,
    title: "The 5 Love Languages of Children",
    description: "Discover your child's primary love language and strengthen your connection by Gary Chapman",
    image: "/book-cover-5-love-languages.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://www.amazon.com/Love-Languages-Children-Secret-Effectively/dp/0802412858",
  },
  {
    id: 30,
    title: "Simplicity Parenting",
    description: "Using the power of less to raise calmer, happier children by Kim John Payne",
    image: "/book-cover-simplicity-parenting.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://www.amazon.com/Simplicity-Parenting-Extraordinary-Calmer-Happier/dp/0375869026",
  },
  {
    id: 31,
    title: "Where the Wild Things Are",
    description: "Classic picture book about imagination and adventure by Maurice Sendak",
    image: "/book-cover-wild-things.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Where-Wild-Things-Maurice-Sendak/dp/0060254920",
  },
  {
    id: 32,
    title: "The Very Hungry Caterpillar",
    description: "Beloved children's book about growth and transformation by Eric Carle",
    image: "/book-cover-hungry-caterpillar.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Very-Hungry-Caterpillar-Eric-Carle/dp/0399226907",
  },
  {
    id: 33,
    title: "Charlotte's Web",
    description: "Timeless story of friendship and loyalty by E.B. White",
    image: "/book-cover-charlottes-web.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Charlottes-Web-E-B-White/dp/0064400557",
  },
  {
    id: 34,
    title: "Wonder",
    description: "Inspiring story about kindness and acceptance by R.J. Palacio",
    image: "/book-cover-wonder.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Wonder-R-J-Palacio/dp/0375869026",
  },
  {
    id: 35,
    title: "Harry Potter and the Sorcerer's Stone",
    description: "Magical adventure series that captivates young readers by J.K. Rowling",
    image: "/book-cover-harry-potter.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Rowling/dp/0590353403",
  },
  {
    id: 5,
    title: "Good Inside with Dr. Becky",
    description: "Dr. Becky Kennedy shares practical parenting strategies and insights",
    image: "/podcast-artwork-good-inside.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://www.goodinside.com/podcast/",
  },
  {
    id: 36,
    title: "The Longest Shortest Time",
    description: "Honest conversations about the beautiful, messy reality of parenting",
    image: "/podcast-artwork-longest-shortest-time.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://longestshortesttime.com/",
  },
  {
    id: 37,
    title: "Unruffled",
    description: "Janet Lansbury's respectful parenting advice and guidance",
    image: "/podcast-artwork-unruffled.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://www.janetlansbury.com/podcast-audio/",
  },
  {
    id: 38,
    title: "The Mom Hour",
    description: "Real talk about motherhood, parenting, and life balance",
    image: "/podcast-artwork-mom-hour.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://themomhour.com/",
  },
  {
    id: 39,
    title: "Karma & Chaos",
    description: "Kail Lowry & Becky Hayter discuss real parenting challenges with humor and honesty",
    image: "/karma-and-chaos-podcast-cover-art-colorful-microph.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/karma-chaos-with-kail-lowry-becky-hayter/id1532102239",
  },
  {
    id: 40,
    title: "For Crying Out Loud",
    description: "Hilarious and heartfelt conversations about the ups and downs of parenting",
    image: "/for-crying-out-loud-podcast-cover-art-baby-crying.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/for-crying-out-loud/id354082588",
  },
  {
    id: 41,
    title: "Care and Feeding",
    description: "Slate's parenting show offering advice on raising kids in today's world",
    image: "/care-and-feeding-slate-podcast-cover-art-parenting.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/care-and-feeding-slates-parenting-show/id774383607",
  },
  {
    id: 42,
    title: "The PedsDocTalk Podcast",
    description: "Child health, development, and parenting advice from a pediatrician mom",
    image: "/pedsdoctalk-podcast.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/the-pedsdoctalk-podcast/id1501057527",
  },
  {
    id: 43,
    title: "Parenting Hell",
    description: "Rob Beckett and Josh Widdicombe share hilarious parenting stories and struggles",
    image: "/parenting-hell-podcast-cover-art-comedy-microphone.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/parenting-hell-with-rob-beckett-and-josh-widdicombe/id1510251497",
  },
  {
    id: 44,
    title: "Motherhood in Black and White",
    description: "Exploring parenting through diverse perspectives and experiences",
    image: "/motherhood-in-black-and-white.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/gb/podcast/motherhood-in-black-white/id1525043882",
  },
  {
    id: 45,
    title: "Wow in the World",
    description: "Science and curiosity podcast that makes learning fun for kids",
    image: "/wow-in-the-world-kids-podcast-cover-art-science-co.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://podcasts.apple.com/us/podcast/wow-in-the-world/id1233834541",
  },
  {
    id: 46,
    title: "Story Pirates",
    description: "Professional actors bring kids' stories to life with music and comedy",
    image: "/story-pirates-podcast-cover-art-pirate-ship-kids-s.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://open.spotify.com/show/0OHMYcZChEVgTx2jz0yzze",
  },
  {
    id: 47,
    title: "Circle Round",
    description: "Folktales from around the world adapted for modern kids",
    image: "/circle-round-podcast-cover-art-folktales-storytell.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://podcasts.apple.com/us/podcast/circle-round/id1246443751",
  },
  {
    id: 48,
    title: "Brains On!",
    description: "Science podcast for curious kids exploring how the world works",
    image: "/brains-on-science-podcast-cover-art-brain-kids-lea.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 7-10",
    link: "https://open.spotify.com/show/4EaTaVeNXR4QSFAArpyZyd",
  },
  {
    id: 100,
    title: "Volcano Experiments",
    description: "Create erupting volcanoes with baking soda and vinegar reactions",
    image: "/activity-volcano-experiment.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.sciencebuddies.org/stem-activities/volcano",
  },
  {
    id: 101,
    title: "Rainbow Water Experiment",
    description: "Learn about water density with colorful layered liquids",
    image: "/activity-rainbow-water.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/rainbow-water-density-experiment/",
  },
  {
    id: 102,
    title: "Sink or Float",
    description: "Discover buoyancy by testing which objects sink or float",
    image: "/activity-sink-float.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.science-sparks.com/sink-float-science-experiment/",
  },
  {
    id: 103,
    title: "Rain Cloud in a Jar",
    description: "Create a mini weather system to understand how rain forms",
    image: "/activity-rain-cloud.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/rain-cloud-in-a-jar-experiment/",
  },
  {
    id: 104,
    title: "Magic Milk Experiment",
    description: "Watch colors swirl and dance with dish soap and food coloring",
    image: "/activity-magic-milk.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/magic-milk-science-experiment/",
  },
  {
    id: 105,
    title: "Solar Oven",
    description: "Build a solar oven and cook s'mores using the sun's energy",
    image: "/activity-solar-oven.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.sciencebuddies.org/stem-activities/solar-oven",
  },
  {
    id: 106,
    title: "Homemade Lava Lamp",
    description: "Create a mesmerizing lava lamp with oil, water, and fizzy tablets",
    image: "/activity-lava-lamp.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.steamsational.com/homemade-lava-lamp/",
  },
  {
    id: 107,
    title: "Electromagnets",
    description: "Build an electromagnet using batteries, wire, and nails",
    image: "/activity-electromagnet.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.sciencebuddies.org/stem-activities/electromagnet",
  },
  {
    id: 108,
    title: "Crystal Gardens",
    description: "Grow beautiful crystals using salt, sugar, or borax solutions",
    image: "/activity-crystal-garden.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.steamsational.com/how-to-grow-crystals-with-borax/",
  },
  {
    id: 109,
    title: "Catapult Building",
    description: "Engineer a catapult to learn about force, motion, and trajectory",
    image: "/activity-catapult.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.sciencebuddies.org/stem-activities/catapult",
  },
  {
    id: 110,
    title: "DNA Extraction",
    description: "Extract real DNA from strawberries using household materials",
    image: "/activity-dna-extraction.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/strawberry-dna",
  },
  {
    id: 111,
    title: "Water Filtration System",
    description: "Build a water filter to learn about purification and clean water",
    image: "/activity-water-filter.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/water-filtration",
  },
  {
    id: 112,
    title: "Egg Drop Challenge",
    description: "Design a protective container to keep an egg safe from a high drop",
    image: "/activity-egg-drop.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/egg-drop",
  },
  {
    id: 113,
    title: "Electric Motor",
    description: "Build a simple electric motor to understand electromagnetism",
    image: "/activity-electric-motor.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/simple-motor",
  },
  {
    id: 114,
    title: "pH Indicator Testing",
    description: "Create natural pH indicators and test household substances",
    image: "/activity-ph-indicator.jpg",
    category: "science-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/cabbage-ph-indicator",
  },
  {
    id: 200,
    title: "Cardboard Cities",
    description: "Build miniature cities from cardboard boxes and craft supplies",
    image: "/activity-cardboard-city.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.instructables.com/Cardboard-City-1/",
  },
  {
    id: 201,
    title: "Homemade Playdough",
    description: "Make colorful playdough for endless creative sculpting fun",
    image: "/activity-playdough.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.pbs.org/parents/crafts-and-experiments/homemade-play-dough",
  },
  {
    id: 202,
    title: "Paper Plate Masks",
    description: "Create fun character masks from paper plates and decorations",
    image: "/activity-paper-masks.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.pbs.org/parents/crafts-and-experiments/paper-plate-animal-masks",
  },
  {
    id: 203,
    title: "Bird Feeders",
    description: "Build bird feeders from recycled materials to attract wildlife",
    image: "/activity-bird-feeder.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.instructables.com/Recycled-Bottle-Bird-Feeder/",
  },
  {
    id: 204,
    title: "Sock Puppets",
    description: "Transform old socks into adorable puppet characters",
    image: "/activity-sock-puppets.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.pbs.org/parents/crafts-and-experiments/sock-puppet",
  },
  {
    id: 205,
    title: "Marble Runs",
    description: "Design and build elaborate marble run tracks from household items",
    image: "/activity-marble-run.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.instructables.com/Paper-Towel-Roll-Marble-Run/",
  },
  {
    id: 206,
    title: "Kaleidoscopes",
    description: "Create beautiful kaleidoscopes using mirrors and colorful beads",
    image: "/activity-kaleidoscope.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.instructables.com/How-to-Make-a-Kaleidoscope/",
  },
  {
    id: 207,
    title: "Blanket Forts",
    description: "Engineer creative fort structures using blankets and furniture",
    image: "/activity-blanket-fort.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.pbs.org/parents/crafts-and-experiments",
  },
  {
    id: 208,
    title: "Terrariums",
    description: "Build miniature ecosystems in jars with plants and soil",
    image: "/activity-terrarium.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.instructables.com/How-to-Make-a-Terrarium-1/",
  },
  {
    id: 209,
    title: "Rubber Band Guitars",
    description: "Construct musical instruments using rubber bands and boxes",
    image: "/activity-rubber-band-guitar.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.pbs.org/parents/crafts-and-experiments/rubber-band-guitar",
  },
  {
    id: 210,
    title: "Advanced Catapults",
    description: "Build sophisticated catapults with adjustable launching mechanisms",
    image: "/activity-advanced-catapult.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.instructables.com/Popsicle-Stick-Catapult/",
  },
  {
    id: 211,
    title: "Hydraulic Arms",
    description: "Create working hydraulic arms using syringes and water pressure",
    image: "/activity-hydraulic-arm.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.instructables.com/Hydraulic-Robotic-Arm/",
  },
  {
    id: 212,
    title: "Periscopes",
    description: "Build functional periscopes using mirrors and cardboard tubes",
    image: "/activity-periscope.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.instructables.com/How-to-Make-a-Periscope/",
  },
  {
    id: 213,
    title: "Wind Chimes",
    description: "Design and assemble musical wind chimes from various materials",
    image: "/activity-wind-chimes.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.instructables.com/DIY-Wind-Chimes/",
  },
  {
    id: 214,
    title: "Rubber Band Cars",
    description: "Engineer cars powered by rubber band energy",
    image: "/activity-rubber-band-car.jpg",
    category: "diy-building",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.instructables.com/Rubber-Band-Powered-Car-1/",
  },
  {
    id: 300,
    title: "Energy Balls",
    description: "Make no-bake energy balls with oats, honey, and mix-ins",
    image: "/activity-energy-balls.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.tasteofhome.com/collection/energy-ball-recipes/",
  },
  {
    id: 301,
    title: "Fruit Kabobs",
    description: "Create colorful fruit kabobs for healthy snacking",
    image: "/activity-fruit-kabobs.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/fruit-kabobs-recipe-1973784",
  },
  {
    id: 302,
    title: "Ants on a Log",
    description: "Make the classic snack with celery, peanut butter, and raisins",
    image: "/activity-ants-on-log.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.foodnetwork.com/recipes/ants-on-a-log-recipe-1973647",
  },
  {
    id: 303,
    title: "Smoothie Making",
    description: "Blend delicious and nutritious fruit smoothies",
    image: "/activity-smoothies.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.tasteofhome.com/collection/smoothie-recipes-for-kids/",
  },
  {
    id: 304,
    title: "Cookie Decorating",
    description: "Decorate sugar cookies with frosting and sprinkles",
    image: "/activity-cookie-decorating.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/sugar-cookies-recipe-1914697",
  },
  {
    id: 305,
    title: "Pizza Making",
    description: "Create personal pizzas with favorite toppings",
    image: "/activity-pizza-making.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.tasteofhome.com/recipes/homemade-pizza/",
  },
  {
    id: 306,
    title: "Pancake Art",
    description: "Make fun shapes and designs with pancake batter",
    image: "/activity-pancake-art.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/pancake-art-recipe-2104359",
  },
  {
    id: 307,
    title: "Trail Mix",
    description: "Mix custom trail mix with nuts, dried fruit, and chocolate",
    image: "/activity-trail-mix.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.tasteofhome.com/collection/trail-mix-recipes/",
  },
  {
    id: 308,
    title: "Veggie Sushi Rolls",
    description: "Roll vegetable sushi with rice and nori sheets",
    image: "/activity-veggie-sushi.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/vegetable-sushi-rolls-recipe-2103801",
  },
  {
    id: 309,
    title: "Ice Cream in a Bag",
    description: "Make homemade ice cream by shaking ingredients in a bag",
    image: "/activity-ice-cream-bag.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.foodnetwork.com/recipes/ice-cream-in-a-bag-recipe-1973822",
  },
  {
    id: 310,
    title: "Bread Baking",
    description: "Learn to knead and bake fresh homemade bread",
    image: "/activity-bread-baking.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.tasteofhome.com/collection/easy-bread-recipes/",
  },
  {
    id: 311,
    title: "Pasta Making",
    description: "Create fresh pasta from scratch with flour and eggs",
    image: "/activity-pasta-making.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/fresh-pasta-dough-recipe-1973625",
  },
  {
    id: 312,
    title: "Stir-Fry Cooking",
    description: "Prepare colorful vegetable stir-fry with rice or noodles",
    image: "/activity-stir-fry.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.tasteofhome.com/collection/stir-fry-recipes/",
  },
  {
    id: 313,
    title: "Muffin Baking",
    description: "Bake delicious muffins with various flavors and mix-ins",
    image: "/activity-muffins.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.tasteofhome.com/collection/muffin-recipes/",
  },
  {
    id: 314,
    title: "Fresh Lemonade",
    description: "Squeeze fresh lemons to make homemade lemonade",
    image: "/activity-lemonade.jpg",
    category: "cooking-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.foodnetwork.com/recipes/food-network-kitchen/fresh-squeezed-lemonade-recipe-1973315",
  },
  {
    id: 400,
    title: "LEGO Challenges",
    description: "Build creative structures with LEGO building challenges",
    image: "/activity-lego-challenges.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/30-lego-building-challenges-for-kids/",
  },
  {
    id: 401,
    title: "Pattern Blocks",
    description: "Create geometric patterns and designs with colorful blocks",
    image: "/activity-pattern-blocks.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.mathlearningcenter.org/apps/pattern-shapes",
  },
  {
    id: 402,
    title: "Counting Games",
    description: "Fun math games to practice counting and number recognition",
    image: "/activity-counting-games.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.mathgames.com/skill/k.1-counting",
  },
  {
    id: 403,
    title: "Block Tower Building",
    description: "Engineer tall towers and test structural stability",
    image: "/activity-block-towers.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/block-tower-building-challenge/",
  },
  {
    id: 404,
    title: "Magnet Exploration",
    description: "Discover magnetic properties through hands-on experiments",
    image: "/activity-magnets.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.steamsational.com/magnet-activities-for-kids/",
  },
  {
    id: 405,
    title: "Bridge Building",
    description: "Design and construct bridges that can hold weight",
    image: "/activity-bridge-building.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.sciencebuddies.org/stem-activities/bridge-building",
  },
  {
    id: 406,
    title: "Robot Building",
    description: "Assemble simple robots with motors and basic circuits",
    image: "/activity-robot-building.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.instructables.com/Simple-Bristlebot-Robot/",
  },
  {
    id: 407,
    title: "Simple Coding",
    description: "Learn basic coding concepts with visual programming",
    image: "/activity-simple-coding.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://code.org/learn",
  },
  {
    id: 408,
    title: "Math Scavenger Hunts",
    description: "Find and solve math problems hidden around the house",
    image: "/activity-math-scavenger.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.steamsational.com/math-scavenger-hunt-for-kids/",
  },
  {
    id: 409,
    title: "Parachute Design",
    description: "Engineer parachutes and test air resistance principles",
    image: "/activity-parachute.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.sciencebuddies.org/stem-activities/parachute",
  },
  {
    id: 410,
    title: "Robot Programming",
    description: "Program robots to complete tasks and navigate obstacles",
    image: "/activity-robot-programming.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.lego.com/en-us/themes/mindstorms",
  },
  {
    id: 411,
    title: "Roller Coaster Design",
    description: "Build working roller coasters and learn about physics",
    image: "/activity-roller-coaster.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/roller-coaster",
  },
  {
    id: 412,
    title: "Skyscraper Engineering",
    description: "Design and build tall structures that withstand forces",
    image: "/activity-skyscraper.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/earthquake-resistant-building",
  },
  {
    id: 413,
    title: "Circuit Boards",
    description: "Build electronic circuits with LEDs, batteries, and switches",
    image: "/activity-circuit-boards.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.sciencebuddies.org/stem-activities/simple-circuit",
  },
  {
    id: 414,
    title: "Math Games",
    description: "Challenging math puzzles and strategy games",
    image: "/activity-math-games.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.mathplayground.com/",
  },
  {
    id: 8,
    title: "Highlights Magazine",
    description: "Classic children's magazine with puzzles, stories, and activities",
    image: "/magazine-cover-highlights.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-10",
    link: "https://www.highlights.com/",
  },
  {
    id: 49,
    title: "National Geographic Kids",
    description: "Explore nature, science, and world cultures with stunning photography",
    image: "/magazine-cover-nat-geo-kids.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 7-10",
    link: "https://kids.nationalgeographic.com/",
  },
  {
    id: 50,
    title: "Ranger Rick",
    description: "Wildlife and nature magazine that inspires outdoor exploration",
    image: "/magazine-cover-ranger-rick.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 7-10",
    link: "https://rangerrick.org/",
  },
  {
    id: 51,
    title: "Cricket Magazine",
    description: "Literary magazine featuring stories, poems, and art for young readers",
    image: "/magazine-cover-cricket.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 9-10",
    link: "https://cricketmedia.com/",
  },
  {
    id: 9,
    title: "KiwiCo Crates",
    description: "Hands-on STEM projects that inspire creativity and learning. $20-30/mo",
    image: "/product-kiwico-crate-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://www.kiwico.com/",
  },
  {
    id: 10,
    title: "KiwiCo Tinker Crate",
    description: "Engineering and design projects for older kids. $30-35/mo",
    image: "/product-tinker-crate-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.kiwico.com/tinker",
  },
  {
    id: 11,
    title: "MEL Science",
    description: "Interactive science experiments with VR experiences. $35-40/mo",
    image: "/product-mel-science-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://melscience.com/",
  },
  {
    id: 12,
    title: "Green Kid Crafts",
    description: "Eco-friendly STEM activities and creative projects. $25-30/mo",
    image: "/product-green-kid-crafts-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://www.greenkidcrafts.com/",
  },
  {
    id: 13,
    title: "Groovy Lab in a Box",
    description: "STEM experiments with real scientific tools and methods. $30-35/mo",
    image: "/product-groovy-lab-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.groovylabinbox.com/",
  },
  {
    id: 14,
    title: "Creation Crate",
    description: "Electronics and coding projects for tech-savvy kids. $30-35/mo",
    image: "/product-creation-crate-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.creationcrate.com/",
  },
  {
    id: 15,
    title: "Literati Kids Book Club",
    description: "Curated children's books delivered monthly. $10-15/mo",
    image: "/product-literati-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://literati.com/",
  },
  {
    id: 16,
    title: "OwlCrate Jr",
    description: "Middle-grade book box with exclusive editions and goodies. $35-40/mo",
    image: "/product-owlcrate-jr-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.owlcrate.com/",
  },
  {
    id: 17,
    title: "Bookroo Picture Books",
    description: "Hand-selected picture books wrapped as gifts. $20-25/mo",
    image: "/product-bookroo-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://bookroo.com/",
  },
  {
    id: 18,
    title: "Pages & Co",
    description: "Chapter books and reading activities for young readers. $30-35/mo",
    image: "/product-pages-co-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.pagesandco.com/",
  },
  {
    id: 19,
    title: "Little Passports World Edition",
    description: "Explore countries and cultures through activities and souvenirs. $18-25/mo",
    image: "/product-little-passports-world-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.littlepassports.com/",
  },
  {
    id: 20,
    title: "Little Passports USA Edition",
    description: "Discover American states with maps, stickers, and activities. $18-25/mo",
    image: "/product-little-passports-usa-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.littlepassports.com/",
  },
  {
    id: 21,
    title: "Atlas Crate by KiwiCo",
    description: "Geography and culture projects from around the world. $25-30/mo",
    image: "/product-atlas-crate-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.kiwico.com/atlas",
  },
  {
    id: 22,
    title: "Universal Yums",
    description: "Snacks from different countries with cultural facts. $15-30/mo",
    image: "/product-universal-yums-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.universalyums.com/",
  },
  {
    id: 23,
    title: "We Craft Box",
    description: "Creative craft projects with all materials included. $25-30/mo",
    image: "/product-we-craft-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://wecraftbox.com/",
  },
  {
    id: 24,
    title: "Doodle Crate by KiwiCo",
    description: "Art and design projects for creative teens. $25-30/mo",
    image: "/product-doodle-crate-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://www.kiwico.com/doodle",
  },
  {
    id: 25,
    title: "Pipsticks Sticker Club",
    description: "Curated sticker collections for creative expression. $15-18/mo",
    image: "/product-pipsticks-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://www.pipsticks.com/",
  },
  {
    id: 26,
    title: "ArtSnacks",
    description: "Premium art supplies delivered monthly for young artists. $25-30/mo",
    image: "/product-artsnacks-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.artsnacks.co/",
  },
  {
    id: 27,
    title: "Lovevery Play Kits",
    description: "Developmentally-appropriate toys and activities. $80-120/box",
    image: "/product-lovevery-play-kit-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-6",
    link: "https://lovevery.com/",
  },
  {
    id: 28,
    title: "Raddish Kids Cooking Club",
    description: "Cooking projects with recipes and kitchen tools. $25-30/mo",
    image: "/product-raddish-cooking-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 7-8",
    link: "https://www.raddishkids.com/",
  },
  {
    id: 29,
    title: "Bitsbox Coding",
    description: "Learn coding through fun app-building projects. $30-35/mo",
    image: "/product-bitsbox-coding-box.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 9-10",
    link: "https://bitsbox.com/",
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAge, setSelectedAge] = useState("All Ages")

  const filteredResources = resources.filter((resource) => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory
    const ageMatch = selectedAge === "All Ages" || resource.ageRange === selectedAge
    return categoryMatch && ageMatch
  })

  const currentCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name || "All Categories"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 border-b bg-primary-foreground py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-16 mx-0" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 md:px-12 py-8 bg-primary-foreground pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h2 className="text-lg font-bold text-primary mb-4">Categories</h2>
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? "bg-secondary text-primary-foreground font-medium"
                            : "text-primary hover:bg-muted/50"
                        }`}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{category.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-primary">{filteredResources.length}</span> resources found for{" "}
                  <span className="font-semibold">{selectedAge.toLowerCase()}</span> in{" "}
                  <span className="font-semibold">{currentCategoryName.toLowerCase()}</span>
                </p>

                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-primary">Explore All Resources</h1>
                  <p className="text-lg text-popover-foreground">
                    {selectedAge !== "All Ages" && `${selectedAge} • `}
                    {selectedCategory !== "all" && `${currentCategoryName} • `}
                    {filteredResources.length} resources to grow together
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-bold text-primary mb-3">Filter by Age</h3>
                  <div className="flex flex-wrap gap-2">
                    {ageRanges.map((age) => (
                      <Button
                        key={age}
                        variant={selectedAge === age ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedAge(age)}
                        className={
                          selectedAge === age
                            ? "rounded-full bg-secondary text-primary-foreground hover:bg-secondary/90"
                            : "rounded-full"
                        }
                      >
                        {age}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resource Grid */}
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No resources found for the selected filters.</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all")
                      setSelectedAge("All Ages")
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
