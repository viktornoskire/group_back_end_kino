export default function createData() {
  return {
    header: {
      mainHeader: {
        logo: './img/kinoLogo.png',
        alt: 'Picture for the brands logotype.',
        brandName: 'KINO BIO',
      },
      hamburgerMenu: {
        menuLogo: './img/kinoLogoOverlay.png',
        menuLinks: [
          {
            text: 'Aktuella filmer',
            link: '/',
          },
          {
            text: 'Kommande filmer',
            link: '/',
          },
          {
            text: 'Barnbio',
            link: '/',
          },
          {
            text: 'Bioupplevelser',
            link: '/',
          },
          {
            text: 'Barnkalas',
            link: '/kids',
          },
          {
            text: 'Medlem',
            link: '/',
          },
          {
            text: 'Om oss',
            link: '/about',
          },
        ],
      },
    },
    footer: {
      logo: './img/kinoLogo.png',
      text: 'Kino Bio',
      sections: [
        {
          title: 'Kontakta oss',
          contact: {
            mail: 'kinosandviken@kino.nu',
            phoneNumber: '026-290066',
          },
        },
        {
          title: 'Sociala medier',
          links: [
            {
              icon: './img/instagramIcon.png',
              name: 'Följ oss på Instagram',
              url: '#instagram',
            },
            {
              icon: './img/facebookIcon.png',
              name: 'Följ oss på Facebook',
              url: '#facebook',
            },
            {
              icon: './img/tiktokIcon.png',
              name: 'Följ oss på TikTok',
              url: '#tiktok',
            },
          ],
        },
        {
          title: 'Adress',
          adress: {
            street: 'Smassensväg 102',
            town: '811 62 Sandviken',
            findUs: 'Hitta hit',
            url: '#findUs',
          },
        },
      ],
    },
    open: [
      {
        dag: 'Lördag',
        datum: '14/12',
        tid: '14:30 - 21:00',
      },
      {
        dag: 'Söndag',
        datum: '15/12',
        tid: '14:30 - 21:00',
      },
      {
        dag: 'Måndag',
        datum: '16/12',
        tid: '14:30 - 20:00',
      },
      {
        dag: 'Tisdag',
        datum: '17/12',
        tid: '14:30 - 21:30',
      },
      {
        dag: 'Onsdag',
        datum: '18/12',
        tid: 'Stängt',
      },
      {
        dag: 'Torsdag',
        datum: '19/12',
        tid: '14:30 - 21:00',
      },
      {
        dag: 'Fredag',
        datum: '20/12',
        tid: '14:00 - 22:00',
      },
    ],
  };
}
