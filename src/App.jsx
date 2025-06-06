import { useState } from "react";
import Card, { CardContent } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

// Definierte Standards für Strongman-Events nach Modus, Geschlecht und Gewichtsklasse
const standards = {
  natural: {
    male: {
      U72: {
        "Deadlift": [170, 200, 220, 245],
        "Log Press": [75, 90, 100, 110],
        "Axle Press": [80, 90, 100, 110],
        "Yoke Walk (10m)": [200, 240, 280, 330],
        "Atlas Stone (1.2m)": [70, 90, 110, 130],
        "Farmers Walk (10m)": [75, 90, 115, 140],
        "Monster Dumbbell": [35, 50, 60, 80],
        "Husafell Carry (10m)": [80, 100, 120, 145],
        "Power Stairs": [100, 120, 150, 180],
        "Sandbag to Shoulder": [90, 100, 115, 130],
        "Car Deadlift": [190, 240, 300, 350],
        "Tire Flip": [100, 140, 180, 220],
        "Loading Race": [70, 90, 100, 120],
        "Farmers Hold": [60, 80, 100, 120],
        "Natural Stone Press": [40, 60, 80, 100],
        "Arm Over Arm Pull (Sled Asphalt)": [100, 140, 180, 220],
        "Natural Stone Load": [55, 80, 110, 130],
      },
      U80: {
        "Deadlift": [200, 220, 240, 260],
        "Log Press": [80, 100, 110, 120],
        "Axle Press": [80, 95, 105, 120],
        "Yoke Walk (10m)": [220, 260, 300, 350],
        "Atlas Stone (1.2m)": [90, 110, 125, 150],
        "Farmers Walk (10m)": [90, 105, 120, 140],
        "Monster Dumbbell": [50, 60, 70, 80],
        "Husafell Carry (10m)": [100, 120, 135, 150],
        "Power Stairs": [120, 150, 170, 190],
        "Sandbag to Shoulder": [90, 110, 125, 140],
        "Car Deadlift": [240, 280, 320, 360],
        "Tire Flip": [190, 220, 240, 270],
        "Loading Race": [90, 110, 125, 135],
        "Farmers Hold": [80, 105, 120, 135],
        "Natural Stone Press": [70, 80, 90, 100],
        "Arm Over Arm Pull (Sled Asphalt)": [130, 160, 190, 220],
        "Natural Stone Load": [80, 100, 115, 130],
      },
      U90: {
        "Deadlift": [180, 240, 260, 275],
        "Log Press": [80, 105, 115, 125],
        "Axle Press": [80, 105, 115, 130],
        "Yoke Walk (10m)": [240, 280, 320, 370],
        "Atlas Stone (1.2m)": [100, 120, 135, 160],
        "Farmers Walk (10m)": [100, 115, 130, 150],
        "Monster Dumbbell": [45, 65, 75, 85],
        "Husafell Carry (10m)": [110, 130, 145, 160],
        "Power Stairs": [140, 170, 190, 210],
        "Sandbag to Shoulder": [90, 115, 130, 150],
        "Car Deadlift": [250, 320, 360, 400],
        "Tire Flip": [210, 240, 270, 300],
        "Loading Race": [100, 120, 135, 145],
        "Farmers Hold": [100, 115, 130, 145],
        "Natural Stone Press": [70, 90, 100, 110],
        "Arm Over Arm Pull (Sled Asphalt)": [150, 180, 210, 240],
        "Natural Stone Load": [90, 110, 125, 140],
      },
      U105: {
        "Deadlift": [200, 255, 275, 300],
        "Log Press": [100, 115, 125, 135],
        "Axle Press": [100, 115, 125, 140],
        "Yoke Walk (10m)": [240, 300, 340, 400],
        "Atlas Stone (1.2m)": [100, 130, 150, 170],
        "Farmers Walk (10m)": [90, 110, 135, 160],
        "Monster Dumbbell": [45, 60, 75, 95],
        "Husafell Carry (10m)": [80, 110, 140, 170],
        "Power Stairs": [120, 150, 180, 210],
        "Sandbag to Shoulder": [70, 100, 130, 160],
        "Car Deadlift": [250, 300, 360, 420],
        "Tire Flip": [140, 200, 260, 320],
        "Loading Race": [80, 100, 120, 150],
        "Farmers Hold": [95, 110, 135, 155],
        "Natural Stone Press": [60, 80, 100, 120],
        "Arm Over Arm Pull (Sled Asphalt)": [130, 170, 210, 250],
        "Natural Stone Load": [70, 100, 130, 150],
      },
      Open: {
        "Deadlift": [220, 270, 290, 320],
        "Log Press": [90, 110, 130, 150],
        "Axle Press": [80, 105, 125, 145],
        "Yoke Walk (10m)": [230, 300, 350, 420],
        "Atlas Stone (1.2m)": [110, 140, 160, 180],
        "Farmers Walk (10m)": [100, 115, 140, 170],
        "Monster Dumbbell": [45, 65, 80, 100],
        "Husafell Carry (10m)": [90, 120, 150, 180],
        "Power Stairs": [130, 160, 190, 220],
        "Sandbag to Shoulder": [80, 110, 140, 170],
        "Car Deadlift": [270, 320, 380, 440],
        "Tire Flip": [160, 220, 280, 340],
        "Loading Race": [90, 110, 130, 160],
        "Farmers Hold": [100, 120, 145, 165],
        "Natural Stone Press": [70, 90, 110, 130],
        "Arm Over Arm Pull (Sled Asphalt)": [140, 180, 220, 260],
        "Natural Stone Load": [80, 110, 140, 160],
      },
      "Master/Junior": {
        "Deadlift": [180, 240, 260, 275],
        "Log Press": [80, 105, 115, 125],
        "Axle Press": [80, 105, 115, 130],
        "Yoke Walk (10m)": [240, 280, 320, 370],
        "Atlas Stone (1.2m)": [100, 120, 135, 160],
        "Farmers Walk (10m)": [100, 115, 130, 150],
        "Monster Dumbbell": [45, 65, 75, 85],
        "Husafell Carry (10m)": [110, 130, 145, 160],
        "Power Stairs": [140, 170, 190, 210],
        "Sandbag to Shoulder": [90, 115, 130, 150],
        "Car Deadlift": [250, 320, 360, 400],
        "Tire Flip": [210, 240, 270, 300],
        "Loading Race": [100, 120, 135, 145],
        "Farmers Hold": [100, 115, 130, 145],
        "Natural Stone Press": [70, 90, 100, 110],
        "Arm Over Arm Pull (Sled Asphalt)": [150, 180, 210, 240],
        "Natural Stone Load": [90, 110, 125, 140],
      },
    },
    female: {
      U64: {
        "Deadlift": [110, 130, 145, 160],
        "Log Press": [30, 40, 45, 50],
        "Axle Press": [30, 40, 45, 50],
        "Yoke Walk (10m)": [140, 165, 185, 210],
        "Atlas Stone (1.2m)": [60, 75, 85, 95],
        "Farmers Walk (10m)": [40, 50, 60, 70],
        "Monster Dumbbell": [15, 25, 30, 35],
        "Husafell Carry (10m)": [50, 65, 75, 85],
        "Power Stairs": [80, 100, 115, 130],
        "Sandbag to Shoulder": [35, 45, 55, 65],
        "Car Deadlift": [140, 170, 190, 210],
        "Tire Flip": [100, 120, 135, 150],
        "Loading Race": [40, 50, 60, 70],
        "Farmers Hold": [40, 50, 60, 70],
        "Natural Stone Press": [20, 30, 35, 40],
        "Arm Over Arm Pull (Sled Asphalt)": [70, 90, 105, 120],
        "Natural Stone Load": [35, 45, 55, 65],
      },
      U73: {
        "Deadlift": [130, 150, 165, 180],
        "Log Press": [40, 50, 55, 60],
        "Axle Press": [40, 50, 55, 60],
        "Yoke Walk (10m)": [165, 190, 215, 240],
        "Atlas Stone (1.2m)": [75, 90, 100, 110],
        "Farmers Walk (10m)": [50, 60, 70, 80],
        "Monster Dumbbell": [25, 35, 40, 45],
        "Husafell Carry (10m)": [65, 80, 90, 100],
        "Power Stairs": [100, 120, 135, 150],
        "Sandbag to Shoulder": [55, 65, 80, 90],
        "Car Deadlift": [170, 200, 225, 250],
        "Tire Flip": [120, 140, 160, 175],
        "Loading Race": [60, 75, 85, 95],
        "Farmers Hold": [60, 75, 85, 95],
        "Natural Stone Press": [35, 45, 55, 60],
        "Arm Over Arm Pull (Sled Asphalt)": [110, 130, 155, 180],
        "Natural Stone Load": [55, 65, 80, 90],
      },
      U82: {
        "Deadlift": [175, 200, 220, 240],
        "Log Press": [55, 65, 75, 80],
        "Axle Press": [55, 65, 75, 80],
        "Yoke Walk (10m)": [220, 260, 295, 330],
        "Atlas Stone (1.2m)": [100, 120, 130, 145],
        "Farmers Walk (10m)": [75, 85, 95, 110],
        "Monster Dumbbell": [35, 50, 55, 60],
        "Husafell Carry (10m)": [90, 110, 120, 130],
        "Power Stairs": [140, 160, 180, 200],
        "Sandbag to Shoulder": [65, 80, 90, 100],
        "Car Deadlift": [230, 265, 300, 335],
        "Tire Flip": [160, 185, 210, 230],
        "Loading Race": [75, 85, 95, 110],
        "Farmers Hold": [75, 85, 95, 110],
        "Natural Stone Press": [45, 55, 60, 65],
        "Arm Over Arm Pull (Sled Asphalt)": [125, 150, 175, 200],
        "Natural Stone Load": [65, 80, 90, 100],
      },
      Open: {
        "Deadlift": [190, 220, 250, 275],
        "Log Press": [60, 75, 85, 90],
        "Axle Press": [60, 75, 85, 90],
        "Yoke Walk (10m)": [250, 295, 335, 385],
        "Atlas Stone (1.2m)": [115, 130, 150, 170],
        "Farmers Walk (10m)": [85, 95, 110, 120],
        "Monster Dumbbell": [45, 55, 60, 65],
        "Husafell Carry (10m)": [100, 120, 140, 150],
        "Power Stairs": [155, 180, 205, 220],
        "Sandbag to Shoulder": [80, 90, 100, 115],
        "Car Deadlift": [265, 305, 350, 385],
        "Tire Flip": [180, 205, 230, 250],
        "Loading Race": [85, 95, 110, 120],
        "Farmers Hold": [85, 95, 110, 120],
        "Natural Stone Press": [50, 60, 65, 75],
        "Arm Over Arm Pull (Sled Asphalt)": [145, 170, 195, 215],
        "Natural Stone Load": [80, 90, 100, 115],
      },
      "Master/Junior": {
        "Deadlift": [145, 170, 185, 205],
        "Log Press": [40, 55, 60, 65],
        "Axle Press": [40, 55, 60, 65],
        "Yoke Walk (10m)": [185, 215, 240, 265],
        "Atlas Stone (1.2m)": [80, 95, 110, 120],
        "Farmers Walk (10m)": [55, 65, 80, 90],
        "Monster Dumbbell": [25, 35, 40, 50],
        "Husafell Carry (10m)": [75, 90, 100, 115],
        "Power Stairs": [110, 130, 150, 170],
        "Sandbag to Shoulder": [50, 60, 75, 85],
        "Car Deadlift": [190, 230, 250, 275],
        "Tire Flip": [140, 160, 180, 200],
        "Loading Race": [55, 65, 80, 90],
        "Farmers Hold": [55, 65, 80, 90],
        "Natural Stone Press": [30, 40, 50, 55],
        "Arm Over Arm Pull (Sled Asphalt)": [95, 120, 140, 155],
        "Natural Stone Load": [50, 60, 75, 85],
      },
    },
  },
  enhanced: {
    male: {
      U72: {
        "Deadlift": [205, 240, 265, 295],
        "Log Press": [90, 110, 120, 135],
        "Axle Press": [95, 110, 120, 135],
        "Yoke Walk (10m)": [240, 290, 335, 400],
        "Atlas Stone (1.2m)": [85, 110, 135, 155],
        "Farmers Walk (10m)": [90, 110, 140, 170],
        "Monster Dumbbell": [45, 60, 75, 95],
        "Husafell Carry (10m)": [100, 120, 145, 175],
        "Power Stairs": [120, 145, 180, 215],
        "Sandbag to Shoulder": [110, 120, 140, 155],
        "Car Deadlift": [230, 290, 360, 420],
        "Tire Flip": [120, 170, 220, 265],
        "Loading Race": [85, 110, 120, 145],
        "Farmers Hold": [75, 95, 120, 145],
        "Natural Stone Press": [50, 75, 95, 120],
        "Arm Over Arm Pull (Sled Asphalt)": [120, 170, 220, 265],
        "Natural Stone Load": [65, 95, 135, 155],
      },
      U80: {
        "Deadlift": [240, 265, 290, 315],
        "Log Press": [95, 120, 135, 145],
        "Axle Press": [95, 115, 130, 145],
        "Yoke Walk (10m)": [265, 315, 360, 420],
        "Atlas Stone (1.2m)": [95, 120, 145, 170],
        "Farmers Walk (10m)": [110, 125, 145, 170],
        "Monster Dumbbell": [60, 75, 85, 95],
        "Husafell Carry (10m)": [120, 145, 165, 180],
        "Power Stairs": [145, 180, 205, 230],
        "Sandbag to Shoulder": [110, 135, 150, 170],
        "Car Deadlift": [290, 335, 385, 435],
        "Tire Flip": [230, 265, 290, 325],
        "Loading Race": [110, 135, 150, 165],
        "Farmers Hold": [95, 125, 145, 165],
        "Natural Stone Press": [85, 95, 110, 120],
        "Arm Over Arm Pull (Sled Asphalt)": [155, 195, 230, 265],
        "Natural Stone Load": [95, 120, 140, 155],
      },
      U90: {
        "Deadlift": [230, 260, 290, 325],
        "Log Press": [95, 125, 140, 150],
        "Axle Press": [95, 125, 140, 155],
        "Yoke Walk (10m)": [290, 335, 385, 445],
        "Atlas Stone (1.2m)": [120, 145, 165, 195],
        "Farmers Walk (10m)": [120, 140, 160, 180],
        "Monster Dumbbell": [55, 80, 90, 105],
        "Husafell Carry (10m)": [135, 155, 175, 195],
        "Power Stairs": [170, 205, 230, 255],
        "Sandbag to Shoulder": [110, 140, 155, 180],
        "Car Deadlift": [300, 385, 435, 480],
        "Tire Flip": [255, 290, 325, 360],
        "Loading Race": [120, 145, 165, 175],
        "Farmers Hold": [120, 140, 160, 175],
        "Natural Stone Press": [85, 110, 120, 135],
        "Arm Over Arm Pull (Sled Asphalt)": [180, 220, 255, 290],
        "Natural Stone Load": [110, 135, 150, 170],
      },
      U105: {
        "Deadlift": [240, 270, 300, 350],
        "Log Press": [95, 120, 140, 150, 160],
        "Axle Press": [90, 115, 140, 160],
        "Yoke Walk (10m)": [240, 325, 385, 480],
        "Atlas Stone (1.2m)": [120, 155, 180, 205],
        "Farmers Walk (10m)": [110, 130, 160, 190],
        "Monster Dumbbell": [55, 75, 90, 115],
        "Husafell Carry (10m)": [95, 130, 170, 205],
        "Power Stairs": [145, 180, 215, 250],
        "Sandbag to Shoulder": [85, 120, 155, 190],
        "Car Deadlift": [280, 320, 350, 400],
        "Tire Flip": [170, 240, 310, 385],
        "Loading Race": [95, 120, 145, 180],
        "Farmers Hold": [115, 130, 160, 185],
        "Natural Stone Press": [75, 95, 120, 145],
        "Arm Over Arm Pull (Sled Asphalt)": [155, 205, 250, 300],
        "Natural Stone Load": [85, 120, 155, 180],
      },
      Open: {
        "Deadlift": [270, 300, 340, 400],
        "Log Press": [110, 130, 155, 180],
        "Axle Press": [95, 125, 150, 175],
        "Yoke Walk (10m)": [275, 360, 420, 505],
        "Atlas Stone (1.2m)": [130, 170, 190, 215],
        "Farmers Walk (10m)": [120, 140, 170, 205],
        "Monster Dumbbell": [55, 80, 95, 120],
        "Husafell Carry (10m)": [125, 155, 180, 200],
        "Power Stairs": [155, 190, 230, 265],
        "Sandbag to Shoulder": [95, 130, 165, 185],
        "Car Deadlift": [300, 340, 380, 440],
        "Tire Flip": [195, 265, 335, 405],
        "Loading Race": [110, 130, 155, 180],
        "Farmers Hold": [120, 145, 175, 190],
        "Natural Stone Press": [85, 110, 130, 155],
        "Arm Over Arm Pull (Sled Asphalt)": [170, 215, 265, 310],
        "Natural Stone Load": [95, 130, 170, 190],
      },
      "Master/Junior": {
        "Deadlift": [230, 280, 300, 320],
        "Log Press": [95, 125, 140, 150],
        "Axle Press": [95, 125, 140, 155],
        "Yoke Walk (10m)": [290, 335, 385, 445],
        "Atlas Stone (1.2m)": [120, 145, 165, 195],
        "Farmers Walk (10m)": [120, 140, 160, 180],
        "Monster Dumbbell": [55, 80, 90, 105],
        "Husafell Carry (10m)": [135, 155, 175, 195],
        "Power Stairs": [170, 205, 230, 255],
        "Sandbag to Shoulder": [110, 140, 155, 180],
        "Car Deadlift": [300, 385, 435, 480],
        "Tire Flip": [255, 290, 325, 360],
        "Loading Race": [120, 145, 165, 175],
        "Farmers Hold": [120, 140, 160, 175],
        "Natural Stone Press": [85, 110, 120, 135],
        "Arm Over Arm Pull (Sled Asphalt)": [180, 220, 255, 290],
        "Natural Stone Load": [110, 135, 150, 170],
      },
    },
    female: {
      U64: {
        "Deadlift": [130, 155, 175, 190],
        "Log Press": [35, 45, 55, 60],
        "Axle Press": [35, 45, 55, 60],
        "Yoke Walk (10m)": [170, 200, 220, 250],
        "Atlas Stone (1.2m)": [75, 90, 100, 115],
        "Farmers Walk (10m)": [50, 60, 75, 85],
        "Monster Dumbbell": [20, 30, 35, 45],
        "Husafell Carry (10m)": [60, 80, 90, 100],
        "Power Stairs": [95, 120, 140, 155],
        "Sandbag to Shoulder": [45, 55, 65, 80],
        "Car Deadlift": [170, 200, 230, 250],
        "Tire Flip": [120, 145, 160, 180],
        "Loading Race": [50, 60, 75, 85],
        "Farmers Hold": [50, 60, 75, 85],
        "Natural Stone Press": [25, 35, 40, 50],
        "Arm Over Arm Pull (Sled Asphalt)": [85, 110, 125, 145],
        "Natural Stone Load": [45, 55, 65, 80],
      },
      U73: {
        "Deadlift": [155, 180, 200, 215],
        "Log Press": [45, 60, 65, 75],
        "Axle Press": [45, 60, 65, 75],
        "Yoke Walk (10m)": [200, 230, 260, 290],
        "Atlas Stone (1.2m)": [90, 110, 120, 130],
        "Farmers Walk (10m)": [60, 75, 85, 95],
        "Monster Dumbbell": [30, 40, 50, 55],
        "Husafell Carry (10m)": [80, 95, 110, 120],
        "Power Stairs": [120, 145, 160, 180],
        "Sandbag to Shoulder": [55, 65, 80, 90],
        "Car Deadlift": [200, 240, 270, 300],
        "Tire Flip": [145, 170, 190, 210],
        "Loading Race": [60, 75, 85, 95],
        "Farmers Hold": [60, 75, 85, 95],
        "Natural Stone Press": [35, 45, 55, 60],
        "Arm Over Arm Pull (Sled Asphalt)": [110, 130, 155, 180],
        "Natural Stone Load": [55, 65, 80, 90],
      },
      U82: {
        "Deadlift": [175, 200, 220, 240],
        "Log Press": [55, 65, 75, 80],
        "Axle Press": [55, 65, 75, 80],
        "Yoke Walk (10m)": [220, 260, 295, 330],
        "Atlas Stone (1.2m)": [100, 120, 130, 145],
        "Farmers Walk (10m)": [75, 85, 95, 110],
        "Monster Dumbbell": [35, 50, 55, 60],
        "Husafell Carry (10m)": [90, 110, 120, 130],
        "Power Stairs": [140, 160, 180, 200],
        "Sandbag to Shoulder": [65, 80, 90, 100],
        "Car Deadlift": [230, 265, 300, 335],
        "Tire Flip": [160, 185, 210, 230],
        "Loading Race": [75, 85, 95, 110],
        "Farmers Hold": [75, 85, 95, 110],
        "Natural Stone Press": [45, 55, 60, 65],
        "Arm Over Arm Pull (Sled Asphalt)": [125, 150, 175, 200],
        "Natural Stone Load": [65, 80, 90, 100],
      },
      Open: {
        "Deadlift": [190, 220, 250, 275],
        "Log Press": [60, 75, 85, 90],
        "Axle Press": [60, 75, 85, 90],
        "Yoke Walk (10m)": [250, 295, 335, 385],
        "Atlas Stone (1.2m)": [115, 130, 150, 170],
        "Farmers Walk (10m)": [85, 95, 110, 120],
        "Monster Dumbbell": [45, 55, 60, 65],
        "Husafell Carry (10m)": [100, 120, 140, 150],
        "Power Stairs": [155, 180, 205, 220],
        "Sandbag to Shoulder": [80, 90, 100, 115],
        "Car Deadlift": [265, 305, 350, 385],
        "Tire Flip": [180, 205, 230, 250],
        "Loading Race": [85, 95, 110, 120],
        "Farmers Hold": [85, 95, 110, 120],
        "Natural Stone Press": [50, 60, 65, 75],
        "Arm Over Arm Pull (Sled Asphalt)": [145, 170, 195, 215],
        "Natural Stone Load": [80, 90, 100, 115],
      },
      "Master/Junior": {
        "Deadlift": [145, 170, 185, 205],
        "Log Press": [40, 55, 60, 65],
        "Axle Press": [40, 55, 60, 65],
        "Yoke Walk (10m)": [185, 215, 240, 265],
        "Atlas Stone (1.2m)": [80, 95, 110, 120],
        "Farmers Walk (10m)": [55, 65, 80, 90],
        "Monster Dumbbell": [25, 35, 40, 50],
        "Husafell Carry (10m)": [75, 90, 100, 115],
        "Power Stairs": [110, 130, 150, 170],
        "Sandbag to Shoulder": [50, 60, 75, 85],
        "Car Deadlift": [190, 230, 250, 275],
        "Tire Flip": [140, 160, 180, 200],
        "Loading Race": [55, 65, 80, 90],
        "Farmers Hold": [55, 65, 80, 90],
        "Natural Stone Press": [30, 40, 50, 55],
        "Arm Over Arm Pull (Sled Asphalt)": [95, 120, 140, 155],
        "Natural Stone Load": [50, 60, 75, 85],
      },
    },
  },
};
const levels = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite"];

