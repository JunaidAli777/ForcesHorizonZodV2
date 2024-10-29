import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  country?: string;
  state?: string;
  city?: string;
  role?: string;
  email: string;
  password: string;
  terms: boolean;
  image?: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  role: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  terms: { type: Boolean, required: true },
  image: { type: String },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;