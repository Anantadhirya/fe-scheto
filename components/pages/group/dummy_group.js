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
        { name: "Lorem ipsum" },
        { name: "Lorem ipsum" },
        { name: "Lorem ipsum" },
      ],
    })),
];