export default function StrongmanStrengthLevel() {
  // The URL for your uploaded image
  const imageUrl = 'https://i.ibb.co/b5WWM1Qj/Gemini-Generated-Image-tzmgohtzmgohtzmg.jpg';

  // --- Initializing states without default selection ---
  const [mode, setMode] = useState(""); // Set to empty string for no initial selection
  const [gender, setGender] = useState(""); // Set to empty string for no initial selection
  const [weightClass, setWeightClass] = useState(""); // Set to empty string for no initial selection
  const [event, setEvent] = useState(""); // Set to empty string for no initial selection
  const [input, setInput] = useState("");
  const [level, setLevel] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [exportData, setExportData] = useState("");

  // Function to calculate level ranges
  const getLevelRange = (index, currentMode, currentGender, currentWeightClass, currentEvent) => {
    try {
      if (!currentMode || !currentGender || !currentWeightClass || !currentEvent || !standards[currentMode]?.[currentGender]?.[currentWeightClass]?.[currentEvent]) {
        return "N/A";
      }

      const thresholds = standards[currentMode][currentGender][currentWeightClass][currentEvent];
      if (!thresholds || thresholds.length < 4) return "N/A";

      const t = thresholds.map(Number); // Ensure thresholds are numbers

      switch (index) {
        case 0:
          return `≤${t[0] - 1}kg`;
        case 1:
          return `${t[0]}kg-${t[1] - 1}kg`;
        case 2:
          return `${t[1]}kg-${t[2] - 1}kg`;
        case 3:
          return `${t[2]}kg-${t[3] - 1}kg`;
        case 4:
          return `≥${t[3]}kg`;
        default:
          return "N/A";
      }
    } catch (e) {
      console.error("Error calculating level range:", e);
      return "N/A";
    }
  };

  // Level colors with additional styles
  const levelColors = {
    Beginner: "bg-gray-100 text-gray-800",
    Novice: "bg-yellow-100 text-yellow-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-orange-100 text-orange-800",
    Elite: "bg-green-100 text-green-800",
    "EDDIE HALL MODE (500kg Deadlift Legend)": "bg-red-600 text-white font-bold text-lg animate-bounce",
    "IT'S OVER 9000!!!": "bg-gradient-to-r from-purple-600 to-pink-600 text-yellow-300 font-extrabold text-xl text-center tracking-widest animate-bounce",
    "HAIL THOR! (501kg Deadlift God)": "bg-red-600 text-white animate-pulse",
    "No value, no gains": "bg-gray-700 text-gray-50 font-bold text-xl",
    Unranked: "bg-red-100 text-red-800",
    "Mental Beginner (pls use valid number)": "bg-red-100 text-red-800"
  };

  const handleCheck = () => {
    if (input.trim() === "") {
      setLevel("No value, no gains");
      setShowOutput(true);
      return;
    }

    const value = parseFloat(input);
    if (isNaN(value)) {
      setLevel("Mental Beginner (pls use valid number)");
      setShowOutput(true);
      return;
    }

    if (value > 9000) {
      setLevel("IT'S OVER 9000!!!");
      setShowOutput(true);
      return;
    }

    if (event === "Deadlift" && value === 500) {
      setLevel("EDDIE HALL MODE (500kg Deadlift Legend)");
      setShowOutput(true);
      return;
    }

    if (event === "Deadlift" && value === 501) {
      setLevel("HAIL THOR! (501kg Deadlift God)");
      setShowOutput(true);
      return;
    }

    if (!mode || !gender || !weightClass || !event || !standards[mode]?.[gender]?.[weightClass]?.[event]) {
      setLevel("Invalid selection");
      setShowOutput(true);
      return;
    }

    const thresholds = standards[mode][gender][weightClass][event];

    if (!thresholds || thresholds.length < 4) {
      setLevel("No standards available");
      setShowOutput(true);
      return;
    }

    const eliteThreshold = thresholds[thresholds.length - 1];
    const advancedThreshold = thresholds[thresholds.length - 2];
    const intermediateThreshold = thresholds[thresholds.length - 3];
    const noviceThreshold = thresholds[0];

    if (value >= eliteThreshold) setLevel(`Elite (≥${eliteThreshold}kg)`);
    else if (value >= advancedThreshold) setLevel(`Advanced (${advancedThreshold}kg-${eliteThreshold - 1}kg)`);
    else if (value >= intermediateThreshold) setLevel(`Intermediate (${intermediateThreshold}kg-${advancedThreshold - 1}kg)`);
    else if (value >= noviceThreshold) setLevel(`Novice (${noviceThreshold}kg-${intermediateThreshold - 1}kg)`);
    else setLevel(`Beginner (≤${noviceThreshold - 1}kg)`);

    setShowOutput(true);
  };

  const exportTableToNewWindow = () => {
    if (!mode || !gender || !weightClass) {
      alert("Please select a Mode, Gender, and Weight Class to export data.");
      return;
    }

    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      alert("Please allow pop-ups for this website to export the table.");
      return;
    }

    let tableHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Strongman Power Levels Export</title>
          <style>
              body { font-family: sans-serif; margin: 20px; }
              h1 { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              @media print {
                  body { margin: 0; }
                  table { page-break-after: auto; }
                  tr { page-break-inside: avoid; page-break-after: auto; }
                  td, th { page-break-inside: avoid; }
              }
          </style>
      </head>
      <body>
          <h1>Strongman Power Levels: ${mode} - ${gender} - ${weightClass}</h1>
          <table>
              <thead>
                  <tr>
                      <th>Event</th>
                      <th>Beginner Range</th>
                      <th>Novice Range</th>
                      <th>Intermediate Range</th>
                      <th>Advanced Range</th>
                      <th>Elite Range</th>
                  </tr>
              </thead>
              <tbody>
    `;

    const eventsInClass = standards[mode]?.[gender]?.[weightClass];
    if (!eventsInClass) {
      newWindow.document.write("No events available for this selection.");
      newWindow.document.close();
      return;
    }

    const orderedEventNames = Object.keys(eventsInClass);

    orderedEventNames.forEach(eventName => {
      tableHtml += `
        <tr>
            <td>${eventName}</td>
            <td>${getLevelRange(0, mode, gender, weightClass, eventName)}</td>
            <td>${getLevelRange(1, mode, gender, weightClass, eventName)}</td>
            <td>${getLevelRange(2, mode, gender, weightClass, eventName)}</td>
            <td>${getLevelRange(3, mode, gender, weightClass, eventName)}</td>
            <td>${getLevelRange(4, mode, gender, weightClass, eventName)}</td>
        </tr>
      `;
    });

    tableHtml += `
              </tbody>
          </table>
          <button onclick="window.print()" style="display: block; margin: 20px auto; padding: 10px 20px; font-size: 16px; cursor: pointer;">Print Table</button>
      </body>
      </html>
    `;

    newWindow.document.write(tableHtml);
    newWindow.document.close();
  };


  return (
    <>
      {/* Das Bildelement */}
      <div className="flex justify-center mt-10">
        <img
          src={imageUrl}
          alt="Anime character in DBZ style with Dragon Ball"
          style={{ width: '200px', height: '200px' }}
        />
      </div>

      <p className="mt-4 text-lg font-semibold text-gray-800 text-center">
        Strong(wo)man Power Level - v0.49 Beta
      </p>

      <Card className="max-w-md mx-auto mt-10 p-6">
        <CardContent className="space-y-4">
          {/* Modus Auswahl */}
          <div className="mb-2">
            <Select
              value={mode}
              onValueChange={(value) => {
                setMode(value);
                setGender(""); // Untergeordnete Auswahlfelder zurücksetzen
                setWeightClass("");
                setEvent("");
                setShowOutput(false);
                setExportData("");
              }}
            >
              <SelectTrigger className="w-full border border-gray-300">
                <SelectValue placeholder={<span className="text-muted-foreground">Modus auswählen</span>} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">
                  <span>Natürlich 🥦</span>
                </SelectItem>
                <SelectItem value="enhanced">
                  <span>Verbessert 💊</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Geschlechtsauswahl */}
          <div className="mb-2">
            <Select
              value={gender}
              onValueChange={(value) => {
                setGender(value);
                setWeightClass(""); // Untergeordnete Auswahlfelder zurücksetzen
                setEvent("");
                setShowOutput(false);
                setExportData("");
              }}
              disabled={!mode || !standards[mode] || Object.keys(standards[mode]).length === 0}
            >
              <SelectTrigger className="w-full border border-gray-300">
                <SelectValue placeholder={<span className="text-muted-foreground">{mode ? 'Geschlecht auswählen' : 'Zuerst Modus auswählen'}</span>} />
              </SelectTrigger>
              <SelectContent>
                {mode && standards[mode] && Object.keys(standards[mode]).map(g => (
                  <SelectItem key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gewichtsklassen Auswahl */}
          <div className="mb-2">
            <Select
              value={weightClass}
              onValueChange={(value) => {
                setWeightClass(value);
                setEvent(""); // Untergeordnete Auswahlfelder zurücksetzen
                setShowOutput(false);
                setExportData("");
              }}
              disabled={!gender || !standards[mode]?.[gender] || Object.keys(standards[mode][gender]).length === 0}
            >
              <SelectTrigger className="w-full border border-gray-300">
                <SelectValue placeholder={<span className="text-muted-foreground">{gender ? 'Gewichtsklasse auswählen' : 'Zuerst Geschlecht auswählen'}</span>} />
              </SelectTrigger>
              <SelectContent>
                {mode && gender && standards[mode]?.[gender] && Object.keys(standards[mode][gender]).map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Auswahl */}
          <div className="mb-2">
            <Select
              value={event}
              onValueChange={(value) => {
                setEvent(value);
                setShowOutput(false);
                setExportData("");
              }}
              disabled={!weightClass || !standards[mode]?.[gender]?.[weightClass] || Object.keys(standards[mode][gender][weightClass]).length === 0}
            >
              <SelectTrigger className="w-full border border-gray-300">
                <SelectValue placeholder={<span className="text-muted-foreground">{weightClass ? 'Event auswählen' : 'Zuerst Gewichtsklasse auswählen'}</span>} />
              </SelectTrigger>
              <SelectContent>
                {mode && gender && weightClass && standards[mode]?.[gender]?.[weightClass] && Object.keys(standards[mode][gender][weightClass]).map(evt => (
                  <SelectItem key={evt} value={evt}>{evt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Eingabefeld für den Wert der Übung */}
          <Input
            type="number"
            placeholder="Gewicht in kg eingeben"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowOutput(false);
              setExportData("");
            }}
            className="w-full border border-gray-300"
          />

          {/* Button zur Anzeige des Power Levels */}
          <Button
            onClick={handleCheck}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={!mode || !gender || !weightClass || !event}
          >
            Dein Power Level anzeigen
          </Button>

          {showOutput && level && (
            <div
              id="powerLevelOutput"
              className={`text-2xl font-bold mt-4 p-4 text-center rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                // Check exact Easter Egg levels first
                level === "EDDIE HALL MODE (500kg Deadlift Legend)" ? levelColors["EDDIE HALL MODE (500kg Deadlift Legend)"] :
                level === "HAIL THOR! (501kg Deadlift God)" ? levelColors["HAIL THOR! (501kg Deadlift God)"] :
                level === "IT'S OVER 9000!!!" ? levelColors["IT'S OVER 9000!!!"] :
                levelColors[level] || levelColors[level.split(' ')[0]] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {level}
            </div>
          )}

          {/* Tabelle zur Anzeige der Levelbereiche */}
          {showOutput && (
            <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bereich ({event})
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {levels.map((lvl, index) => (
                    <tr key={lvl}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lvl}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getLevelRange(index, mode, gender, weightClass, event)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Export Button */}
          <Button
            onClick={exportTableToNewWindow}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={!mode || !gender || !weightClass}
          >
            Alle Power Levels exportieren
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

