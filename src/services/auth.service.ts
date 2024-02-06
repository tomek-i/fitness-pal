import { Prisma, User } from "@prisma/client";
import { UserService } from "./UserService";

export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userService.GetByEmail(email);
    //TODO: check if username and passwords are matching
    return user;
  }

  signup(email: string, password: string, profile: Prisma.ProfileCreateInput): Promise<User> {
    //TODO: create profile
    return this.userService.Create({
      email,
      password,
    });
  }
}
