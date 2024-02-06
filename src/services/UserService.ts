import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { APIService } from "./APIService";

export class UserService implements APIService<User> {
  ApiURL: string;

  constructor() {
    //TODO: need to update URL properly
    this.ApiURL = "http://localhost:3000/api/users";
  }
  Get(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async GetByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  GetAll(): User[] {
    throw new Error("Method not implemented.");
  }
  async Create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        Profile: {
          create: data.Profile,
        },
      },
    });
    return user;
  }

  Update(data: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
