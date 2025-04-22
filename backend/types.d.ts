// declare module 'express-serve-static-core' {
//   interface Request {
//       user?: any; // Or use your User schema type, e.g., import { User } from "../database/schema"; user?: User;
//   }
// }


declare namespace Express {
  export interface Request {
      user: any;
  }
  export interface Response {
      user: any;
  }
}