import { MediaType, Recommendation } from "../interfaces/recommendations";

export const mockRecommendations: Recommendation[] = [
  {
    title: "Mulholland Drive",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png",
      alt: "Mulholland Drive film poster",
    },
    dateAdded: "2025-06-25T14:23:00.000Z",
  },
  {
    title: "Live It Out - Metric",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/3/3e/Live_it_Out_-_Cover.jpg",
      alt: "Live It Out album cover",
    },
    dateAdded: "2025-07-08T10:42:17.389Z",
  },
  {
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
    dateAdded: "2025-07-20T18:15:45.000Z",
  },
  {
    title: "The Vet's Daughter",
    addedBy: "keira",
    description:
      "A haunting novel that blends magical realism with everyday life struggles.",
    mediaType: MediaType.Book,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/b/be/TheVetsDaughter.jpg",
      alt: "The Vet's Daughter book cover",
    },
    dateAdded: "2025-08-02T09:00:00.000Z",
  },
  {
    title: "The Secret History",
    addedBy: "keira",
    description:
      "A gripping literary thriller exploring obsession and morality among college students.",
    mediaType: MediaType.Book,
    image: {
      src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451554846l/29044.jpg",
      alt: "The Secret History book cover",
    },
    dateAdded: "2025-08-12T12:45:00.000Z",
  },
  {
    title: "Weird Studies",
    addedBy: "keira",
    description:
      "A podcast diving into unconventional academic topics and fascinating cultural discussions.",
    mediaType: MediaType.Podcast,
    image: {
      src: "https://media24.fireside.fm/file/fireside-images-2024/podcasts/images/e/e38b53e4-e148-4e2d-b301-0b3bb15779ff/cover_medium.jpg",
      alt: "Weird Studies podcast logo",
    },
    dateAdded: "2025-07-27T17:30:00.000Z",
  },
  {
    title: "Morvern Callar",
    addedBy: "keira",
    description:
      "A moody and atmospheric film following a woman’s journey through grief and self-discovery.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://m.media-amazon.com/images/I/718dFhLvYUL.jpg",
      alt: "Morvern Callar movie poster",
    },
    dateAdded: "2025-08-18T08:00:00.000Z",
  },
  {
    title: "Amelie",
    addedBy: "keira",
    description:
      "A whimsical and charming French film about a young woman spreading happiness in Paris.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://m.media-amazon.com/images/M/MV5BOTNmYzY0MWQtZGZmNy00Y2Y4LWFmMDQtMTZjYTdiYzEwZGQ2XkEyXkFqcGc@._V1_.jpg",
      alt: "Amelie movie poster",
    },
    dateAdded: "2025-09-17T19:20:00.000Z",
  },
  {
    title: "Smithereens",
    addedBy: "keira",
    description:
      "A tense, modern drama focusing on the impact of technology and isolation.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://s3.amazonaws.com/criterion-production/films/087c5e1e1acaf973c9ca5c5f306f0b1b/kcICmwHV4rQuKv6wFvElhNS6dlPr6e_large.jpg",
      alt: "Smithereens movie poster",
    },
    dateAdded: "2025-08-07T15:10:00.000Z",
  },
  {
    title: "Old World Underground, Where Are You Now?",
    addedBy: "keira",
    description:
      "An energetic indie rock album capturing the spirit of early 2000s alternative music.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/e/e7/Old_World_Underground%2C_Where_Are_You_Now%3F_Cover.jpg",
      alt: "Old World Underground, Where Are You Now? album cover",
    },
    dateAdded: "2025-07-02T11:00:00.000Z",
  },
  {
    title: "Rid of Me",
    addedBy: "keira",
    description:
      "A raw and powerful alternative rock album known for its emotional intensity.",
    mediaType: MediaType.Music,
    image: {
      src: "https://m.media-amazon.com/images/I/71T4CodJnkL._UF1000,1000_QL80_.jpg",
      alt: "Rid of Me album cover",
    },
    dateAdded: "2025-09-10T07:45:00.000Z",
  },
];
