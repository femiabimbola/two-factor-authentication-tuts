export const corsOptions = {
  origin :  "http://localhost:3000",
  credentials: true, //Majorly because of cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization',]
}

export const encodedOptions = {
  limit: "100mb",
  extended:true
}
