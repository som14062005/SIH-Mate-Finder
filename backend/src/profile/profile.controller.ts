import { Controller, Get, Post, Body, Param, Put, Delete , Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';


@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('setup')
async createOrUpdate(@Body() createProfileDto: CreateProfileDto) {
  const profile = await this.profileService.createOrUpdate(createProfileDto);
  return { message: 'Profile saved successfully', profile };
}


  @Get()
  async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }

    @Patch(':id/post')
  async postProfile(@Param('id') id: string) {
    return this.profileService.postProfile(id);
  }

  // ✅ Get all posted profiles (feed)
  @Get('posted/all')
  async getPostedProfiles() {
    const profiles = await this.profileService.getPostedProfiles();
    return { profiles };
  }
  @Patch(':id/unpost')
async unpostProfile(@Param('id') id: string) {
  return this.profileService.unpostProfile(id);
}
// GET profile by userId
@Get('user/:userId')
async findByUserId(@Param('userId') userId: string) {
  return this.profileService.findByUserId(userId);
}

}
