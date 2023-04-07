import mongoose, { Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema;

export interface User extends Document {
  email: String;
  password: String;
}

export interface UserFunctions extends Model<User> {
  signUp(email: string, password: string): Promise<User>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    requred: true
  }
}, { timestamps: true });

userSchema.statics.signUp = async function(email: string, password: string) {
  const exists = await this.findOne({ email });

  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isEmail(email)) {
    throw Error('Invalid email!');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Please use a strong password!');
  }

  if (exists) {
    throw Error('Email already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

export default mongoose.model<User, UserFunctions>('User', userSchema);