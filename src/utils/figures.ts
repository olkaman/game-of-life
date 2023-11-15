import squareLink from '../assets/square.svg';
import beeHiveLink from '../assets/bee-hive.svg';
import tubLink from '../assets/tub.svg';
import loafLink from '../assets/loaf.svg';
import toadLink from '../assets/toad.svg';
import blinkerLink from '../assets/blinker.svg';
import penthadecathlonLink from '../assets/penthadecathlon.svg';
import pulsarLink from '../assets/pulsar.svg';
import gliderLink from '../assets/glider.svg';
import spaceshipSLink from '../assets/spaceship1.svg';
import spaceshipMLink from '../assets/spaceship2.svg';
import spaceshipLLink from '../assets/spaceship3.svg';

type Figure = {
  name: string;
  link: string;
  shape: number[][];
};

const square: Figure = {
  name: 'Square',
  link: squareLink,
  shape: [
    [1, 1],
    [1, 1],
  ],
};

const tub: Figure = {
  name: 'Tub',
  link: tubLink,
  shape: [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ],
};

const beeHive: Figure = {
  name: 'Bee hive',
  link: beeHiveLink,
  shape: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
};

const loaf: Figure = {
  name: 'Loaf',
  link: loafLink,
  shape: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ],
};

const blinker: Figure = {
  name: 'Blinker',
  link: blinkerLink,
  shape: [[1], [1], [1]],
};

const penthadecathlon: Figure = {
  name: 'Pentha',
  link: penthadecathlonLink,
  shape: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

const toad: Figure = {
  name: 'Toad',
  link: toadLink,
  shape: [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0],
  ],
};

const glider: Figure = {
  name: 'Glider',
  link: gliderLink,
  shape: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const pulsar: Figure = {
  name: 'Pulsar',
  link: pulsarLink,
  shape: [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  ],
};

const spaceshipS: Figure = {
  name: 'Spaceship S',
  link: spaceshipSLink,
  shape: [
    [0, 0, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0],
  ],
};

const spaceshipM: Figure = {
  name: 'Spaceship M',
  link: spaceshipMLink,
  shape: [
    [0, 0, 0, 1, 1, 0],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
  ],
};

const spaceshipL: Figure = {
  name: 'Spaceship L',
  link: spaceshipLLink,
  shape: [
    [0, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0],
  ],
};

export const allFigures = {
  stillLives: [square, tub, beeHive, loaf],
  oscillators: [blinker, toad, pulsar, penthadecathlon],
  spaceships: [glider, spaceshipS, spaceshipM, spaceshipL],
};
