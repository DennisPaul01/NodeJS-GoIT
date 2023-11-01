const corsOptions = {
  // Permite doar cereri de la această origine
  origin: "https://www.example.com",
  // Permite doar metodele GET și POST
  methods: "GET,POST",
  // Returnează un status 204 pentru cererile prefligth (OPTIONS)
  optionsSuccessStatus: 204,
};

module.exports = {
  corsOptions,
};
