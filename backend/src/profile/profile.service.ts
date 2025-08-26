import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async createOrUpdate(createProfileDto: CreateProfileDto): Promise<Profile> {
  const { collegeMail } = createProfileDto;
  const existingProfile = await this.profileModel.findOne({ collegeMail }).exec();

  if (existingProfile) {
    const updatedProfile = await this.profileModel
      .findOneAndUpdate({ collegeMail }, createProfileDto, { new: true })
      .exec();

    if (!updatedProfile) {
      throw new Error('Profile update failed');
    }
    return updatedProfile;
  } else {
    const createdProfile = new this.profileModel(createProfileDto);
    return createdProfile.save();
  }
}


async findAll(): Promise<Profile[]> {
  return this.profileModel.find().exec();
}

async findOne(id: string): Promise<Profile | null> {
  return this.profileModel.findById(id).exec();
}

async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile | null> {
  return this.profileModel
    .findByIdAndUpdate(id, updateProfileDto, { new: true })
    .exec();
}

async remove(id: string): Promise<Profile | null> {
  return this.profileModel.findByIdAndDelete(id).exec();
}

}
