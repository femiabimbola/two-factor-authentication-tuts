export const corsOptions = {
  origin :  "http://localhost:3000/",
  credentials: true, //Majorly because of cookies
  allowedHeaders: ['Content-Type', 'Authorization',]
}

export const encodedOptions = {
  limit: "100mb",
  extended:true
}
