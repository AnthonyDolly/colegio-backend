export interface JwtPayload {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  landline: string;
  role: string;
  //TODO: añadir todo lo que quieran grabar en el token
}
