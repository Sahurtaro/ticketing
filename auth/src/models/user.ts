import mongoose from 'mongoose';

// An interface that describes the properties that area required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes the properties
//that a user model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

//Agregamos la función build al modelo User
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };
