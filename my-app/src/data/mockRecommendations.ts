import { MediaType, Recommendation } from "../interfaces/recommendations";

export const mockRecommendations: Recommendation[] = [
  {
    id: "0",
    title: "Mulholland Drive",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png",
      alt: "Mulholland Drive film poster",
    },
    completed: true,
    favourite: true,
    dateAdded: "2025-09-15T14:23:00.000Z",
  },
  {
    id: "1",
    title: "Live It Out - Metric",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/3/3e/Live_it_Out_-_Cover.jpg",
      alt: "Live It Out album cover",
    },
    completed: false,
    favourite: false,
    dateAdded: "2025-07-08T10:42:17.389Z",
  },
  {
    id: "2",
    title: 'KATSEYE (캣츠아이) "Gnarly" Official MV',
    addedBy: "keira",
    description:
      "Proin et massa vulputate, accumsan felis nec, molestie libero. Suspendisse mollis porta leo et mattis. Nam interdum iaculis auctor. Integer sodales pharetra felis eget elementum. Phasellus aliquet at sapien vel tristique. Aliquam eros massa, hendrerit eu quam quis, ultrices efficitur nulla. Nullam placerat pellentesque ante, nec blandit justo dapibus vel. Aliquam tincidunt urna rhoncus imperdiet varius. Fusce ac mi viverra, venenatis felis vitae, porttitor mi. Nunc id erat vel neque sagittis placerat non ac diam. Donec a commodo lorem. Quisque in dui metus. Nullam tempus diam ut mauris dictum, vitae vulputate velit egestas. Pellentesque feugiat turpis sit amet est convallis gravida.",
    mediaType: MediaType.Video,
    link: "https://www.youtube.com/watch?v=R2-yomhYAj4",
    image: {
      src: "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/joysauce.com/wp-content/uploads/2025/05/Gnarly-HERO-min.jpg",
      alt: "Gnarly - Katseye music video",
    },
    completed: true,
    favourite: true,
    dateAdded: "2025-07-20T18:15:45.000Z",
  },
  {
    id: "3",
    title: "The Vet's Daughter",
    addedBy: "keira",
    description:
      "A haunting novel that blends magical realism with everyday life struggles.",
    mediaType: MediaType.Book,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/b/be/TheVetsDaughter.jpg",
      alt: "The Vet's Daughter book cover",
    },
    completed: false,
    favourite: true,
    dateAdded: "2025-08-02T09:00:00.000Z",
  },
  {
    id: "4",
    title: "The Secret History",
    addedBy: "keira",
    description:
      "A gripping literary thriller exploring obsession and morality among college students.",
    mediaType: MediaType.Book,
    image: {
      src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451554846l/29044.jpg",
      alt: "The Secret History book cover",
    },
    completed: false,
    favourite: false,
    dateAdded: "2025-08-12T12:45:00.000Z",
  },
  {
    id: "5",
    title: "Weird Studies",
    addedBy: "keira",
    description:
      "A podcast diving into unconventional academic topics and fascinating cultural discussions.",
    mediaType: MediaType.Podcast,
    image: {
      src: "https://media24.fireside.fm/file/fireside-images-2024/podcasts/images/e/e38b53e4-e148-4e2d-b301-0b3bb15779ff/cover_medium.jpg",
      alt: "Weird Studies podcast logo",
    },
    completed: false,
    favourite: true,
    dateAdded: "2025-07-27T17:30:00.000Z",
  },
  {
    id: "6",
    title: "Morvern Callar",
    addedBy: "keira",
    description:
      "A moody and atmospheric film following a woman’s journey through grief and self-discovery.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://m.media-amazon.com/images/I/718dFhLvYUL.jpg",
      alt: "Morvern Callar movie poster",
    },
    completed: false,
    favourite: true,
    dateAdded: "2025-08-18T08:00:00.000Z",
  },
  {
    id: "7",
    title: "Amelie",
    addedBy: "keira",
    description:
      "A whimsical and charming French film about a young woman spreading happiness in Paris.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://m.media-amazon.com/images/M/MV5BOTNmYzY0MWQtZGZmNy00Y2Y4LWFmMDQtMTZjYTdiYzEwZGQ2XkEyXkFqcGc@._V1_.jpg",
      alt: "Amelie movie poster",
    },
    completed: true,
    favourite: false,
    dateAdded: "2025-09-17T19:20:00.000Z",
  },
  {
    id: "8",
    title: "Smithereens",
    addedBy: "keira",
    description:
      "A rebellious teen travels to New York City to engage in the punk rock culture. She meets and spends some time with a musician, but soon finds herself in the hands of the wrong people.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://s3.amazonaws.com/criterion-production/films/087c5e1e1acaf973c9ca5c5f306f0b1b/kcICmwHV4rQuKv6wFvElhNS6dlPr6e_large.jpg",
      alt: "Smithereens movie poster",
    },
    completed: false,
    favourite: true,
    dateAdded: "2025-08-07T15:10:00.000Z",
  },
  {
    id: "9",
    title: "Old World Underground, Where Are You Now? - Metric",
    addedBy: "keira",
    description:
      "An energetic indie rock album capturing the spirit of early 2000s alternative music.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/e/e7/Old_World_Underground%2C_Where_Are_You_Now%3F_Cover.jpg",
      alt: "Old World Underground, Where Are You Now? album cover",
    },
    completed: false,
    favourite: true,
    dateAdded: "2025-07-02T11:00:00.000Z",
  },
  {
    id: "10",
    title: "Rid of Me - PJ Harvey",
    addedBy: "keira",
    description:
      "A raw and powerful alternative rock album known for its emotional intensity.",
    mediaType: MediaType.Music,
    image: {
      src: "https://m.media-amazon.com/images/I/71T4CodJnkL._UF1000,1000_QL80_.jpg",
      alt: "Rid of Me album cover",
    },
    completed: true,
    favourite: true,
    dateAdded: "2025-09-10T07:45:00.000Z",
  },
  {
    id: "11",
    title: "Mad Men",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.TVShow,
    image: {
      src: "https://m.media-amazon.com/images/M/MV5BYTNjNjc5OWQtYjMxNC00MzEwLWIxM2UtNjU3NzhkNjZmNGI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      alt: "Mad Men cover",
    },
    completed: true,
    favourite: true,
    dateAdded: "2025-01-22T07:45:00.000Z",
  },
  {
    id: "12",
    title: "Heaven or Las Vegas - Cocteau Twins",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/6/60/Cocteau_Twins%E2%80%94Heaven_or_Las_Vegas.jpg",
      alt: "Heaven or Las Vegas cover",
    },
    completed: false,
    favourite: false,
    dateAdded: "2025-08-22T10:35:00.000Z",
  },
];
