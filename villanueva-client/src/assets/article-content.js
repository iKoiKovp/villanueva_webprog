import csImg from './cs.webp';
import dotaImg from './dota.png';
import lolImg from './lol.jpg';
import owImg from './overwatch.png';
import valoImg from './valo.jpg';

const articles = [
    {
        name: "counter-strike",
        title: "Counter-Strike",
        thumbnail: "/cs.webp",

        content: [
            "Counter-Strike is a 5v5 First-Person Shooter game where you can play either as a Counter-terrorist or Terrorist",
            "As a Counter-terrorist, your objective is to prevent the Terrorists from planting the bomb. If they ever had an opportunity to plant the bomb, eliminate all of the Terrorists and defuse the bomb.",
            "As a Terrorist, your objective is to plant the bomb and prevent the Counter-terrorists from defusing it.",
            "All maps have 2 sites, but there are various ways to get in the site. Rush your way to the site, sneak behind the enemy lines, Use the utilities to pressure the enemies."
        ]
    },
    {
        name: "valorant",
        title: "Valorant",
        thumbnail: "/valo.jpg",

        content: [
            "Valorant is a 5v5 First-Person Shooter game where you would play the agents with abilities from either the Attacker side or the Defender side.",
            "As an Attacker, your objective is to infiltrate the bombsite to plant the Spike and prevent them from defusing it. Defend the Spike with your life until it explodes.",
            "As a Defender, your objective is to defend the bombsites. If they got the Spike planted, not all hope is lost. Retake the bombsite and defuse the Spike.",
            "There are 4 roles in the game:\nInitiator uses their abilities to initiate or execute the infiltration, defending, or retaking.\nController uses their abilities to control the map and make the attacking or defending much easier.\nSentinel uses their abilities to anchor the site and/or prevent the backstab from the enemy.\nDuelist uses their abilities and skills to eliminate enemies."
        ]
    },
    {
        name: "league-of-legends",
        title: "League of Legends",
        thumbnail: "/lol.jpg",

        content: [
            "League of Legends is a 5v5 Multiplayer Online Battle Arena where you would play as one of the champions of the Runeterra.",
            "Your objective is to destroy the enemies' towers and get to their base and destroy.",
            "Use variety of champions to outmaneuver, outskill, outsmart your opponents.",
            "There are 5 roles in the game:\nTop players are the players who starts playing at the top lane of the map. Top champions are usually tanks who can initiate the teamfight and tanks a lot of damage from the enemies.\nJungler role is a role that usually plays in the jungles of the map. They are usually the flankers that can provide support to one of their teammates on any lane.\nBot or ADC role is a role that usually plays at the bottom lane of the map. They always start weak and will be easy-to-eliminate the whole game, but eventually, they'd become the highest damage dealer of the team.\nThe Support role is a role that usually plays on bottom lane along with the ADC. They are there to provide the support at the start that the ADC needs, and throughout the game, they would be able to provide support with their abilities during their teamfights.\nThe Mid Laner role is a role that usually plays at the middle lane of the map. The role can be play into various ways, whether you would be the Playmaker of the team, or the Carry or the second Carry. It has endless playstyles for the mid lane role."
        ]
    },
    {
        name: "dota",
        title: "DOTA",
        thumbnail: "/lol.jpg",

        content: [
            "Dota is a 5v5 Multiplayer Online Battle Arena where you can play using various of characters.",
            "Your objective is to destroy the enemies' towers and get to their base and destroy.",
            "Use various of characters and build vast of items to make your character stronger.",
            "There are 5 roles in the game:\nThe Offlaner role is a role that usually plays against the enemy's Carry. Their goal is to prevent or delay the enemy's Carry from getting stronger.\nThe Soft Support role is a role that usually plays with the Offlaner. Their role is to support the team using their abilities with big impact.\nThe Carry role usually plays starting on the bottom lane as the first-priority on getting the gold to build strong items, get stronger and be unstoppable throughout the middle to end of the game.\nThe Hard Support role is a role that usually plays with the Carry. Their role is to support the team with abilities and consumable items that can help the team.\nThe Mid laner role usually plays on the mid lane. They are considered as the secondary carry of the team, and they are the second-priority on getting the gold to get stronger."
        ]
    },
    {
        name: "overwatch",
        title: "Overwatch",
        thumbnail: "/overwatch.png",

        content: [
            "Overwatch is a 5v5 or 6v6 First-Person Shooter game where you would be playing as an agent of Overwatch or as an agent of Talon.",
            "There are various of gamemodes with different objectives. Capture the point, Escort, Push mode, Flashpoint.",
            "Use various of agents with unique abilities to obtain the victory.",
            "There are 3 roles in the game:\nTank is a role that usually plays on the frontline. They are the damage tanker of the team with a lot of health.\nDPS role is a role that usually plays as a damage dealer. They are the carry of the team, dealing the most damage for the team.\nSupport role is a role that usually plays as a healer of the team. They usually play on the backline, providing support for the team."
        ]
    }
];

export default articles;