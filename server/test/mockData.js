const users = [
  {
    first_name: 'Karlik',
    last_name: 'Breach',
    email: 'kbreach0@php.net',
    password: '8XnFyOUYlTha',
  },
  {
    first_name: 'Junia',
    last_name: 'Sumpton',
    email: 'jsumpton1@ucoz.ru',
    password: 'CECf45FaT',
  },
  {
    first_name: 'Rosalie',
    last_name: 'Gerhold',
    email: 'rgerhold2@delicious.com',
    password: 'Q8m8TZ3',
  },
  {
    first_name: 'Germain',
    last_name: 'Sayburn',
    email: 'gsayburn3@ibm.com',
    password: 'X0ifGJny',
  },
  {
    first_name: 'Sanders',
    last_name: 'Crambie',
    email: 'scrambie4@prnewswire.com',
    password: 'gCfL4Gm54oF9',
  },
];

const categories = [
  { title: 'Movies' },
  { title: 'Music' },
  { title: 'Music' },
  { title: 'Garden' },
  { title: 'Games' },
];

const recommendations = [
  {
    title: 'curae duis',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    location: '6856 Pleasure Crossing',
    lastVisited: '1/8/2019',
  },
  {
    title: 'morbi non',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    location: '00775 Briar Crest Pass',
    lastVisited: '9/20/2018',
  },
  {
    title: 'in felis',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    location: '21 School Junction',
    lastvisited: '6/27/2019',
  },
  {
    title: 'ultrices',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    location: '40433 Coolidge Hill',
    lastVisited: '7/30/2019',
  },
  {
    title: 'massa tempor',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    location: '1487 Esker Place',
    lastVisited: '1/25/2019',
  },
];

const comments = [
  { comment: 'pellentesque ultrices phasellus id sapien in sapien iaculis' },
  { comment: 'non interdum in ante vestibulum ante ipsum primis in faucibus' },
  {
    comment:
      'in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit',
  },
  { comment: 'sodales scelerisque mauris sit amet' },
  { comment: 'tincidunt nulla mollis molestie lorem quisque ut' },
];

const userRating = [
  { rate: 1 },
  { rate: 5 },
  { rate: 1 },
  { rate: 3 },
  { rate: 5 },
];

module.exports = { comments, users, recommendations, userRating };
