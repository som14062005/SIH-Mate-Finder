export class CreateProfileDto {
  readonly name: string;
  readonly year: string;
  readonly collegeMail: string;
  readonly techStacks: string[];
  readonly roles: string[];
  readonly linkedin?: string;
  readonly github?: string;
  readonly bio?: string;
}
