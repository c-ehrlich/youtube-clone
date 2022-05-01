import { getModelForClass, prop, pre } from '@typegoose/typegoose';
import argon2 from 'argon2';

// hash passwords
@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})

export class User {
  // mongo puts an index on every unique field
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    // add createdAt and updatedAt
    timestamps: true,
  },
});
