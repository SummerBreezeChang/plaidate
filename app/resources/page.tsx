"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ResourceCard } from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { BookOpen, Headphones, Hammer, ChefHat, Cpu, Package, Book } from "lucide-react"
import { Newspaper, Menu, X } from "lucide-react"
import { addAffiliateTagsToResources } from "@/lib/amazon-affiliate"

const categories = [
  { id: "all", name: "All Categories", icon: null },
  { id: "podcasts", name: "Podcasts", icon: Headphones },
  { id: "magazines", name: "Magazines", icon: Newspaper },
  { id: "kids-books", name: "Kids Books", icon: Book },
  { id: "parenting-books", name: "Parenting Books", icon: BookOpen },
  { id: "stem-activities", name: "STEM Activities", icon: Cpu },
  { id: "cooking-activities", name: "Cooking Activities", icon: ChefHat },
  { id: "diy-building", name: "DIY Building Activities", icon: Hammer },
  { id: "subscription-boxes", name: "Subscription Boxes", icon: Package },
]

const ageRanges = ["All Ages", "Ages 5-6", "Ages 7-8", "Ages 9-10"]

const resourcesData = [
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
    title: "The Day the Crayons Quit",
    description: "A hilarious and creative story about crayons going on strike by Drew Daywalt",
    image: "https://m.media-amazon.com/images/I/41v8LrBd+1L._SX342_SY445_ControlCacheEqualizer_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-8",
    link: "https://www.amazon.com/Day-Crayons-Quit-Drew-Daywalt/dp/0399255370",
  },
  {
    id: 32,
    title: "Where the Wild Things Are",
    description: "Classic tale of imagination and adventure by Maurice Sendak",
    image: "https://m.media-amazon.com/images/I/612cvg4xMFL._SX342_SY445_ControlCacheEqualizer_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-8",
    link: "https://amzn.to/4owEHVi",
  },
  {
    id: 33,
    title: "The Giving Tree",
    description: "Timeless story about generosity and love by Shel Silverstein",
    image: "https://m.media-amazon.com/images/I/71wiGMKadmL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "https://amzn.to/3J77gtH",
  },
  {
    id: 34,
    title: "Charlotte's Web",
    description: "Beloved story of friendship between a pig and a spider by E.B. White",
    image: "https://m.media-amazon.com/images/I/81VpAuYf2tL._SL1360_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-10",
    link: "https://amzn.to/4qzOrQM",
  },
  {
    id: 35,
    title: "The Very Hungry Caterpillar",
    description: "Colorful journey of a caterpillar's transformation by Eric Carle",
    image: "https://m.media-amazon.com/images/I/81qsstEtrgL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://amzn.to/47sAtHs",
  },
  // Removed kids books (ids 31-35) - will be fetched from Amazon API
  {
    id: 5,
    title: "Good Inside with Dr. Becky",
    description: "Dr. Becky Kennedy shares practical parenting strategies and insights",
    image:
      "https://www.goodinside.com/_next/image/?url=https%3A%2F%2Fmedia.goodinside.com%2Fwp-content%2Fuploads%2F2022%2F01%2F16165840%2Fpodcast-hero-image.png&w=1920&q=75",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://www.goodinside.com/podcast/",
  },
  {
    id: 36,
    title: "The Longest Shortest Time",
    description: "Honest conversations about the beautiful, messy reality of parenting",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/7a/c9/4d/7ac94d7d-8bd7-ec02-29e7-9ade3c276fec/mza_8069757835232362769.jpeg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://longestshortesttime.com/",
  },
  {
    id: 37,
    title: "Unruffled",
    description: "Janet Lansbury's respectful parenting advice and guidance",
    image:
      "https://d3tkwokssgv28o.cloudfront.net/wp-content/uploads/2015/08/15063638/Respectful-Parenting-Podcasts-Janet-Lansbury-Unruffled.jpg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://www.janetlansbury.com/podcast-audio/",
  },
  {
    id: 38,
    title: "The Mom Hour",
    description: "Real talk about motherhood, parenting, and life balance",
    image:
      "https://content.production.cdn.art19.com/images/f3/0b/23/d1/f30b23d1-a776-480c-9724-c2e47912b285/3f949c8a077eff5048bed4181386a30113fb7d040e4b9c40873b4255167314919747013ca3c39d653aab32cb1cd0bd5141b005a26d345c9dfbb7164bd46171e6.jpeg",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://themomhour.com/",
  },
  {
    id: 39,
    title: "Karma & Chaos",
    description: "Kail Lowry & Becky Hayter discuss real parenting challenges with humor and honesty",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/07/0b/41/070b4137-6918-8177-e0a0-46ca2a713603/mza_9354260193347751978.jpeg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/karma-chaos-with-kail-lowry-becky-hayter/id1532102239",
  },
  {
    id: 40,
    title: "For Crying Out Loud",
    description: "Hilarious and heartfelt conversations about the ups and downs of parenting",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a4/48/9f/a4489fd6-22ef-1e8a-b00c-11257733e56b/mza_6173555322903625944.jpg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "https://podcasts.apple.com/us/podcast/for-crying-out-loud/id354082588",
  },
  {
    id: 41,
    title: "Care and Feeding",
    description: "Slate's parenting show offering advice on raising kids in today's world",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/f9/f6/09/f9f609b2-da63-f904-9e17-e85103cecbc4/mza_5983804079826215748.jpg/300x300bb.webp",
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
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/17/53/7f/17537fbb-9d61-b47b-1d39-38c7072e24df/mza_12980508835516502454.jpg/300x300bb.webp",
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
    link: "https://podcasts.apple.com/gb/podcast/motherhood-in-black-and-white/id1525043882",
  },
  {
    id: 45,
    title: "Wow in the World",
    description: "Science and curiosity podcast that makes learning fun for kids",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/4c/b0/4a/4cb04a06-4e0a-d534-2a28-3f2fb37fa14e/mza_14610475686329584932.jpeg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://podcasts.apple.com/us/podcast/wow-in-the-world/id1233834541",
  },
  {
    id: 46,
    title: "Story Pirates",
    description: "Professional actors bring kids' stories to life with music and comedy",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/b5/93/16/b5931679-5def-c089-a36a-e5f3e3c4cc79/mza_6689736812831414250.jpg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://podcasts.apple.com/us/podcast/story-pirates/id719585944",
  },
  {
    id: 47,
    title: "Circle Round",
    description: "Folktales from around the world adapted for modern kids",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/30/d2/ab/30d2ab4f-f30f-d237-47ff-a0a1b631a542/mza_5757785439665484212.jpg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 5-10",
    link: "https://podcasts.apple.com/us/podcast/circle-round/id1246443751",
  },
  {
    id: 48,
    title: "Brains On!",
    description: "Science podcast for curious kids exploring how the world works",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/99/e5/39/99e53993-e2ea-70a3-64d6-f2f86ab84e53/mza_8458923780593912977.jpg/300x300bb.webp",
    category: "podcasts",
    type: "Podcast",
    ageRange: "Ages 7-10",
    link: "https://open.spotify.com/show/4EaTaVeNXR4QSFAArpyZyd",
  },
  {
    id: 100,
    title: "National Geographic Ultimate Volcano Kit",
    description: "Erupting volcano science kit with real lava eruptions and learning guide",
    image: "/national-geographic-volcano-science-kit-box-with-e.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/NATIONAL-GEOGRAPHIC-Ultimate-Volcano-Kit/dp/B08KTWWF1Y",
  },
  {
    id: 101,
    title: "National Geographic Mega Crystal Growing Kit",
    description: "Grow 6 vibrant crystals with light-up display stand for hands-on science learning",
    image: "/national-geographic-crystal-growing-kit-with-color.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/NATIONAL-GEOGRAPHIC-Mega-Crystal-Growing/dp/B084R8X13B",
  },
  {
    id: 102,
    title: "Thames & Kosmos Ooze Labs Chemistry Station",
    description: "20 non-hazardous experiments including safe slime, acids, bases and chromatography",
    image: "/thames-kosmos-ooze-labs-chemistry-station-science-.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Thames-Kosmos-Chemistry-Station-Experiment/dp/B07B7W5S3H",
  },
  {
    id: 103,
    title: "4M Weather Science Kit",
    description: "Create rain, clouds, and weather phenomena to understand meteorology",
    image: "/4m-weather-science-kit-with-weather-station-tools-.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/4M-3689-Weather-Science-Kit/dp/B00BFPH2LY",
  },
  {
    id: 104,
    title: "National Geographic Mega Slime Kit & Putty Lab",
    description: "Make 4 types of slime and 4 types of putty including magnetic putty",
    image: "/national-geographic-slime-kit-with-colorful-slime-.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/NATIONAL-GEOGRAPHIC-Slime-Putty-Glow/dp/B07B4MTWTX",
  },
  {
    id: 105,
    title: "360° Orbiting Solar System Model Kit",
    description: "Paint and build a working solar system model with 8 planets that orbit",
    image: "/solar-system-model-kit-with-planets-and-orbiting-m.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B0BXQZ8VYJ",
  },
  {
    id: 106,
    title: "National Geographic Jumbo Crystal Growing Kit",
    description: "Grow a giant glow-in-the-dark crystal in just a few days",
    image: "/national-geographic-jumbo-crystal-growing-kit-with.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/National-Geographic-Jumbo-Crystal-Growing/dp/B0CZPLQT11",
  },
  {
    id: 107,
    title: "Thames & Kosmos Easy Electric Circuits Kit",
    description: "15 experiments and 5 motorized models to learn about electricity and circuits",
    image: "/thames-kosmos-electric-circuits-kit-with-wires-mot.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Thames-Kosmos-Essential-Circuitry-Experiments/dp/B08TVYM5RS",
  },
  {
    id: 108,
    title: "Kids Beginner Microscope Kit",
    description: "100X-1200X magnification microscope with LED light and prepared slides",
    image: "/kids-microscope-kit-with-led-light-prepared-slides.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/58-Piece-Kids-Microscope-Kit-Magnification/dp/B09DVFG6JN",
  },
  {
    id: 109,
    title: "National Geographic Stunning Chemistry Set",
    description: "Over 100 experiments including volcano eruption and rocket launch",
    image: "/national-geographic-chemistry-set-with-test-tubes-.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/NATIONAL-GEOGRAPHIC-Stunning-Chemistry-Set/dp/B0BXQYQZ8V",
  },
  {
    id: 110,
    title: "SMARTLAB Toys Storm Watcher Weather Lab",
    description: "18 wild weather experiments to create storms, tornadoes, and lightning",
    image: "/smartlab-storm-watcher-weather-lab-kit-with-weathe.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/SmartLab-Toys-Storm-Watcher-Weather/dp/B08BVYJ76L",
  },
  {
    id: 111,
    title: "Discovery Extreme Weather STEM Science Kit",
    description: "Create artificial snow, erupting volcanoes, and extreme weather phenomena",
    image: "/discovery-extreme-weather-science-kit-with-weather.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Discovery-Kids-Experiments-Erupting-Artificial/dp/B01N7WJSJL",
  },
  {
    id: 112,
    title: "BATURU STEM Electronics Kit",
    description: "70 science experiments teaching electronics and circuit building",
    image: "/baturu-stem-electronics-kit-with-circuit-boards-an.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/BATURU-Circuits-40-Electronics-Exploration/dp/B0CWLDSRCD",
  },
  {
    id: 113,
    title: "Explore Science 50 Electronic Circuits Kit",
    description: "Build 50 different electronic circuits with snap-together components",
    image: "/explore-science-electronic-circuits-kit-with-snap-.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Explore-Science-Electronic-Experiment-Set/dp/B09D8M71LW",
  },
  {
    id: 114,
    title: "National Geographic Mega Science Lab",
    description: "Over 130 experiments featuring earth science, chemistry, and magic STEM projects",
    image: "/national-geographic-mega-science-lab-kit-with-mult.jpg",
    category: "stem-activities",
    type: "Activity",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/NATIONAL-GEOGRAPHIC-Mega-Science-Lab/dp/B09LRHSXW9",
  },
  {
    id: 200,
    title: "LEGO Classic Large Creative Brick Box",
    description: "790-piece building set with 33 different colors for endless creative construction",
    image: "/lego-classic-large-creative-brick-box-with-colorfu.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/LEGO-Classic-Creative-Building-Pieces/dp/B00NHQFA3I",
  },
  {
    id: 201,
    title: "Plus-Plus Open Play Set",
    description: "240-piece interlocking building blocks in basic colors for creative construction",
    image: "/plus-plus-colorful-interlocking-building-blocks-in.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/PLUS-Plus-Plus-Construction-Building-Interlocking/dp/B00JZO7CNA",
  },
  {
    id: 202,
    title: "Melissa & Doug Wooden Building Blocks Set",
    description: "100-piece wooden blocks in 4 colors and 9 shapes for classic construction play",
    image: "/wooden-building-blocks-set-with-natural-wood-and-c.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Melissa-Doug-Wooden-Building-Blocks/dp/B00005RF5G",
  },
  {
    id: 203,
    title: "Lincoln Logs Classic Meetinghouse",
    description: "111-piece real wood building set to create classic log cabin structures",
    image: "/lincoln-logs-wooden-building-set-with-log-cabin-pi.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Lincoln-Logs-Classic-Meetinghouse-Building/dp/B00NHQFCNC",
  },
  {
    id: 204,
    title: "Tinkertoy 30 Model Super Building Set",
    description: "200-piece classic construction set to build 30 different models",
    image: "/tinkertoy-building-set-with-colorful-rods-and-conn.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/TINKERTOY-Model-Super-Building-Set/dp/B00JRGVEG2",
  },
  {
    id: 205,
    title: "Marble Run Building Blocks",
    description: "135-piece marble maze construction set with tracks and marbles for STEM learning",
    image: "/colorful-marble-run-building-blocks-with-transpare.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Marble-Run-Set-135PCS-Marble-Maze-Construction-Building-Block-Kid-Toys-Marble-Track-STEM-Toys-Learning-Education-10-11-12-Years-Old-Boys/dp/B09BTJVS31",
  },
  {
    id: 206,
    title: "Geomag Classic Magnetic Building Set",
    description: "60-piece magnetic construction toy with rods and steel spheres for 3D structures",
    image: "/geomag-magnetic-building-set-with-colorful-rods-an.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Geomag-Classic-Color-Piece-Magnetic/dp/B00HNMWFXE",
  },
  {
    id: 207,
    title: "K'NEX Thrill Rides Building Set",
    description: "Building set with 473 pieces to create working roller coaster models",
    image: "/k-nex-roller-coaster-building-set-with-colorful-pi.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/KNEX-Thrill-Rides-Roller-Coaster/dp/B00TXYKP5E",
  },
  {
    id: 208,
    title: "Wondertoys Wooden Logs Building Set",
    description: "530-piece wooden log construction set for building cabins and structures",
    image: "/wooden-logs-building-set-with-natural-wood-pieces-.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Wondertoys-Building-Construction-Engineering-Educational/dp/B0BVR1NDKW",
  },
  {
    id: 209,
    title: "Magna-Tiles Clear Colors 100 Piece Set",
    description: "Magnetic building tiles in translucent colors for creative 3D construction",
    image: "/magna-tiles-clear-colorful-magnetic-building-tiles.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Magna-Tiles-Clear-Colors-100-Piece/dp/B000CBSNRY",
  },
  {
    id: 210,
    title: "HOGOKIDS 5 in 1 STEM Building Set",
    description: "APP and remote-controlled building kit with LED lights for cars, robots, and tanks",
    image: "/hogokids-stem-building-set-with-led-lights-and-rem.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/HOGOKIDS-STEM-Building-Set-Light/dp/B0C9Q61RJ2",
  },
  {
    id: 211,
    title: "Butterfly Edufields 10in1 STEM Robotics Kit",
    description: "Engineering building kit to create 10 different robotic models",
    image: "/stem-robotics-building-kit-with-mechanical-parts-a.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Butterfly-EduFields-Educational-Building-Robotics/dp/B07VQKV6TD",
  },
  {
    id: 212,
    title: "SainSmart Jr. Wooden Log Cabin Set",
    description: "450-piece classic STEM construction kit with colorful wood logs for building houses",
    image: "/wooden-log-cabin-building-set-with-colorful-logs-a.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/SainSmart-Jr-Building-Construction-Engineering-20-338/dp/B0BDKPNMG7",
  },
  {
    id: 213,
    title: "Geomag Mechanics Magnetic Motion",
    description: "146-piece magnetic building set with gears and mechanical elements for moving structures",
    image: "/geomag-mechanics-magnetic-building-set-with-gears-.jpg",
    category: "diy-building",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Geomag-Mechanics-Magnetic-Educational-Construction/dp/B07PM7SZHV",
  },
  // {
  //   id: 214,
  //   title: "Tinkertoy Retro Building Set Tin",
  //   description: "100-part classic wooden construction set in collectible tin container",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "diy-building",
  //   type: "Product",
  //   ageRange: "Ages 9-10",
  //   link: "https://www.amazon.com/KNEX-TINKERTOY-Retro-Building-Collectible/dp/B06XKJPQVR",
  // },
  {
    id: 300,
    title: "Tovla Jr. Kid Safe Knife Set",
    description: "3-piece safe cooking knife set for kids ages 4-12, BPA-free and dishwasher-safe",
    image: "/colorful-kid-safe-cooking-knife-set-with-three-siz.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/dp/B0BXMJHFXP",
  },
  {
    id: 301,
    title: "Baketivity Kids Baking Tools Set",
    description: "31-piece real baking utensils set with recipe cards for young chefs",
    image: "/kids-baking-tools-set-with-colorful-utensils-and-r.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/dp/B08MQRTRYS",
  },
  {
    id: 302,
    title: "WeeSprout Little Chef Cooking Set",
    description: "14-piece kids cooking and baking set with real kitchen tools and apron",
    image: "/kids-chef-cooking-set-with-apron-and-colorful-uten.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/dp/B0B5HW645J",
  },
  {
    id: 303,
    title: "Kids Cookie Decorating Kit",
    description: "Professional cookie decorating kit with tools and accessories",
    image: "/kids-cookie-decorating-kit-with-icing-tools-and-sp.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/dp/B0BXMJHFXP",
  },
  {
    id: 304,
    title: "Little Cook Measuring Cups Set",
    description: "12-piece colorful measuring cups and spoons for baking and cooking",
    image: "/colorful-stackable-measuring-cups-and-spoons-for-k.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/dp/B0BY92B5B3",
  },
  {
    id: 305,
    title: "MasterChef Junior Pizza Cooking Set",
    description: "5-piece pizza making kit with real cookware, recipes, board, and roller",
    image: "/kids-pizza-making-set-with-rolling-pin-and-pizza-p.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B000WDT934",
  },
  {
    id: 306,
    title: "Baketivity DIY Cake Pop Baking Kit",
    description: "Complete cake pop making kit with all ingredients and tools included",
    image: "/kids-cake-pop-baking-kit-with-molds-and-decorating.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B08MQRTRYS",
  },
  {
    id: 307,
    title: "Opinel Le Petit Chef Kitchen Set",
    description: "3-piece French chef set with rounded tip knife, finger guard, and peeler",
    image: "/french-kids-chef-knife-set-with-finger-guard-and-p.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B01N7T6R6T",
  },
  {
    id: 308,
    title: "Montessori Kids Knife Set",
    description: "13-piece wooden kids kitchen knife set for real cooking",
    image: "/wooden-montessori-kids-knife-set-with-cutting-boar.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B0C1QXQXQX",
  },
  {
    id: 309,
    title: "IELEK Real Baking Set with Apron",
    description: "Complete pastry cooking kit with apron, rolling pin, and recipes",
    image: "/kids-baking-set-with-chef-apron-and-rolling-pin.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/dp/B08HX354D5",
  },
  {
    id: 310,
    title: "GIFTINBOX Kids Cooking Set",
    description: "54-piece complete cooking and baking kit with utensils and accessories",
    image: "/large-kids-cooking-set-with-many-colorful-utensils.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/dp/B09MRGWR6N",
  },
  {
    id: 311,
    title: "Kizzikids Safe Knife Set",
    description: "4-piece round tip serrated edge knives with firm grip, BPA-free",
    image: "/colorful-kids-safe-knives-with-round-tips-and-serr.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/dp/B0BXMJHFXP",
  },
  {
    id: 312,
    title: "Tovla Jr. Ultimate Pizza Kit",
    description: "Complete pizza making kit for kids with all tools and accessories",
    image: "/kids-ultimate-pizza-making-kit-with-tools-and-acce.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/dp/B0CZBXWY33",
  },
  {
    id: 313,
    title: "Baketivity Kids Cooking Utensils",
    description: "Real cooking utensils set with kitchen tool guide for young chefs",
    image: "/kids-cooking-utensils-set-with-spatulas-and-mixing.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/dp/B0B9FQ5BNJ",
  },
  {
    id: 314,
    title: "WeeSprout Ultimate Baking Kit",
    description: "Complete baking kit with child-sized utensils and measuring tools",
    image: "/kids-ultimate-baking-kit-with-child-sized-measurin.jpg",
    category: "cooking-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/dp/B0C8R4BZ1V",
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
    id: 600,
    title: "Snap Circuits SC-300 Electronics Kit",
    description: "Build over 300 working electronic circuits and learn about electricity with snap-together components",
    image: "/snap-circuits-sc-300-electronics-kit-box-with-colo.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Snap-Circuits-SC-300-Electronics-Exploration/dp/B0000683A4",
  },
  {
    id: 601,
    title: "National Geographic Mega Science Lab",
    description: "Over 130 hands-on experiments covering chemistry, earth science, and magic STEM projects",
    image: "/national-geographic-mega-science-lab-kit-box-with-.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/National-Geographic-Mega-Science-Lab/dp/B07VQKV6TD",
  },
  {
    id: 602,
    title: "Magna-Tiles Clear Colors 100 Piece Set",
    description: "America's #1 magnetic building tiles for creative construction and spatial reasoning",
    image: "/magna-tiles-clear-colorful-magnetic-building-tiles.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Magna-Tiles-100-Piece-Clear-Colors-Award-Winning/dp/B000CBSNRY",
  },
  {
    id: 603,
    title: "Osmo Coding Starter Kit for iPad",
    description: "Interactive coding games that teach programming fundamentals through hands-on play",
    image: "/osmo-coding-starter-kit-with-ipad-base-and-colorfu.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Osmo-Educational-Games-Ages-Puzzles-STEM-Fundamentals/dp/B085NN5678",
  },
  {
    id: 604,
    title: "ThinkFun Gravity Maze",
    description: "Award-winning marble run logic game that builds spatial reasoning and planning skills",
    image: "/thinkfun-gravity-maze-marble-run-logic-game-with-c.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/ThinkFun-Gravity-Marble-Logic-Girls/dp/B00IUAAK2A",
  },
  {
    id: 605,
    title: "Botley 2.0 Coding Robot",
    description: "Screen-free coding robot that teaches programming through hands-on activities",
    image: "/botley-2-0-blue-coding-robot-with-remote-control-a.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Learning-Resources-Botley-Coding-Robot/dp/B083T5G5ZK",
  },
  {
    id: 606,
    title: "K'NEX Thrill Rides Building Set",
    description: "Engineering construction set with motorized parts to build working roller coasters",
    image: "/k-nex-thrill-rides-roller-coaster-building-set-wit.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/KNEX-Thrill-Rides-Bionic-Building/dp/B00TXYKP5Y",
  },
  {
    id: 607,
    title: "Sphero Mini Coding Robot Ball",
    description: "App-enabled robot ball that teaches coding through games and creative activities",
    image: "/sphero-mini-blue-robot-ball-with-app-interface.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/Sphero-M001BRW-Mini-App-Enabled-Robot/dp/B072B6QVVW",
  },
  {
    id: 608,
    title: "LEGO Classic Creative Building Set",
    description: "1,500 pieces for endless creative building and engineering exploration",
    image: "/lego-classic-creative-building-bricks-set-with-col.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/LEGO-Classic-Creative-Building-Bricks/dp/B07GY8KZRZ",
  },
  {
    id: 609,
    title: "Thames & Kosmos RoboRails",
    description: "Build a robot monorail system and explore physics and gyroscopic forces",
    image: "/thames-.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Thames-Kosmos-RoboRails-STEM-Kit/dp/B0CRJW2GT8",
  },
  {
    id: 610,
    title: "GeoSafari Jr. Talking Microscope",
    description: "Kid-friendly microscope with voice narration featuring 60 images and 100+ facts",
    image: "/geosafari-jr-talking-microscope-for-kids-with-colo.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Educational-Insights-GeoSafari-Talking-Microscope/dp/B01MXZB4YO",
  },
  {
    id: 611,
    title: "Makeblock mBot Robot Kit",
    description: "Programmable robot kit for learning coding, electronics, and robotics",
    image: "/makeblock-mbot-programmable-robot-kit-with-blue-ch.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 9-10",
    link: "https://www.amazon.com/Makeblock-mBot-Robot-Kit-Kids/dp/B00SK5RUQY",
  },
  {
    id: 612,
    title: "4M Tin Can Robot",
    description: "Build a walking robot from a recycled tin can and learn about motors and mechanics",
    image: "/4m-tin-can-robot-kit-with-recycled-can-and-motor-p.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/4M-Tin-Can-Robot/dp/B000BKQG8Y",
  },
  {
    id: 613,
    title: "Learning Resources Gears! Gears! Gears!",
    description: "Colorful interlocking gears for building and learning about simple machines",
    image: "/learning-resources-gears-building-set-with-colorfu.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 5-6",
    link: "https://www.amazon.com/Learning-Resources-Gears-Beginners-Building/dp/B000066PL0",
  },
  {
    id: 614,
    title: "4M Kitchen Science Kit",
    description: "Turn your kitchen into a science lab with fun food experiments",
    image: "/4m-kitchen-science-kit-box-with-food-experiments.jpg",
    category: "stem-activities",
    type: "Product",
    ageRange: "Ages 7-8",
    link: "https://www.amazon.com/4M-Kitchen-Science-Kit-FSG3296/dp/B002ACVV7I",
  },
  // {
  //   id: 615,
  //   title: "Scientific Explorer Mind Blowing Science Kit",
  //   description: "Perform amazing science experiments with easy-to-follow instructions",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "stem-activities",
  //   type: "Product",
  //   ageRange: "Ages 7-8",
  //   link: "https://www.amazon.com/Scientific-Explorer-Blowing-Science-Kit/dp/B00B1HXHGQ",
  // },
  // {
  //   id: 616,
  //   title: "Engino STEM Mechanics Kit",
  //   description: "Build working models and learn about gears, pulleys, and mechanical advantage",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "stem-activities",
  //   type: "Product",
  //   ageRange: "Ages 9-10",
  //   link: "https://www.amazon.com/ENGINO-Discovering-STEM-Mechanics-Pulleys/dp/B00HNMWFXE",
  // },
  // {
  //   id: 617,
  //   title: "Playz Kaboom! Explosive Combustion Science Kit",
  //   description: "Learn about chemical reactions with safe, explosive experiments",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "stem-activities",
  //   type: "Product",
  //   ageRange: "Ages 9-10",
  //   link: "https://www.amazon.com/Playz-Kaboom-Explosive-Combustion-Science/dp/B075RV2ZRR",
  // },
  // {
  //   id: 618,
  //   title: "Elenco Snap Circuits Jr.",
  //   description: "Build over 100 electronic projects with easy snap-together parts",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "stem-activities",
  //   type: "Product",
  //   ageRange: "Ages 7-8",
  //   link: "https://www.amazon.com/Snap-Circuits-SC-100-Electronics-Exploration/dp/B00008BFZH",
  // },
  // {
  //   id: 619,
  //   title: "National Geographic Rock Tumbler Kit",
  //   description: "Polish rocks into beautiful gemstones and learn about geology",
  //   image: "/placeholder.svg?height=400&width=300",
  //   category: "stem-activities",
  //   type: "Product",
  //   ageRange: "Ages 9-10",
  //   link: "https://www.amazon.com/National-Geographic-Professional-Rock-Tumbler/dp/B01N0764GK",
  // },
  {
    id: 8,
    title: "Highlights Magazine",
    description: "Classic children's magazine with puzzles, stories, and activities",
    image: "https://shop.highlights.com/media/wysiwyg/_ST-SAT-08781-Homepage-2up-Image1.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-10",
    link: "https://www.highlights.com/",
  },
  {
    id: 49,
    title: "National Geographic Kids",
    description: "Explore nature, science, and world cultures with stunning photography",
    image: "https://i.natgeofe.com/k/1496c0cf-435e-49be-909e-f056f12a7358/what-dung-detectives-kids_16x9.jpg?wp=1&w=1280&h=720",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 7-10",
    link: "https://kids.nationalgeographic.com/",
  },
  {
    id: 50,
    title: "Ranger Rick",
    description: "Wildlife and nature magazine that inspires outdoor exploration",
    image: "https://rangerrick.org/wp-content/uploads/2018/03/bestshots.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 7-10",
    link: "https://rangerrick.org/",
  },
  {
    id: 51,
    title: "Cricket Magazine",
    description: "Literary magazine featuring stories, poems, and art for young readers",
    image: "https://shop.cricketmedia.com/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/l/y/lyb2509-650_1_5.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 9-10",
    link: "https://cricketmedia.com/",
  },
  {
    id: 53,
    title: "Don't Let the Pigeon Drive the Sleigh!",
    description: "Hilarious picture book featuring the persistent pigeon by Mo Willems",
    image: "https://m.media-amazon.com/images/I/71B6EAGotwL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://amzn.to/4oxPJtw",
  },
  {
    id: 54,
    title: "Dragons Love Tacos",
    description: "New York Times bestseller about dragons and their love for tacos by Adam Rubin",
    image: "https://m.media-amazon.com/images/I/31Wo21-YjbL.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://amzn.to/4hyadjC",
  },
  {
    id: 58,
    title: "Pete the Cat: I Love My White Shoes",
    description: "Popular series about Pete the Cat and his adventures by James Dean",
    image: "https://m.media-amazon.com/images/I/71DYPJVp-2L._SL1000_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 5-6",
    link: "https://amzn.to/48PtJFZ",
  },
  {
    id: 62,
    title: "Dog Man",
    description: "Brilliant graphic novel series loved by readers aged 6+ by Dav Pilkey",
    image: "https://m.media-amazon.com/images/I/8118RTT81LL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://amzn.to/47oDSai",
  },
  {
    id: 63,
    title: "Diary of a Wimpy Kid",
    description: "Bestselling series about middle school life by Jeff Kinney",
    image: "https://m.media-amazon.com/images/I/615ewwnsdIL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://amzn.to/47IAmJc",
  },
  {
    id: 64,
    title: "Captain Underpants",
    description: "Hilarious series with staying power by Dav Pilkey",
    image: "https://m.media-amazon.com/images/I/71sy8CMF+cL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://amzn.to/3L9qMq8",
  },
  {
    id: 65,
    title: "Matilda",
    description: "Classic story about a brilliant girl with magical powers by Roald Dahl",
    image: "https://m.media-amazon.com/images/I/81UQyyHyB7L._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://amzn.to/3WY7k20",
  },
  {
    id: 66,
    title: "Charlie and the Chocolate Factory",
    description: "Beloved tale of Willy Wonka's magical chocolate factory by Roald Dahl",
    image: "https://m.media-amazon.com/images/I/81Dp5Of3zeL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 7-8",
    link: "https://m.media-amazon.com/images/I/81Dp5Of3zeL._SL1500_.jpg",
  },
  {
    id: 67,
    title: "Percy Jackson & The Lightning Thief",
    description: "Middle-grade favorite about Greek mythology and adventure by Rick Riordan",
    image: "https://m.media-amazon.com/images/I/91WN6a6F3RL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://amzn.to/3L5PzeF",
  },
  {
    id: 69,
    title: "Holes",
    description: "Award-winning adventure about Camp Green Lake by Louis Sachar",
    image: "https://m.media-amazon.com/images/I/81wiZw1LEXL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://amzn.to/47F2jBD",
  },
  {
    id: 70,
    title: "Artemis Fowl",
    description: "Fantasy adventure about a teenage criminal mastermind by Eoin Colfer",
    image: "https://m.media-amazon.com/images/I/71uFptiuBfL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://amzn.to/4hrl0Mo",
  },
  {
    id: 71,
    title: "The Undead Fox of Deadwood Forest",
    description: "Amazon Editors' top children's book pick for ages 9-12 in 2025",
    image: "https://m.media-amazon.com/images/I/91D8xfU9VeL._SL1500_.jpg",
    category: "kids-books",
    type: "Book",
    ageRange: "Ages 9-10",
    link: "https://amzn.to/479E1j0",
  },
  {
    id: 72,
    title: "The Book You Wish Your Parents Had Read",
    description: "Insightful guide to understanding yourself and your children better by Philippa Perry",
    image: "https://m.media-amazon.com/images/I/71mtIJQMmDL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4qubE6B",
  },
  {
    id: 73,
    title: "How to Raise Kids Who Aren't Assholes",
    description: "Science-based strategies for better parenting from tots to teens by Melinda Wenner Moyer",
    image: "https://m.media-amazon.com/images/I/712iTL05WTL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/3J88Ds6",
  },
  {
    id: 74,
    title: "Raising Good Humans",
    description: "A mindful guide to breaking the cycle of reactive parenting by Hunter Clarke-Fields",
    image: "https://m.media-amazon.com/images/I/71p8u3kW7QL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/42WQZ1c",
  },
  {
    id: 75,
    title: "The Danish Way of Parenting",
    description:
      "What the happiest people in the world know about raising confident children by Jessica Joelle Alexander",
    image: "https://m.media-amazon.com/images/I/71-NXCxRK+L._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4hAyq98",
  },
  {
    id: 76,
    title: "The Confident Child",
    description: "Raising children to believe in themselves by Terri Apter",
    image: "https://m.media-amazon.com/images/I/61FEuxJeN2L._SL1200_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/3JohFBh",
  },
  {
    id: 77,
    title: "You Are Not a Sh*tty Parent",
    description: "How to practice self-compassion and give yourself a break by Carla Naumburg",
    image: "https://m.media-amazon.com/images/I/71BcwmWHeZL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/3WVTtZZ",
  },
  {
    id: 78,
    title: "The Scaffold Effect",
    description: "Raising resilient, self-reliant, and secure kids in an age of anxiety by Harold Koplewicz",
    image: "https://m.media-amazon.com/images/I/81BCu8xafDL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4ofv9OU",
  },
  {
    id: 79,
    title: "How to Stop Losing Your Sh*t With Your Kids",
    description: "A practical guide to becoming a calmer, happier parent by Carla Naumburg",
    image: "https://m.media-amazon.com/images/I/815jpstvN9L._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4oCBrrB",
  },
  {
    id: 80,
    title: "There's No Such Thing as Bad Weather",
    description: "A Scandinavian mom's secrets for raising healthy, resilient kids by Linda Åkeson McGurk",
    image: "https://m.media-amazon.com/images/I/812XRkc+5gL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4huuVkv",
  },
  {
    id: 81,
    title: "Remaining You While Raising Them",
    description: "The secret art of confident motherhood by Alli Worthington",
    image: "https://m.media-amazon.com/images/I/71V6lFz8AeL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/48Py3VQ",
  },
  {
    id: 82,
    title: "The Parents We Mean to Be",
    description: "How well-intentioned adults undermine children's moral development by Richard Weissbourd",
    image: "https://m.media-amazon.com/images/I/71s6DJaVxdL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4qs1vY6",
  },
  {
    id: 83,
    title: "Fourteen Talks by Age Fourteen",
    description: "Essential conversations you need to have with your kids before high school by Michelle Icard",
    image: "https://m.media-amazon.com/images/I/71dSOi1wsiL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/47sRKR2",
  },
  {
    id: 84,
    title: "The Importance of Being Little",
    description: "What young children really need from grownups by Erika Christakis",
    image: "https://m.media-amazon.com/images/I/61HfvDVai-L._SL1200_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4hsmx4N",
  },
  {
    id: 85,
    title: "When You Wonder, You're Learning",
    description: "Mister Rogers' enduring lessons for raising creative, curious, caring kids by Gregg Behr",
    image: "https://m.media-amazon.com/images/I/61GwuEUsuZL._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/43Cgd4Y",
  },
  {
    id: 87,
    title: "Raising a Kid Who Can",
    description: "Simple strategies to build a lifetime of adaptability and emotional strength",
    image: "https://m.media-amazon.com/images/I/71t8nLV1N0L._SL1500_.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://amzn.to/4ob4wL7",
  },
  {
    id: 88,
    title: "Parent Like It Matters",
    description: "How to raise joyful, change-making girls by Janice Johnson Dias",
    image: "/parent-like-it-matters-book-cover-janice-johnson-d.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://www.amazon.com/Parent-Like-Matters-Joyful-Change-Making/dp/1984819623",
  },
  {
    id: 89,
    title: "Parenting Right from the Start",
    description: "Laying a healthy foundation in the baby and toddler years by Vanessa Lapointe",
    image: "/parenting-right-from-the-start-book-cover-vanessa-.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://www.amazon.com/Parenting-Right-Start-Healthy-Foundation/dp/1966629850",
  },
  {
    id: 90,
    title: "Why Have Kids?",
    description: "A new mom explores the truth about parenting and happiness by Jessica Valenti",
    image: "/why-have-kids-book-cover-jessica-valenti.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://www.amazon.com/Why-Have-Kids-Explores-Parenting/dp/0544028066",
  },
  {
    id: 91,
    title: "The 5 Principles of Parenting",
    description: "Your essential guide to raising good humans by Aliza Pressman",
    image: "/5-principles-of-parenting-book-cover-aliza-pressma.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "All Ages",
    link: "https://www.amazon.com/Principles-Parenting-Essential-Raising-Humans/dp/1982171359",
  },
  {
    id: 94,
    title: "Chirp Magazine",
    description: "See and do, laugh and learn magazine for preschoolers with stories and activities",
    image: "https://us.owlkids.com/cdn/shop/products/shopify-chrip16.jpg?v=1479483472",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-6",
    link: "https://us.owlkids.com/products/chirp-magazine",
  },
  {
    id: 98,
    title: "Kazoo Magazine",
    description: "Ad-free magazine for girls featuring strong female role models, stories, and activities",
    image: "https://kazoomagazine.com/cdn/shop/files/Kazoo38Cover3d_2048x.jpg?v=1755199721",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-10",
    link: "https://kazoomagazine.com/",
  },
  {
    id: 99,
    title: "Sports Illustrated Kids",
    description: "Sports magazine featuring athletes, games, and activities for young sports fans",
    image: "https://images2.minutemediacdn.com/image/upload/c_crop,w_3554,h_1999,x_0,y_0/c_fill,w_1080,ar_16:9,f_auto,q_auto,g_auto/images%2FvoltaxMediaLibrary%2Fmmsport%2Fsi_kids%2F01k5ey4746kn1dv2xy1s.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 7-10",
    link: "https://www.sikids.com/",
  },
  {
    id: 500,
    title: "The Week Junior",
    description: "Current events and news magazine making the world accessible for kids",
    image: "https://cdn.mos.cms.futurecdn.net/GNnm4mUbAZMpMvsEDyeNEn-450-80.png.webp",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 9-10",
    link: "https://theweekjunior.com/",
  },
  {
    id: 501,
    title: "Okido Magazine",
    description: "Arts and science magazine encouraging creativity and STEM learning through play",
    image: "https://store.okido.com/cdn/shop/files/2_Okido_20_off.png?v=1759938816",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-6",
    link: "https://store.okido.com/",
  },
  {
    id: 504,
    title: "National Geographic Kids",
    description: "Science and nature magazine with stunning photos for preschoolers",
    image: "https://i.natgeofe.com/n/fd52adb7-910d-4685-88d0-83672bfd3d7d/MS-NGK-700x946.png?wp=1&w=400&h=541",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-6",
    link: "https://www.nationalgeographic.com/subscribe/kids-magazines",
  },
  {
    id: 505,
    title: "Brainspace Magazine",
    description: "Award-winning STEM magazine sparking young imagination and curiosity",
    image: "https://brainspacemagazine.com/wp-content/uploads/2024/08/Screen-Shot-2024-08-09-at-11.55.08-AM-600x927.png",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 9-10",
    link: "https://brainspacemagazine.com/",
  },
  {
    id: 506,
    title: "Aquila Magazine",
    description: "Challenging content for curious minds exploring history, science, and culture",
    image: "https://aquila.co.uk/wp-content/uploads/2024/10/2-mag-fan-small-2.png",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 9-10",
    link: "https://www.aquila.co.uk/",
  },
  {
    id: 9,
    title: "KiwiCo",
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

const resources = addAffiliateTagsToResources(resourcesData)

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedAge, setSelectedAge] = useState<string>("All Ages") // Changed from "all" to "All Ages"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const [kidsBooks, setKidsBooks] = useState<any[]>([])
  // const [isLoadingBooks, setIsLoadingBooks] = useState(false)

  // useEffect(() => {
  //   async function fetchAmazonKidsBooks() {
  //     // Only fetch if the category is 'kids-books' or 'all'
  //     if (selectedCategory !== "kids-books" && selectedCategory !== "all") return

  //     setIsLoadingBooks(true)
  //     try {
  //       console.log("[v0] Fetching kids books from Amazon API...")
  //       const res = await fetch("/api/amazon-us?q=kids+books+ages+5-10")

  //       if (!res.ok) {
  //         const errorText = await res.text()
  //         console.error("[v0] API returned error:", res.status, errorText)
  //         throw new Error(`API error: ${res.status}`)
  //       }

  //       const data = await res.json()
  //       console.log("[v0] Amazon Kids Books response:", data)

  //       if (data.error) {
  //         console.error("[v0] Amazon API error:", data.error)
  //         setKidsBooks([])
  //         return
  //       }

  //       if (data.SearchResult?.Items) {
  //         const formattedBooks = data.SearchResult.Items.map((item: any, index: number) => ({
  //           id: `amazon-${index}`, // Using index for ID, ensure uniqueness if needed
  //           title: item.ItemInfo?.Title?.DisplayValue || "Untitled",
  //           description: item.ItemInfo?.ByLineInfo?.Contributors?.[0]?.Name
  //             ? `By ${item.ItemInfo.ByLineInfo.Contributors[0].Name}`
  //             : "Kids book", // Provide a default description
  //           image: item.Images?.Primary?.Large?.URL || "/placeholder.svg?height=400&width=300", // Fallback image
  //           category: "kids-books",
  //           type: "Book",
  //           ageRange: "Ages 5-10", // Default age range, adjust if API provides it
  //           link: item.DetailPageURL || "", // Fallback to empty string if URL is missing
  //         }))
  //         console.log("[v0] Formatted", formattedBooks.length, "books")
  //         setKidsBooks(formattedBooks)
  //       } else {
  //         console.log("[v0] No items found in response")
  //         setKidsBooks([]) // Clear books if no items found
  //       }
  //     } catch (error) {
  //       console.error("[v0] Error fetching kids books:", error)
  //       setKidsBooks([]) // Clear books on error
  //     } finally {
  //       setIsLoadingBooks(false)
  //     }
  //   }
  //   fetchAmazonKidsBooks()
  // }, [selectedCategory]) // Re-fetch when selectedCategory changes

  // Combine static resources with dynamically fetched kids books
  // const allResources = [...resourcesData, ...kidsBooks]

  const filteredResources = resources
    .filter((resource) => {
      if (selectedCategory === "all") return true
      return resource.category === selectedCategory
    })
    .filter((resource) => {
      if (selectedAge === "All Ages") return true
      return resource.ageRange === selectedAge
    })

  // const allResources = selectedCategory === "kids-books" || selectedCategory === "all"
  //   ? [...filteredResources, ...kidsBooks]
  //   : filteredResources

  const currentCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name || "All Categories"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 backdrop-blur-md border-b border-border/50 py-4 bg-primary-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} priority className="w-auto h-10" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Resources
            </Link>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground"
            >
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-foreground/70 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/explore"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/resources"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground w-full"
              >
                <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 py-8 bg-primary-foreground pt-28 md:pt-32">
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
                        {Icon && <Icon className="w-5 h-5 text-card-foreground" />}
                        <span className="text-foreground">{category.name}</span>
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
                    {selectedAge !== "All Ages" && `${selectedAge} • `} {/* Changed from "all" */}
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
                          selectedAge === age ? "rounded-full bg-blue-500 text-white hover:bg-blue-600" : "rounded-full"
                        }
                      >
                        {age}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Loading state for kids books */}
              {/* Removed loading state as dynamic fetching is removed */}
              {/* {isLoadingBooks && selectedCategory === "kids-books" && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading kids books from Amazon...</p>
                </div>
              )} */}

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
                      setSelectedAge("All Ages") // Changed from "all"
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

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-border bg-secondary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} className="w-auto h-8" />
              <p className="text-sm max-w-md text-background">
                Curated resources and community for intentional parenting
              </p>
            </div>
            <nav className="flex flex-col md:flex-row gap-6 text-primary-foreground">
              <Link href="/" className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground">
                Home
              </Link>
              <Link
                href="/explore"
                className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground"
              >
                Explore
              </Link>
              <Link
                href="/resources"
                className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground"
              >
                Resources
              </Link>
              <Link
                href="/waitlist"
                className="text-sm hover:text-foreground/70 transition-colors border-primary-foreground border-none text-primary-foreground"
              >
                Waitlist
              </Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-border border-none">
            <p className="text-xs text-primary-foreground">© 2025 Plaidate. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
