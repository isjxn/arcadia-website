interface NavbarLink {
  url: string;
  text: string;
  externalLink?: boolean;
  dropdown?: Array<NavbarLink>;
}

const navbarConfig: Array<NavbarLink> = [
  {
    url: '/',
    text: 'Home'
  },
  {
    url: '/blog',
    text: 'Blog'
  },
  {
    url: '/team',
    text: 'Team'
  },
  {
    url: 'https://drive.google.com/drive/folders/1fXWYO1NbbRdN7FQf2RTslD-PqIT7SA8F',
    text: 'Resourcenpack',
    externalLink: true
  },
  {
    url: 'https://wiki.mc-arcadia.de',
    text: 'Wiki',
    externalLink: true
  },
  {
    url: 'https://map.mc-arcadia.de',
    text: 'Karte',
    externalLink: true
  },
  {
    url: 'https://discord.gg/jVmNMyV',
    text: 'Discord',
    externalLink: true
  },
]

export default navbarConfig;