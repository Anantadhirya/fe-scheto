export const groups = [
  {
    name: "FIND IT",
    description:
      "Future Innovations and Discovery IT, a national level competition in the field of Information Technology organized by KMTETI FT UGM.",
    id: "ABC123",
    owner: "Alexandra Adeline",
    members: [
      { name: "Alexandra Adeline" },
      { name: "Aaron Smith" },
      { name: "Marcelino S." },
      { name: "Abigail Christy" },
    ],
  },
  {
    name: "PAW Project",
    description:
      "Project to fulfill the final assignment mark for the DTETI FT UGM Web Application Development course",
    id: "DEF123",
    owner: "Lorem",
    members: [
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
    ],
  },
  {
    name: "PIMNAS",
    description:
      "Scientific activity competition organized by the Directorate General of Learning and Student Affairs, Ministry of Education",
    id: "ASD312",
    owner: "Lorem",
    members: [{ name: "Lorem ipsum" }, { name: "Lorem ipsum" }],
  },
  {
    name: "BEM KMFT",
    description:
      "UGM Faculty of Engineering Student Executive Board (BEM FT), an executive body and movement that coordinates all creative forces within KMFT UGM.",
    id: "DEF213",
    owner: "Lorem",
    members: [
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
    ],
  },
  ...Array(7)
    .fill()
    .map((_) => ({
      name: "Lorem Ipsum",
      description: "Lorem Ipsum",
      id: "ADS234",
      owner: "Lorem",
      members: [
        ...Array(20)
          .fill()
          .map((_) => ({
            name: "Lorem ipsum",
          })),
      ],
    })),
];

export const schedules = [
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 1, 1, 0, 0),
    end_time: new Date(2024, 10, 1, 3, 0, 0),
    repeat: "MONTHLY",
  },
  {
    is_user_owned: false,
    title: "Monthly Meeting",
    start_time: new Date(2024, 10, 2, 9, 0, 0),
    end_time: new Date(2024, 10, 2, 12, 0, 0),
    repeat: "MONTHLY",
  },
  {
    is_user_owned: false,
    title: "Weekly Meeting",
    start_time: new Date(2024, 10, 17, 9, 0, 0),
    end_time: new Date(2024, 10, 17, 11, 0, 0),
    repeat: "WEEKLY",
  },
  {
    is_user_owned: false,
    title: "Daily Meeting",
    start_time: new Date(2024, 10, 21, 2, 0, 0),
    end_time: new Date(2024, 10, 21, 4, 0, 0),
    repeat: "DAILY",
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 17, 13, 0, 0),
    end_time: new Date(2024, 10, 17, 15, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 17, 14, 0, 0),
    end_time: new Date(2024, 10, 17, 18, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 18, 7, 0, 0),
    end_time: new Date(2024, 10, 18, 12, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 18, 9, 0, 0),
    end_time: new Date(2024, 10, 18, 11, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 18, 10, 0, 0),
    end_time: new Date(2024, 10, 18, 15, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 19, 9, 0, 0),
    end_time: new Date(2024, 10, 19, 12, 0, 0),
    repeat: "WEEKLY",
  },
  {
    is_user_owned: false,
    title: "Meeting 1",
    start_time: new Date(2024, 10, 19, 13, 0, 0),
    end_time: new Date(2024, 10, 19, 15, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 21, 13, 0, 0),
    end_time: new Date(2024, 10, 21, 15, 30, 0),
    repeat: "DAILY",
    repeat_until: new Date(2024, 11, 30, 15, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 24, 7, 0, 0),
    end_time: new Date(2024, 10, 24, 15, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 26, 18, 0, 0),
    end_time: new Date(2024, 10, 26, 23, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 27, 8, 0, 0),
    end_time: new Date(2024, 10, 27, 9, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 2",
    start_time: new Date(2024, 10, 27, 9, 0, 0),
    end_time: new Date(2024, 10, 27, 12, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 3",
    start_time: new Date(2024, 10, 27, 11, 0, 0),
    end_time: new Date(2024, 10, 27, 15, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 27, 23, 0, 0),
    end_time: new Date(2024, 10, 28, 3, 30, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 10, 30, 23, 0, 0),
    end_time: new Date(2024, 11, 1, 1, 0, 0),
  },
  {
    is_user_owned: true,
    start_time: new Date(2024, 11, 2, 23, 0, 0),
    end_time: new Date(2024, 11, 5, 3, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 4",
    start_time: new Date(2024, 11, 5, 20, 47, 0),
    end_time: new Date(2024, 11, 6, 6, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 5",
    start_time: new Date(2024, 11, 6, 19, 7, 0),
    end_time: new Date(2024, 11, 9, 6, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 6",
    start_time: new Date(2024, 11, 10, 19, 7, 0),
    end_time: new Date(2024, 11, 11, 9, 30, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 7",
    start_time: new Date(2024, 11, 11, 8, 0, 0),
    end_time: new Date(2024, 11, 11, 10, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 8",
    start_time: new Date(2024, 11, 11, 11, 0, 0),
    end_time: new Date(2024, 11, 11, 13, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 9",
    start_time: new Date(2024, 11, 11, 12, 0, 0),
    end_time: new Date(2024, 11, 11, 15, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 10",
    start_time: new Date(2024, 11, 11, 14, 0, 0),
    end_time: new Date(2024, 11, 11, 17, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 11",
    start_time: new Date(2024, 11, 11, 16, 0, 0),
    end_time: new Date(2024, 11, 11, 19, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 12",
    start_time: new Date(2024, 11, 11, 20, 0, 0),
    end_time: new Date(2024, 11, 12, 11, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 13",
    start_time: new Date(2024, 11, 13, 11, 0, 0),
    end_time: new Date(2024, 11, 13, 13, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 14",
    start_time: new Date(2024, 11, 13, 12, 0, 0),
    end_time: new Date(2024, 11, 13, 15, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 15",
    start_time: new Date(2024, 11, 13, 12, 30, 0),
    end_time: new Date(2024, 11, 13, 17, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 16",
    start_time: new Date(2024, 11, 13, 16, 0, 0),
    end_time: new Date(2024, 11, 13, 19, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 17",
    start_time: new Date(2024, 11, 13, 20, 0, 0),
    end_time: new Date(2024, 11, 13, 23, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 18",
    start_time: new Date(2024, 11, 13, 21, 0, 0),
    end_time: new Date(2024, 11, 13, 23, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 19",
    start_time: new Date(2024, 11, 13, 22, 0, 0),
    end_time: new Date(2024, 11, 13, 23, 0, 0),
  },
  {
    is_user_owned: false,
    title: "Meeting 20",
    start_time: new Date(2024, 11, 13, 21, 0, 0),
    end_time: new Date(2024, 11, 13, 23, 30, 0),
  },
];
